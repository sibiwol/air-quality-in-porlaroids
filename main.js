'use state'

const today = document.querySelector('.date')
const pm10 = document.querySelector('.pm10')
const pm25 = document.querySelector('.pm25')
const 황사 = document.querySelector('.황사')

// 위치 묻기
// addEventListener(load) {}
// 날짜 가져오기
let year = new Date().getFullYear()
let month = new Date().getMonth()
let date = new Date().getDate()

today.innerHTML=`${year}. ${month + 1}. ${date}`

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