import "./style.css";
import sendUrl from "./frontend/eventHandlers/submit.js";

const urlBar = document.querySelector(".url-bar");
const submitBtn = document.querySelector(".submit");
submitBtn.addEventListener("click", sendUrl);
