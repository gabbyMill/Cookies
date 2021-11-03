import axios from "axios";
import makesSureIsHidden from "../classHandlers/toggleHidden.js";
import createElement from "../domHelpers/createElement.js";
const display = document.querySelector(".display-result");

export default async function sendUrl(e) {
  // document.querySelector(".url-bar").blur(); // makes sure you will not refire function with enter key
  const urlBar = document.querySelector(".url-bar");
  e.preventDefault();
  const res = await axios.post(`http://localhost:3000/api/shorturl`, {
    url: urlBar.value,
  });
  makesSureIsHidden("display-result");
  display.textContent = "";
  console.log(res.data);
  if (res.data[1] === true) {
    // server side sends true  as res.data[1]
    // if this url did not previously exist in DB
    display.textContent = "Your new shortened URL is available here:\n";
    display.append(
      createElement("a", res.data[0], ["link"], {
        href: res.data[0],
        target: "_blank",
      })
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
  // display.focus();
  return;
}
