// Shared, local-only controls vocabulary for the workbench and public collections.
// Keep both functions self-contained for exact-source browser injection.
export function normalizeControlsSearch(value){
 return String(value??'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase()
  .replace(/\bcipher\b/g,'ciper')
  .replace(/\b(?:ec[\s-]*)?gfx[\s-]*program\b/g,'gfx')
  .replace(/\binputs?\s*(?:and|\/|&)\s*outputs?\b|\binputs?\s+outputs?\b/g,'io')
  .replace(/\bi\s*\/\s*o\b|\bi\s+o\b/g,'io')
  .replace(/\binputs\b/g,'input').replace(/\boutputs\b/g,'output')
  .replace(/\bniagara\s*(?:n?4)\b/g,'n4').replace(/\bniagara\s*(?:n?5)\b/g,'n5').replace(/\bniagara\s*ax\b/g,'ax')
  .replace(/\bfacility\s+explorer\b|\bjohnson\s+controls\b/g,'jci')
  .replace(/\bcontroller\s+configuration\s+tool\b/g,'cct')
  .replace(/\bkit[\s-]*control\b/g,'kitcontrol').replace(/\bn[\s-]+rio\b/g,'nrio')
  .replace(/\bms[\s/-]*tp\b/g,'mstp').replace(/\bft[\s-]*10\b/g,'ft10').replace(/\bip[\s-]*852\b/g,'ip852').replace(/\blora[\s-]+wan\b/g,'lorawan')
  .replace(/\bpcd\s*3[\s.-]*m[\s.-]*6893\b/g,'pcd3m6893').replace(/\b(?:kronox|chronox|qronos)\b/g,'qronox')
  .replace(/\biec[\s-]*61131(?:[\s-]*3)?\b/g,'iec61131').replace(/\bco[\s-]+de[\s-]+sys\b/g,'codesys').replace(/\bplcs\b/g,'plc')
  .replace(/\bprogram\s+objects\b/g,'program object')
  .replace(/\bftt[\s-]*10a?\b/g,'ft10').replace(/\blon[\s-]+works\b/g,'lonworks').replace(/\bnode[\s-]+util\b/g,'nodeutil')
  .replace(/\blon[\s-]+scanner\b/g,'lonscanner').replace(/\bopen[\s-]+ldv\b/g,'openldv').replace(/\bu[\s-]+10\b/g,'u10')
  .replace(/\//g,' ')
  .replace(/\s+/g,' ').trim();
}

export function controlsTermMatches(text,term,focusedText=text){
 return ['irm','cct','gfx','jci','vav','pid','ax','n4','n5','nrio','io'].includes(term)?focusedText.split(/[^a-z0-9]+/).includes(term):text.includes(term);
}
