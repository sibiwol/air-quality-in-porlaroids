'use strict'

// 날짜 가져오기
const today= document.querySelector('.date')
let year = new Date().getFullYear()
let month = new Date().getMonth()
let date = new Date().getDate()

today.innerHTML=`${year}. ${month + 1}. ${date}`