// Public-only adapter for the original Codex rendering modules. Node built-ins only.
// Reads the current checkout, never the private archive; all writes require an
// explicit destination outside the checkout. Running without flags checks only.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {contentSecurityPolicy, normalizeLf, validatePublicData, validatePublicationFile} from './security.mjs';
import {buildCollectionPages} from './collection-pages.mjs';
import {ICON_ASSETS} from './icons.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../../..');
const args=process.argv.slice(2);
const supported=new Set(['--check','--source-dir','--extract-dir','--output-dir']);
const options={};
for(let i=0;i<args.length;i++){
 const flag=args[i];if(!supported.has(flag))throw Error('Unknown option: '+flag);
 if(flag==='--check'){options.check=true;continue;}
 if(!args[i+1]||args[i+1].startsWith('--'))throw Error(flag+' needs a directory');
 options[flag.slice(2)]=path.resolve(args[++i]);
}
const read=file=>normalizeLf(fs.readFileSync(file,'utf8'));
function outsideCheckout(directory){
 const destination=path.resolve(directory),relative=path.relative(root,destination);
 if(relative===''||(!relative.startsWith('..'+path.sep)&&relative!=='..'&&!path.isAbsolute(relative)))throw Error('Output must be outside the checkout');
 fs.mkdirSync(destination,{recursive:true});
 const actual=fs.realpathSync(destination),actualRelative=path.relative(fs.realpathSync(root),actual);
 if(actualRelative===''||(!actualRelative.startsWith('..'+path.sep)&&actualRelative!=='..'&&!path.isAbsolute(actualRelative)))throw Error('Output resolves inside the checkout');
 return actual;
}
const html=read(path.join(root,'index.html'));
const style=html.match(/<style>([\s\S]*?)<\/style>/);
const dataBlock=html.match(/<script id="library-data" type="application\/json">([\s\S]*?)<\/script>/);
const appBlock=[...html.matchAll(/<script(?: [^>]*)?>([\s\S]*?)<\/script>/g)].at(-1);
if(!style||!dataBlock||!appBlock)throw Error('Expected the current public workbench structure');
let template=html.replace(style[1],'CX_PUBLIC_STYLES').replace(dataBlock[1],'CX_PUBLIC_DATA').replace(appBlock[1],'CX_PUBLIC_APP');
template=template.replace(/(<meta http-equiv="Content-Security-Policy" content=")[^"]*(")/,'$1CX_PUBLIC_CSP$2');
let css=style[1],js=appBlock[1],data=JSON.parse(dataBlock[1]);
if(options['source-dir']){
 const source=options['source-dir'];template=read(path.join(source,'index.template.html'));
 css=read(path.join(source,'styles.css'));js=read(path.join(source,'app.js'));
 data=JSON.parse(read(path.join(source,'data.json')));
}
validatePublicData(data);
if(data.items.some(resource=>Object.hasOwn(resource,'verification')||!resource.publicFree))throw Error('Use public resource data only');
if(options['extract-dir']){
 const output=outsideCheckout(options['extract-dir']);
 for(const [file,content]of [['index.template.html',template],['styles.css',css],['app.js',js],['data.json',JSON.stringify(data,null,2)+'\n']])fs.writeFileSync(path.join(output,file),content);
 console.log('Extracted public template, CSS, app and data to '+output);
}
const compact=JSON.stringify(data).replaceAll('<','\\u003c');
const csp=contentSecurityPolicy({scripts:[compact,js],styles:[css]});
const index=template.replace(/\?v=\d+\.\d+/g,'?v='+data.release.version)
 .replace('CX_PUBLIC_CSP',()=>csp).replace('CX_PUBLIC_STYLES',()=>css)
 .replace('CX_PUBLIC_DATA',()=>compact).replace('CX_PUBLIC_APP',()=>js);
const e=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const site=data.publicSite,release=data.release;
const emailLink=()=>`<a href="mailto:${e(site.creator.email)}" aria-label="Email Smarty.ctrl">${e(site.creator.email)}</a>`;
const legalCsp=contentSecurityPolicy({styles:[css]});
const legalPage=(kind,title)=>`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="${legalCsp}"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="referrer" content="no-referrer"><meta name="theme-color" content="#d52e24"><title>${e(title)} | The Controls Exchange</title><link rel="icon" type="image/svg+xml" href="controls-exchange-mark.svg?v=${e(release.version)}"><style>${css}</style></head><body><main class="legal-main"><header><a href="index.html">The Controls Exchange · Back to free BAS learning</a></header><h1>${e(title)}</h1><p class="intro-text">Updated ${e(site.updated)}</p>${site[kind].map(section=>`<section${section.id?` id="${e(section.id)}"`:""}><h2>${e(section.title)}</h2><p>${e(section.text)}</p>${section.email?`<p>${emailLink()}</p>`:""}${(section.links||[]).map(([name,url])=>`<p><a href="${e(url)}" target="_blank" rel="noopener noreferrer">${e(name)}</a></p>`).join('')}</section>`).join('')}<footer class="footer"><span>© 2026 The Controls Exchange. Original resources belong to their publishers.</span><span><a href="privacy.html">Privacy</a> · <a href="terms.html">Terms & notices</a></span></footer></main></body></html>`;
const pages=new Map([['index.html',index],['privacy.html',legalPage('privacy','Privacy notice')],['terms.html',legalPage('terms','Terms & notices')],...buildCollectionPages({data})]);
for(const [file,content]of pages)validatePublicationFile(file,content);
if(!options['output-dir']||options.check){
 const changed=[...pages].filter(([file,content])=>read(path.join(root,file))!==content).map(([file])=>file);
 if(changed.length)throw Error('Generated output differs; review before applying: '+changed.join(', '));
 console.log('All '+pages.size+' generated public files match the current checkout; no writes.');
}
if(options['output-dir']){
 const output=outsideCheckout(options['output-dir']);
 for(const [file,content]of pages)fs.writeFileSync(path.join(output,file),content);
 const assets=['favicon.svg','controls-exchange-icon.svg','controls-exchange-mark.svg','controls-exchange-logo.svg','controls-exchange-share.png','SECURITY.md','README.md','.nojekyll',...Object.keys(ICON_ASSETS),...data.downloads.map(item=>'downloads/'+item.file)];
 for(const file of assets){
  const bytes=fs.readFileSync(path.join(root,file));
  validatePublicationFile(file,file.endsWith('.png')||file.endsWith('.webp')?bytes:bytes.toString('utf8'));
  const destination=path.join(output,file);fs.mkdirSync(path.dirname(destination),{recursive:true});fs.writeFileSync(destination,bytes);
 }
 console.log('Wrote '+(pages.size+assets.length)+' reviewed public files to '+output+'; publication is a separate step.');
}
