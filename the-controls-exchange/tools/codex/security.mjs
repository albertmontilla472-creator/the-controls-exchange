// Public-safe export: owner-specific private archive identity is omitted.
import {createHash} from 'node:crypto';
import {ICON_ASSETS,validateIconAsset} from './icons.mjs';
import {SHARE_CARD,validateShareCard} from './share-card.mjs';
import {assertResourceReportUrl} from './resource-report.mjs';

// Reviewed against the published v3.1 link inventory. New hosts require review;
// neither a suffix match nor a host found in newly imported content approves it.
export const APPROVED_HOSTS=Object.freeze([
 // Original protocol learning and publisher homepages reviewed November 3, 2026.
 // Milesight's own support domains, Enless, The Things publishers and Tyrrell.
 'enless-wireless.com',
 'milesight-iot.freshdesk.com',
 'www.thethingsnetwork.org',
 'support.milesight-iot.com',
 'resource.milesight.com',
 'tyrrellproducts.com',
 'www.thethingsindustries.com',
 'www.milesight.com',
 // Original protocol-owner/manufacturer documentation and credited video owners.
 'www.ccontrols.com',
 'www.modbus.org',
 'www.loytec.com',
 'www.lonmark.org',
 'support.enocean.com',
 'assetlibrary.msasafety.com',
 's4integrationsolutions.com',
 'www.realpars.com',
 // Original VYKON/Tridium data sheet, SBC vendor-hosted legacy guide, Innon KB
 // and Travis Hall’s original public BAS Briefing article, reviewed October 30, 2026.
 'www.vykon.com',
 'sbc-support.com',
 'know.innon.com',
 'basbriefing.substack.com',
 // Original BMS Parts worked article and public Periscope product documentation.
 'bmsparts.co.uk',
 'building-controls.atlassian.net',
 'bacnet.org',
 'buildings.honeywell.com',
 'docs.github.com',
 'docs.johnsoncontrols.com',
 'github.com',
 'guides.smartbuildingsacademy.com',
 // Official iSMA CONTROLLI public manuals/KB, reviewed for platform-only examples.
 'icdocs.ismacontrolli.com',
 'mosquitto.org',
 'nodered.org',
 'pages1.tridium.com',
 'prod-edam.honeywell.com',
 'share.vidyard.com',
 'sourceforge.net',
 'systemcontroltech.net',
 'www.arduino.cc',
 'www.broudyprecision.com',
 'www.distech-controls.com',
 'www.johnsoncontrols.com',
 'www.instagram.com',
 'www.linkedin.com',
 'www.smartbuildingsacademy.com',
 'www.stromquist.com',
 'www.tridium.com',
 'www.wireshark.org',
 'www.youtube.com'
]);
const approvedHosts=new Set(APPROVED_HOSTS);
const resourceId=/^[A-Z][0-9]{2,4}$/;
const slugId=/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
const newsId=/^NEWS-[A-Z0-9]+(?:-[A-Z0-9]+)*$/;
const reservedIds=new Set(['constructor','prototype','__proto__']);

export function normalizeLf(value){
 if(typeof value!=='string')throw new TypeError('Expected text');
 return value.replace(/\r\n?/g,'\n');
}

export function safeExternalUrl(value){
 if(typeof value!=='string'||!/^https:\/\//i.test(value)||/[\s\u0000-\u001f\u007f-\u009f\\]/u.test(value))throw new Error('External links must be absolute HTTPS URLs without whitespace, controls or backslashes');
 let url;
 try{url=new URL(value);}catch{throw new Error('Invalid external URL');}
 const authority=value.slice(value.indexOf('://')+3).split(/[/?#]/,1)[0];
 if(url.protocol!=='https:'||url.username||url.password||authority.includes('@')||(url.port&&url.port!=='443'))throw new Error('External URL credentials or nonstandard ports are not allowed');
 if(!approvedHosts.has(url.hostname))throw new Error('External URL host needs explicit review: '+url.hostname);
 return url.href;
}

function array(value,label){
 if(!Array.isArray(value))throw new Error('Expected array: '+label);
 return value;
}
function record(value,label){
 if(!value||typeof value!=='object'||Array.isArray(value))throw new Error('Expected object: '+label);
 return value;
}
function identifier(value,pattern,label){
 if(typeof value!=='string'||value.length>100||reservedIds.has(value)||!pattern.test(value))throw new Error('Unsafe or invalid identifier: '+label);
 return value;
}
function uniqueId(value,pattern,seen,label){
 identifier(value,pattern,label);
 if(seen.has(value))throw new Error('Duplicate identifier: '+label);
 seen.add(value);
}
function external(value,label){
 try{return safeExternalUrl(value);}catch(error){throw new Error(label+': '+error.message);}
}
function linkTuple(value,label){
 if(!Array.isArray(value)||value.length!==2||typeof value[0]!=='string'||!value[0].trim())throw new Error('Invalid source link: '+label);
 external(value[1],label);
}

// This gate prevents unsafe content entering an ordinary update. It cannot
// protect a repository whose owner account or publishing credentials are stolen.
export function validatePublicData(data){
 record(data,'public data');
 if(data.collectionPages!==undefined){
  const collectionIds=new Set();
  for(const page of array(data.collectionPages,'collection pages')){
   record(page,'collection page');uniqueId(page.id,slugId,collectionIds,'collection page ID');
   if(page.file!==page.id+'.html'||!slugId.test(page.folder||'')||reservedIds.has(page.folder)||typeof page.title!=='string'||!page.title.trim())throw Error('Collection links must be named local HTML pages with valid folders and titles');
  }
 }
 const groups=new Set(),items=new Set(),retired=new Set();
 for(const [index,group]of array(data.groups,'groups').entries()){
  record(group,'group');uniqueId(group.id,slugId,groups,'groups.'+index+'.id');
  external(group.source,'groups.'+index+'.source');
 }
 const generations=new Set();
 for(const generation of array(data.niagaraGenerations,'niagaraGenerations')){
  record(generation,'Niagara generation');uniqueId(generation.id,slugId,generations,'Niagara generation');
  if(!['ax','n4','n5'].includes(generation.id)||generation.icon!=='niagara-'+generation.id||typeof generation.label!=='string'||!generation.label.trim()||typeof generation.description!=='string'||!generation.description.trim())throw Error('Invalid Niagara generation');
 }
 if(generations.size!==3)throw Error('AX, N4 and N5 generation folders are required');
 if(!groups.size)throw new Error('Public study groups cannot be empty');
 for(const [index,item]of array(data.items,'items').entries()){
  record(item,'item');uniqueId(item.id,resourceId,items,'items.'+index+'.id');
  if(item.track==='niagara'&&(!Array.isArray(item.niagaraVersions)||!item.niagaraVersions.length||new Set(item.niagaraVersions).size!==item.niagaraVersions.length||item.niagaraVersions.some(version=>!generations.has(version))))throw Error('Invalid Niagara generation membership: '+item.id);
  if(item.serviceModules!==undefined&&(!Array.isArray(item.serviceModules)||!item.serviceModules.length||new Set(item.serviceModules).size!==item.serviceModules.length||item.serviceModules.some(id=>!slugId.test(id)||reservedIds.has(id))))throw Error('Invalid station service module membership: '+item.id);
  if(item.protocols!==undefined&&(!Array.isArray(item.protocols)||!item.protocols.length||new Set(item.protocols).size!==item.protocols.length||item.protocols.some(protocol=>!['wireless','bacnet','modbus','lon','n2'].includes(protocol))))throw Error('Invalid communication protocol membership: '+item.id);
  if(item.platformSections!==undefined&&(!Array.isArray(item.platformSections)||!item.platformSections.length||new Set(item.platformSections).size!==item.platformSections.length||item.platformSections.some(section=>!['commissioning','software-manager','station-copier','application-director','tcp-ip','administration','backup'].includes(section))||item.track!=='niagara'||item.tool!=='Niagara platform'))throw Error('Invalid Niagara platform scope: '+item.id);
  if(item.track==='ciper'&&(!Array.isArray(item.ciperModels)||!item.ciperModels.length||new Set(item.ciperModels).size!==item.ciperModels.length||item.ciperModels.some(model=>!['30','50'].includes(model))))throw Error('Invalid CIPer model membership: '+item.id);
  if(!groups.has(item.track))throw new Error('Unknown item track: '+item.id);
  external(item.url,'items.'+index+'.url');external(item.source,'items.'+index+'.source');
 }
 if(!items.size)throw new Error('Public resources cannot be empty');
 for(const id of array(data.retiredResourceIds||[],'retiredResourceIds')){
  uniqueId(id,resourceId,retired,'retiredResourceIds');
  if(items.has(id))throw new Error('Retired resource is also active: '+id);
 }
 const refs=(values,label)=>{
  for(const id of array(values,label)){
   identifier(id,resourceId,label);
   if(!items.has(id))throw new Error('Unknown public resource reference: '+label);
  }
 };
 for(const [index,source]of array(data.sources,'sources').entries())linkTuple(source,'sources.'+index);
 for(const [index,session]of array(data.sessions,'sessions').entries()){
  if(!Array.isArray(session)||session.length!==4||typeof session[0]!=='string'||!/^\d{1,3}$/.test(session[0]))throw new Error('Invalid study session: '+index);
  refs(session[2],'sessions.'+index+'.resources');
 }
 for(const [index,card]of array(data.learningCards,'learningCards').entries())refs(record(card,'learning card').resources,'learningCards.'+index+'.resources');
 const paths=new Set();
 for(const [index,path]of array(data.programming,'programming').entries()){
  record(path,'programming path');uniqueId(path.id,slugId,paths,'programming.'+index+'.id');
  refs(path.resources,'programming.'+index+'.resources');
 }
 const niagara5=record(data.niagara5,'niagara5');
 refs(niagara5.resources,'niagara5.resources');
 for(const [index,card]of array(niagara5.cards,'niagara5.cards').entries())external(record(card,'Niagara 5 card').url,'niagara5.cards.'+index+'.url');
 const tools=new Set();
 for(const [index,tool]of array(data.software,'software').entries()){
  record(tool,'software');uniqueId(tool.id,slugId,tools,'software.'+index+'.id');
  external(tool.url,'software.'+index+'.url');
  if(tool.source!==undefined&&tool.source!=='')external(tool.source,'software.'+index+'.source');
 }
 const filenames=new Set();
 for(const [index,download]of array(data.downloads,'downloads').entries()){
  record(download,'download');
  if(typeof download.file!=='string'||download.file.length>100||!(/^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/).test(download.file)||filenames.has(download.file))throw new Error('Unsafe or duplicate worksheet filename: '+index);
  filenames.add(download.file);
 }
 const news=record(data.news,'news'),newsIds=new Set();
 for(const [index,item]of array(news.items,'news.items').entries()){
  record(item,'news item');uniqueId(item.id,newsId,newsIds,'news.items.'+index+'.id');
  external(item.url,'news.items.'+index+'.url');
  for(const field of ['sourceUrl','sourceURL'])if(item[field]!==undefined)external(item[field],'news.items.'+index+'.'+field);
  refs(item.resources,'news.items.'+index+'.resources');
 }
 for(const [index,source]of array(news.sources,'news.sources').entries())external(record(source,'news source').url,'news.sources.'+index+'.url');
 const recommended=record(data.recommended,'recommended'),publishers=new Set(),creditedProviders=new Set();
 for(const [index,publisher]of array(recommended.publishers,'recommended.publishers').entries()){
  record(publisher,'recommended publisher');uniqueId(publisher.id,slugId,publishers,'recommended.publishers.'+index+'.id');
  if(publisher.channel===undefined&&publisher.website===undefined)throw Error('A creator needs a verified channel or official homepage');
  if(publisher.channel!==undefined){external(publisher.channel,'recommended.publishers.'+index+'.channel');const channel=new URL(publisher.channel);if(channel.hostname!=='www.youtube.com'||!/^\/(?:@[A-Za-z0-9_.-]+|(?:c|user)\/[A-Za-z0-9_.-]+|channel\/UC[A-Za-z0-9_-]{22})$/.test(channel.pathname)||channel.search||channel.hash)throw Error('Recommendations must link directly to a public YouTube channel');}
  if(publisher.website!==undefined){external(publisher.website,'recommended.publishers.'+index+'.website');const website=new URL(publisher.website);if(website.pathname!=='/'||website.search||website.hash)throw Error('Recommended websites must identify publishers at their official homepage, not a course or enrollment page');}
  const aliases=array(publisher.providers,'recommended publisher credits');if(!aliases.length||new Set(aliases).size!==aliases.length||aliases.some(name=>typeof name!=='string'||!name.trim()))throw Error('Invalid creator provider aliases');for(const name of aliases)creditedProviders.add(name);
  for(const field of ['name','focus','description','access','scope','checked'])if(typeof publisher[field]!=='string'||!publisher[field].trim())throw Error('Missing recommended publisher label: '+field);
 }
 for(const item of data.items)if(item.format!=='Reference'&&!creditedProviders.has(item.provider))throw Error('Video publisher missing from creator directory: '+item.provider);
 const site=record(data.publicSite,'publicSite');
 const purpose=record(site.purpose,'publicSite.purpose');
 for(const field of ['title','noteTitle','note'])if(typeof purpose[field]!=='string'||!purpose[field].trim())throw Error('Missing community-purpose text: '+field);
 if(!array(purpose.paragraphs,'publicSite.purpose.paragraphs').length||purpose.paragraphs.some(p=>typeof p!=='string'||!p.trim()))throw Error('Invalid community-purpose paragraphs');
 const creator=record(site.creator,'publicSite.creator'),profiles=new Set();
 if(creator.email!=='smarty.ctrl@gmail.com')throw Error('Unexpected public brand contact email');
 if(typeof creator.name!=='string'||!creator.name.trim())throw Error('Missing creator name');
 for(const profile of array(creator.profiles,'publicSite.creator.profiles')){
  record(profile,'creator profile');uniqueId(profile.id,slugId,profiles,'creator profile');external(profile.url,'creator profile URL');
  const url=new URL(profile.url),allowed={instagram:['www.instagram.com',/^\/[A-Za-z0-9._]+\/$/],linkedin:['www.linkedin.com',/^\/in\/[A-Za-z0-9-]+\/$/]}[profile.id];
  if(!allowed||url.hostname!==allowed[0]||!allowed[1].test(url.pathname)||url.search||url.hash)throw Error('Creator profiles must be clean original Instagram/LinkedIn profile URLs');
  if(typeof profile.label!=='string'||!profile.label.trim()||typeof profile.platform!=='string'||!profile.platform.trim())throw Error('Missing creator profile label');
 }
 if(profiles.size!==2)throw Error('Instagram and LinkedIn creator profiles are required');
 external(site.repositoryUrl,'publicSite.repositoryUrl');external(site.contactUrl,'publicSite.contactUrl');
 if(typeof site.repository!=='string'||!(/^[A-Za-z0-9][A-Za-z0-9_.-]*\/[A-Za-z0-9][A-Za-z0-9_.-]*$/).test(site.repository))throw new Error('Invalid public repository identity');
 if(site.repositoryUrl!=='https://github.com/'+site.repository||site.contactUrl!==site.repositoryUrl+'/issues')throw new Error('Public repository and issue-contact URLs must match their declared identity');
 for(const kind of ['privacy','terms'])for(const [index,section]of array(site[kind],'publicSite.'+kind).entries()){
  record(section,'legal section');
  if(section.id!==undefined&&(typeof section.id!=='string'||!/^[a-z][a-z0-9-]*$/.test(section.id)))throw Error('Invalid legal section anchor');
  if(section.email!==undefined&&section.email!==true)throw Error('Invalid legal email contact flag');
  for(const [linkIndex,link]of array(section.links||[],'legal links').entries())linkTuple(link,'publicSite.'+kind+'.'+index+'.links.'+linkIndex);
 }
 return data;
}

export function contentSecurityPolicy({scripts=[],styles=[]}={}){
 const hashes=values=>[...new Set(array(values,'CSP contents').map(value=>"'sha256-"+createHash('sha256').update(normalizeLf(value),'utf8').digest('base64')+"'"))].join(' ')||"'none'";
 return [
  "default-src 'none'",
  'script-src '+hashes(scripts),
  "script-src-attr 'none'",
  'style-src '+hashes(styles),
  "style-src-attr 'none'",
  "img-src 'self'",
  "connect-src 'none'",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
  "worker-src 'none'",
  "media-src 'none'",
  "font-src 'none'",
  "manifest-src 'none'",
  'upgrade-insecure-requests'
 ].join('; ')+';';
}

// A local last check supplements GitHub secret scanning. Pattern checks cannot
// identify every possible credential, so only the reviewed file list is published.
export function validatePublicationFile(file,content){
 if(file===SHARE_CARD)return validateShareCard(file,content);
 if(Object.hasOwn(ICON_ASSETS,file))return validateIconAsset(file,content);
 if(typeof content!=='string'||content.includes('\u0000'))throw new Error('Public files must be UTF-8 text: '+file);
 const privateData=/C:[\\/]|Documents[\\/]Codex|Bearer\s+[A-Za-z0-9._~-]{16,}|\bgh[pousr]_[A-Za-z0-9]{20,}|\bgithub_pat_[A-Za-z0-9_]{20,}|\b(?:AKIA|ASIA)[A-Z0-9]{16}\b|\bxox[baprs]-[A-Za-z0-9-]{10,}|-----BEGIN (?:[A-Z0-9 ]+ )?PRIVATE KEY-----|"kind"\s*:\s*"(?:albert|ame)-controls-study-backup"/i;
 if(privateData.test(content))throw new Error('Potential private data or credential in public file: '+file);
 if(file.endsWith('.svg')&&(!/^<svg\s[^>]*xmlns="http:\/\/www\.w3\.org\/2000\/svg"/.test(content.trim())||/<(?:script|foreignObject|image|use|style|animate|set)\b|\bon[a-z]+\s*=|\b(?:href|style)\s*=|<!DOCTYPE|<!ENTITY/i.test(content)))throw new Error('Unexpected active or external SVG content: '+file);
 // mail.google.com is reviewed only for the exact report-compose template, not as a general resource host.
 for(const match of content.matchAll(/href="((?:mailto:|https?:\/\/mail\.google\.com)[^"]*)"/gi)){
  const target=match[1].replace(/&(amp|quot|lt|gt|#39);/g,(_,entity)=>({amp:'&',quot:'"',lt:'<',gt:'>','#39':"'"}[entity]));
  if(target!=='mailto:smarty.ctrl@gmail.com')assertResourceReportUrl(target);
 }
 if(file.endsWith('.html')){
  if(!/<meta http-equiv="Content-Security-Policy" content="/.test(content))throw new Error('Missing browser policy: '+file);
  if(/<script\b[^>]*\bsrc\s*=|<(?:iframe|object|embed|form|base)\b/i.test(content))throw new Error('Unexpected active third-party content: '+file);
 }
 return content;
}

export function assertRemotePublicationTree(tree,expectedHashes){
 if(!tree||tree.truncated!==false||!Array.isArray(tree.tree))throw new Error('A complete remote tree is required before publication');
 const expected=new Map(Object.entries(expectedHashes)),found=new Set();
 for(const entry of tree.tree){
  if(entry.type==='tree'&&[...expected.keys()].some(file=>file.startsWith(entry.path+'/')))continue;
  if(entry.type!=='blob'||entry.mode!=='100644'||!expected.has(entry.path))throw new Error('Unexpected remote file or mode; preserve it and investigate before publishing: '+entry.path);
  if(entry.sha!==expected.get(entry.path))throw new Error('Unexpected remote edit; preserve and review before publishing: '+entry.path);
  found.add(entry.path);
 }
 if(found.size!==expected.size)throw new Error('A previously published file is missing; review before publishing');
 return true;
}
