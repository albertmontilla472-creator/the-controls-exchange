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
  .replace(/\//g,' ')
  .replace(/\s+/g,' ').trim();
}

export function controlsTermMatches(text,term,focusedText=text){
 return ['irm','cct','gfx','jci','vav','pid','ax','n4','n5','nrio','io'].includes(term)?focusedText.split(/[^a-z0-9]+/).includes(term):text.includes(term);
}
