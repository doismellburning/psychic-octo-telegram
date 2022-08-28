// Taken from http://js.ward.asia.wiki.org/view/maidenhead-coordinates

function maidenheadToLatLong(grid) {
  const d = (i,a) =>
    grid.charCodeAt(i)-a.charCodeAt(0) || 0
  let lat = d(1,'A')*10 + d(3,'0')*1 + 
            d(5,'a')/24 + d(7,'0')/240 - 90
  let lon = d(0,'A')*20 + d(2,'0')*2 + 
            d(4,'a')/12 + d(6,'0')/120 - 180
  return [1*lat.toFixed(5),1*lon.toFixed(5)]
}
