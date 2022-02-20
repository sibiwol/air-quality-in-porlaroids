const axios = require("axios");
const cheerio = require("cheerio");


// 도시: body<div.type3<div.noTop<div.mMap type1<div.con selected<table<tbody<tr<td
// 수치: tr<td<span

// axios를 활용해 AJAX로 HTML 문서를 가져오는 함수 구현
async function getHTML() {
  try {
    return await axios.get("https://m.airkorea.or.kr/air/qualityDetail__notice_copyrightViolation/PM10###");
  } catch (error) {
    console.error(error);
  }
}

