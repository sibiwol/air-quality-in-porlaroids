'use state'

// 날짜 가져오기
const today= document.querySelector('.date')
let year = new Date().getFullYear()
let month = new Date().getMonth()
let date = new Date().getDate()

today.innerHTML=`${year}. ${month + 1}. ${date}`;

// WGS84 위도, 경도 값 출력

function onGeoOk(position) {
  const lat = position.coords.latitude
  const long = position.coords.longitude
  console.log(lat, long);
}

function onGeoErro() {
  alert('위치 정보를 가져올 수 없습니다')
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoErro)


// let proj4 = require('proj4')

// // UTM-K X-coor, Y-coor 출력하기
// const grs80 = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";
// const wgs84 = "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees"

// var grs80P = proj4(wgs84, grs80, [127.7063258909378, 37.8216025075155]);
// var wgs84P = proj4(grs80, wgs84, [1018158.6666838044, 1980226.7772867724]);

// console.log(wgs84P)
// console.log(grs80P)