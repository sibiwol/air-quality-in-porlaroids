'use state'

const body = document.querySelector('.body')
const QBox = document.querySelector('.Q-Box')
const today = document.querySelector('.date')
const pm10 = document.querySelector('.pm10')
const pm25 = document.querySelector('.pm25')

// 구 선택하기
let selectedGu
function handleOnChange(e) {
  // 선택된 데이터 가져오기
  selectedGu = e.value;
  QBox.style.visibility = "hidden";
}

// 날짜 가져오기
let year = new Date().getFullYear()
let month = new Date().getMonth()
let date = new Date().getDate()

today.innerHTML=`${year}. ${month + 1}. ${date}`


// 서울 미세면지 정보 가져오기
function showMiseInfo(chosedGuName) {
  $.ajax({
      type: "GET",
      url: "http://openapi.seoul.go.kr:8088/6d4d776b466c656533356a4b4b5872/json/RealtimeCityAir/1/99",
  }).done(function (response) {
    let cityAir = response["RealtimeCityAir"]["row"];
    let rows = response["RealtimeCityAir"]["row"];
    for (let i = 0; i < cityAir.length; i++) {
      let mise = cityAir[i];
      let guName = mise["MSRSTE_NM"];
      let guMise = rows[i]['PM10'];
      let guChoMise = rows[i]['PM25'];
      if (chosedGuName === guName) {
        pm10.append(guMise);
        pm25.append(guChoMise)
      } 
    }
  })
}
showMiseInfo("중구")
// selectedGu와 guName이 같다면 


// WGS84 위도, 경도 값 출력 
// function onGeoOk(position) {
//   const lat = position.coords.latitude
//   const long = position.coords.longitude
//   console.log(lat, long);
// }

// function onGeoErro() {
//   alert('위치 정보를 가져올 수 없습니다')
// }

// navigator.geolocation.getCurrentPosition(onGeoOk, onGeoErro)

