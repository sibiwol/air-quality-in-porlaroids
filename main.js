'use state'

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