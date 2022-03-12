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

let submit = document.getElementById('submitButton');
submit.onclick = showImage;     //Submit 버튼 클릭시 이미지 보여주기

function showImage() {
  let newImage = document.querySelector('.photo').lastElementChild;
  
  //이미지는 화면에 나타나고
  newImage.style.visibility = "visible";

  //이미지 업로드 버튼은 숨겨진다
  document.querySelector('.photo').style.visibility = 'hidden';
  document.querySelector('form').style.height = '10px'
}

// 이미지 파일 처리하기
function loadFile(input) {
  let file = input.files[0]
  let newImage = document.createElement("img");
  newImage.setAttribute("class", 'img');

  newImage.src = URL.createObjectURL(file);   

  newImage.style.width = "320px";
  newImage.style.height = "320px";
  newImage.style.visibility = "hidden";   //버튼을 누르기 전까지는 이미지를 숨긴다
  document.querySelector('.button').style.visibility = 'hidden'
  document.querySelector('.description').style.margin = '0 24px 24px 24px;'

  newImage.style.objectFit = "scale-down";

  //이미지를 photo div에 추가
  let showPhoto = document.querySelector('.photo');
  showPhoto.appendChild(newImage);
}

// 공유
function fn_sendFB(sns) {
  let thisUrl = document.URL;
  let snsTitle = "오늘의 창공"
  switch ( sns ) {
    // case 'kakaoTalk':
    //   let link = ""
    //   break
    case 'twitter':
      let link = "http://twitter.com/share?url="+encodeURIComponent(thisUrl)+"&text="+encodeURIComponent(snsTitle);
      window.open(link, "tweetPop", "width=486, height=286,scrollbars=yes")
      break
    // case 'instagram':
    //   let link = ""
    //   break
    // case 'url':
    //   let link = ""
    //   break
  }
}



