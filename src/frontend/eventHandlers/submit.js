import axios from "axios";
import makesSureIsNotHidden from "../classHandlers/toggleHidden.js";
import createElement from "../helpers/createElement.js";
const display = document.querySelector(".display-result");

export default async function sendUrl(e) {
  const urlBar = document.querySelector(".url-bar");
  e.preventDefault();
  try {
    const res = await axios.post(
      `https://gm-short.herokuapp.com/api/shorturl`,
      {
        url: urlBar.value,
      }
    );
    makesSureIsNotHidden("display-result");
    display.textContent = "";
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
    return;
  } catch (error) {
    if (error.isAxiosError) {
      console.log(error.response.data);
      makesSureIsNotHidden("display-result");
      display.textContent = "";
      display.textContent = error.response.data;
    } else {
      console.log("error coming from outside of axios");
      display.textContent = "";
      display.textContent = `Problem accessing your data
      Try again Later`;
    }
    return;
  }
}
