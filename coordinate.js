let proj4 = require('proj4')

const grs80 = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";
const wgs84 = "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees"

var grs80P = proj4(wgs84, grs80, [127.7063258909378, 37.8216025075155]);
var wgs84P = proj4(grs80, wgs84, [1018158.6666838044, 1980226.7772867724]);

console.log(wgs84P)
console.log(grs80P)