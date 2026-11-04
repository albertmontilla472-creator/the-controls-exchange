// One browser-safe resolver for Nav, folder rows, search results and document tabs.
// Keep this function self-contained: the builder injects its source, not imports.
export function resolveFolderIcon(node={}){
 const id=String(node.id||''),topic=String(node.criteria?.topic||''),tool=String(node.iconTool||node.criteria?.tool||''),track=String(node.criteria?.track||'');
 const fixed={
  host:'wb-host',platform:'wb-platform','platform-commissioning':'config','platform-software':'software','platform-docs':'document','platform-application-director':'station','platform-station-copier':'files','platform-tcp-ip':'drivers','platform-administration':'config','platform-backup':'backup',
  station:'wb-station',home:'home',config:'wb-config',services:'wb-services','service-vykon-pro':'vykon-pro',drivers:'wb-drivers',honeywell:'honeywell',
  'track-bas':'bas','general-bas':'bas','general-bas-sba':'bas','communication-protocols':'protocol-communications','protocol-wireless':'protocol-wireless','protocol-wireless-lorawan':'protocol-wireless','protocol-wireless-lora-radio':'protocol-wireless','protocol-bacnet':'protocol-bacnet','protocol-bacnet-general':'protocol-bacnet','protocol-bacnet-ip':'protocol-bacnet','protocol-bacnet-mstp':'protocol-bacnet','protocol-modbus':'protocol-modbus','protocol-modbus-general':'protocol-modbus','protocol-modbus-tcp':'protocol-modbus','protocol-modbus-rtu':'protocol-modbus','protocol-lon':'protocol-lon','protocol-lon-general':'protocol-lon','protocol-lon-ft10':'protocol-lon','protocol-lon-ip852':'protocol-lon','protocol-n2':'creator-johnson-controls','track-niagara':'niagara','niagara-ax':'niagara-ax','niagara-n4':'niagara-n4','niagara-n5':'niagara-n5',
  'track-optimizer':'irm','track-spyder':'spyder','track-ciper':'honeywell','ciper-30':'ciper-30','ciper-50':'ciper-50',
  'track-jci':'fx','track-distech':'creator-distech-controls',programming:'program','programming-kitcontrol':'niagara','programming-cct':'cct','study-route':'route',files:'wb-files',documentation:'document',
  downloads:'software',history:'history',news:'news','release-watch':'release',updates:'info',bookmarks:'bookmark',notes:'notes',recommended:'collection'
 };
 if(fixed[id])return fixed[id];
 // A format branch identifies what opens there; its parent retains the subject icon.
 if(id.endsWith('-videos'))return 'video';
 if(node.view==='docs'||id.endsWith('-docs'))return 'document';
 if(tool==='VYKON Pro')return 'vykon-pro';
 const topics={
  'Foundations':'bas','Electrical fundamentals':'points','Control modes':'program','System architecture':'drivers',
  'Alarms':'alarm','Alarms / trends':'alarm','Histories':'history','Schedules':'schedule',
  'Security':'security','Security / operations':'security','Tags / queries':'query',
  'Programming':'program','PID / control loops':'program','Simulation / testing':'program',
  'Graphics':'graphics','BACnet / networks':'drivers','Integration':'drivers','Sylk devices':'points',
  'Commissioning':'config','I/O':'points','Templates / reuse':'collection','Mixed collection':'collection',
  'Events / troubleshooting':'services','Troubleshooting':'config','Hardware / lineup':'lineup','Lineup':'lineup',
  'Documentation':'document','Software / licensing':'software','Licensing / compatibility':'security',
  'Migration':'route','Migration / compatibility':'route','Niagara 5':'niagara-n5','Release notes':'release'
 };
 if(topics[topic])return topics[topic];
 const tools={
  'BAS fundamentals':'bas','Niagara station':'station','Niagara platform':'platform','Niagara PX':'graphics',
  'Niagara Workbench':'niagara','Niagara development':'niagara','Niagara release information':'release','Niagara integration':'drivers',
  'Honeywell suite':'honeywell','IRM':'irm','Optimizer Advanced':'optimizer','Optimizer Essential':'optimizer',
  'Honeywell BMS Startup':'honeywell','Classic Spyder':'spyder','CIPer Model 30':'ciper-30','CIPer Model 50':'ciper-50','WEB-HMI':'honeywell',
  'APLT':'cct','FX system':'fx','FX Workbench':'fx','CCT':'cct','MAP Gateway':'cct','FX controller firmware':'fx',
  'Distech engineering':'engineering','EC-gfxProgram':'distech','Xpressgfx Points':'points','ECLYPSE tools':'eclypse','ECLYPSE / ENVYSION':'graphics'
 };
 if(tools[tool])return tools[tool];
 // Known subject families still get a meaningful symbol when new topic labels arrive.
 const subject=(topic+' '+tool+' '+String(node.label||'')).toLowerCase();
 if(/alarm/.test(subject))return 'alarm';
 if(/histor|trend/.test(subject))return 'history';
 if(/schedul|calendar/.test(subject))return 'schedule';
 if(/secur|licens|certificate/.test(subject))return 'security';
 if(/graphic|envysion|hmi|\bpx\b/.test(subject))return 'graphics';
 if(/program|control loop|\bpid\b|simulat/.test(subject))return 'program';
 if(/network|bacnet|gateway|integrat|architecture/.test(subject))return 'drivers';
 if(/\bi\/o\b|point|sylk|electrical/.test(subject))return 'points';
 if(/commission|troubleshoot|startup/.test(subject))return 'config';
 if(/hardware|lineup/.test(subject))return 'lineup';
 if(/document|manual|reference/.test(subject))return 'document';
 if(/migrat|compatib/.test(subject))return 'route';
 if(/fundamental|foundation/.test(subject))return 'bas';
 if(tool&&/optimizer/.test(tool.toLowerCase()))return 'optimizer';
 const family={bas:'bas',niagara:'niagara',optimizer:'irm',spyder:'spyder',ciper:'honeywell',jci:'fx',distech:'engineering'};
 return family[track]||(node.content==='videos'?'video':'collection');
}
