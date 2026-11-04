// Public resource metadata only. Never include visitor notes, search or browser state.
// Self-contained because the builder injects this function into the workbench.
export function resourceReportUrl(resource,client='gmail'){
 if(!resource||!/^([A-Z][0-9]{2,4})$/.test(resource.id||''))throw Error('Invalid report resource ID');
 if(!['gmail','email'].includes(client))throw Error('Invalid report email option');
 const title=String(resource.title||'').replace(/[\u0000-\u001f\u007f-\u009f]/g,' ').trim().slice(0,300);
 if(!title)throw Error('Missing report resource title');
 if(typeof resource.url!=='string'||!/^https:\/\//.test(resource.url)||/[\s\u0000-\u001f\u007f-\u009f\\]/.test(resource.url)||resource.url.length>5000)throw Error('Invalid report source URL');
 const url=new URL(resource.url);
 if(url.protocol!=='https:'||url.username||url.password||(url.port&&url.port!=='443'))throw Error('Invalid report source URL');
 const subject='The Controls Exchange resource report: '+resource.id;
 const body='Resource: '+title+'\nResource ID: '+resource.id+'\nOriginal source: '+resource.url+'\n\nIssue:\n\nDo not include passwords, customer information or building-access details.';
 return client==='email'?'mailto:smarty.ctrl@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body):'https://mail.google.com/mail/?view=cm&fs=1&to=smarty.ctrl%40gmail.com&su='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
}

export function assertResourceReportUrl(value){
 if(typeof value!=='string'||value.length>18000)throw Error('Invalid resource report link');
 let url;try{url=new URL(value);}catch{throw Error('Invalid resource report link');}
 const gmail=url.protocol==='https:'&&url.hostname==='mail.google.com'&&url.pathname==='/mail/'&&!url.username&&!url.password&&!url.port&&!url.hash;
 const email=url.protocol==='mailto:'&&url.pathname==='smarty.ctrl@gmail.com'&&!url.hash;
 const keys=gmail?['view','fs','to','su','body']:['subject','body'];
 if((!gmail&&!email)||url.searchParams.size!==keys.length||keys.some(key=>url.searchParams.getAll(key).length!==1)||(gmail&&(url.searchParams.get('view')!=='cm'||url.searchParams.get('fs')!=='1'||url.searchParams.get('to')!=='smarty.ctrl@gmail.com')))throw Error('Unexpected report destination, recipient or headers');
 const match=(url.searchParams.get('body')||'').match(/^Resource: ([^\r\n]+)\nResource ID: ([A-Z][0-9]{2,4})\nOriginal source: (https:\/\/[^\r\n]+)\n\nIssue:\n\nDo not include passwords, customer information or building-access details\.$/);
 if(!match||value!==resourceReportUrl({title:match[1],id:match[2],url:match[3]},gmail?'gmail':'email'))throw Error('Unexpected report content or headers');
 return value;
}
