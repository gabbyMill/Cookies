import "./style.css";
import sendUrl from "./frontend/eventHandlers/submit.js";
import sendUrlThroughEnter from "./frontend/eventHandlers/sendUrlThroughEnter";
import displayStats from "./frontend/eventHandlers/displayStats.js";
import wrapper from "./frontend/inputPage.js";
import axios from "axios";
wrapper();

const inp = document.querySelector("#inputField");
const urlBar = document.querySelector(".url-bar");
const submitBtn = document.querySelector(".submit");
const hdrCont = document.querySelector(".header-content");

async function updateDb(userData) {
  const [username, email, password] = [userData[1], userData[2], userData[3]];
  const res = await axios.post("/mongopass/register", {
    username,
    email,
    password,
  });
  // Should token number also be encrypted ?
  localStorage.setItem("token", res.data);
}
let inpVal = "";
let count = 0;
inp.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    inpVal += " " + inp.value;
    count++;
    console.log(inpVal);
    console.log(count);
    if (count === 3) updateDb(inpVal.split(" "));
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
