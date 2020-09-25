// ==UserScript==
// @name       motto_e4628
// @namespace  https://github.com/kaibadash/motto_e4628
// @version    0.3
// @description  Improve Yorozuya(kinnosuke)
// @match      http*://www.e4628.jp/*
// @author     kaibadash
//
// ==/UserScript==

const REQUEST_FORM_INDEX_YEAR = 0;
const REQUEST_FORM_INDEX_MONTH = 1;
const REQUEST_FORM_INDEX_DATE = 2;
const REQUEST_FORM_INDEX_HOUR = 3;
const REQUEST_FORM_INDEX_MINUTE = 4;
const DEFAULT_START_HOUR = 10;
const DEFAULT_START_MINUTE = 0;
const DEFAULT_END_HOUR = 18;
const DEFAULT_END_MINUTE = 30;
const FORM_INDEX_CORRECTION = 1;
const START_OR_END_FORM_INDEX_END = 1;

window.onload = function () {
  redirectToSSL();
  showSheetInPreviousMonth();
  setDefaultRequest();
  setDefaultWorkEndTime();
  addLoadingMovie();
};

// NOTE: httpの場合、httpsにリダイレクトする。こういうのはCDNやWebサーバでやると良いでしょう。
function redirectToSSL() {
  if (window.location.protocol == "https:") {
    return;
  }
  location.replace(location.href.replace(/http:/, "https:"));
}

// NOTE: 月初の場合、先月の出勤簿を表示する。月初に出勤簿を見たい人はまれです。
function showSheetInPreviousMonth() {
  if (location.search != "?module=timesheet&action=browse") {
    return;
  }
  if (new Date().getDate() > 10) {
    return;
  }
  document
    .getElementById("kensaku")
    .getElementsByTagName("input")[0]
    .click();
}

// NOTE: 日付をインクリメントするのは余計です。時刻も現在時刻にするのは変です。
function setDefaultRequest() {
  if (
    document.getElementsByClassName("main_header") &&
    document
      .getElementsByClassName("main_header")[1]
      .textContent.indexOf("各種申請") < 0
  ) {
    return;
  }
  let formType = document.getElementById("slct_appformmasterid");
  if (formType) {
    formType.selectedIndex = FORM_INDEX_CORRECTION;
  }
  let textarea = document.getElementsByTagName("textarea");
  if (textarea.length > 0) {
    textarea[0].value = "打刻漏れのため。";
  }
  let forms = [];
  for (let i = 1; i <= 31; i++) {
    let d = ("0" + i).slice(-2);
    let form = document.getElementById(`unfixed0${d}`);
    if (form == undefined) {
      break;
    }
    forms.push(form);
  }
  if (forms.length == 0) {
    return;
  }
  // Select previous month if it is beginning of month.
  let now = new Date();
  let lastForm = forms[forms.length - 1];
  let lastSelects = lastForm.getElementsByTagName("select");
  if (now.getDate() < 10) {
    if (now.getMonth() == 0) {
      let year = lastSelects[REQUEST_FORM_INDEX_YEAR];
      year.selectedIndex = year.selectedIndex - 1;
    }
    let month = lastSelects[1];
    month.selectedIndex = month.selectedIndex - 1;
  }
  // select default start time
  lastSelects[REQUEST_FORM_INDEX_HOUR].selectedIndex = DEFAULT_START_HOUR;
  lastSelects[REQUEST_FORM_INDEX_MINUTE].selectedIndex = DEFAULT_START_MINUTE;
  // copy date from previous form
  if (forms.length > 1) {
    let prevForm = forms[forms.length - 2];
    let prevSelects = prevForm.getElementsByTagName("select");
    lastSelects[REQUEST_FORM_INDEX_YEAR].selectedIndex =
      prevSelects[REQUEST_FORM_INDEX_YEAR].selectedIndex;
    lastSelects[REQUEST_FORM_INDEX_MONTH].selectedIndex =
      prevSelects[REQUEST_FORM_INDEX_MONTH].selectedIndex;
    lastSelects[REQUEST_FORM_INDEX_DATE].selectedIndex =
      prevSelects[REQUEST_FORM_INDEX_DATE].selectedIndex;
  }
}

function setDefaultWorkEndTime() {
  for (let i = 1; i <= 31; i++) {
    let d = ("0" + i).slice(-2);
    let startOrEndSelect = document.getElementById(`reflect_item_names_0${d}`);
    if (startOrEndSelect == undefined) {
      break;
    }
    startOrEndSelect.onchange = function (event) {
      let select = event.target;
      if (select.selectedIndex != START_OR_END_FORM_INDEX_END) {
        return;
      }
      let idNum = select.id.slice(-2);
      let forms = document
        .getElementById(`unfixed0${idNum}`)
        .getElementsByTagName("select");
      forms[REQUEST_FORM_INDEX_HOUR].selectedIndex = DEFAULT_END_HOUR;
      forms[REQUEST_FORM_INDEX_MINUTE].selectedIndex = DEFAULT_END_MINUTE;
    };
  }
}

function addLoadingMovie() {
  if (!document.getElementById("seal_list0")) {
    return;
  }
  let signButton = document
    .getElementById("seal_list0")
    .getElementsByTagName("input")[0];
  signButton.addEventListener(
    "click",
    function () {
      let div = document.getElementsByTagName("body")[0];
      let video = document.createElement("video");
      let src = document.createElement("source");
      src.src =
        "https://github.com/kaibadash/motto_e4628/raw/feature/add_sign_movie/res/sign.mp4";
      video.style =
        "width: 200px; height: 200px; position:fixed; top: 20px; right: 20px; backgroud-color: tomato; background-color: #000;";
      video.appendChild(src);
      video.autoplay = true;
      document.body.appendChild(video, div);
    },
    false
  );
}
