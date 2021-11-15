import "./style.css";
import sendUrl from "./frontend/eventHandlers/submit.js";
import sendUrlThroughEnter from "./frontend/eventHandlers/sendUrlThroughEnter";
import displayStats from "./frontend/eventHandlers/displayStats.js";
import wrapper from "./frontend/inputPage.js";
wrapper();

const inp = document.querySelector("#inputField");
const urlBar = document.querySelector(".url-bar");
const submitBtn = document.querySelector(".submit");
const hdrCont = document.querySelector(".header-content");

let inpVal = "";
inp.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    inpVal += " " + inp.value;
    console.log(inpVal);
  }
});
submitBtn.addEventListener("click", sendUrl);
urlBar.addEventListener("focus", e => {
  urlBar.addEventListener("keypress", sendUrlThroughEnter);
});
urlBar.addEventListener("blur", e => {
  urlBar.removeEventListener("keypress", sendUrlThroughEnter);
});
hdrCont.addEventListener("click", displayStats);
