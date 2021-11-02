import axios from "axios";
import makesSureIsHidden from "../classHandlers/toggleHidden.js";
import createElement from "../domHelpers/createElement.js";
const urlBar = document.querySelector(".url-bar");
const display = document.querySelector(".display-result");

export default async function sendUrl(e) {
  e.preventDefault();
  const res = await axios.post(`http://localhost:3000/api/shorturl`, {
    url: urlBar.value,
  });
  makesSureIsHidden("display-result");
  display.textContent = "";
  if (res.data[1] === true) {
    // server side sends true  as res.data[1]
    // if this url did not previously exist in DB
    display.textContent = "Your new shortened URL is available here:\n";
    display.append(
      createElement("a", res.data[0], ["link"], { href: res.data[0] })
    );
  } else {
    display.textContent = "This has already been shortened for you at\n";
    display.append(
      createElement("a", res.data, ["link"], {
        href: res.data,
        target: "_blank",
      })
    );
  }
  return;
}
