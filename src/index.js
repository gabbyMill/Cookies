import "./style.css";
import sendUrl from "./frontend/eventHandlers/submit.js";
import sendUrlThroughEnter from "./frontend/eventHandlers/sendUrlThroughEnter";

const urlBar = document.querySelector(".url-bar");
const submitBtn = document.querySelector(".submit");

submitBtn.addEventListener("click", sendUrl);
urlBar.addEventListener("focus", e => {
  urlBar.addEventListener("keypress", sendUrlThroughEnter);
});
urlBar.addEventListener("blur", e => {
  urlBar.removeEventListener("keypress", sendUrlThroughEnter);
});
