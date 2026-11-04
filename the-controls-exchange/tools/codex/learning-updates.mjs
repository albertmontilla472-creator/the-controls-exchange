// Dates belong to the edition that added a resource, independent of UI releases.
// Keep this function self-contained so its exact source can be used in the browser.
export function recentLearningEntries(items,maintenance,limit=6){
 const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
 const editions=new Map();
 for(const [rank,entry]of maintenance.entries()){
  const date=/^([A-Za-z]+) (\d{1,2}), (\d{4})$/.exec(entry.date||'');
  if(!date||!months.includes(date[1])||editions.has(String(entry.version)))continue;
  const iso=date[3]+'-'+String(months.indexOf(date[1])+1).padStart(2,'0')+'-'+date[2].padStart(2,'0');
  editions.set(String(entry.version),{rank,date:entry.date,iso});
 }
 return items.map((resource,index)=>({resource,index,edition:editions.get(String(resource.addedEdition))}))
  .filter(row=>row.edition)
  .sort((a,b)=>a.edition.rank-b.edition.rank||a.index-b.index)
  .slice(0,Math.max(0,Math.min(24,Number.isInteger(limit)?limit:6)))
  .map(({resource,edition})=>({id:resource.id,addedEdition:resource.addedEdition,addedDate:edition.date,addedIso:edition.iso}));
}
