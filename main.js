'use state'

const body = document.querySelector('.body')
const QBox = document.querySelector('.Q-Box')
const today = document.querySelector('.date')
const pm10 = document.querySelector('.pm10')
const pm25 = document.querySelector('.pm25')

// 날짜 가져오기
let year = new Date().getFullYear()
let month = new Date().getMonth()
let date = new Date().getDate()

today.innerHTML=`${year}. ${month + 1}. ${date}`


// 구 선택하기
function handleOnChange() {
  let select_box = document.querySelector(".select-Box");
  let selected_index = select_box.selectedIndex
  let selected_guName = select_box.options[selected_index].value
  showMiseInfo(selected_guName)
}


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

