// for now user is irrelevant but maybe
// later I'll add a user feature where you can

import axios from "axios";
import makesSureIsNotHidden from "../classHandlers/toggleHidden";
import createElement from "../helpers/createElement";
const display = document.querySelector(".display-result");

// switch between users
export default async function displayStats(user, id) {
  const link = document.querySelector(".link");
  if (link) {
    id = link.textContent.split(`https://gm-short.herokuapp.com/`)[1];
  }
  try {
    const res = await axios.get(
      `https://gm-short.herokuapp.com/api/statistic/${id}`
    );
    for (const obj of res.data) {
      if (obj.id === id) {
        console.log(obj);
        const title = createElement("div", "Statistics about your URL ", [
          "title",
        ]);
        const redirects = createElement(
          "div",
          `Times this link was visited: ${obj.redirected}`,
          ["stat"]
        );
        const orig = createElement("div", `Original URL: `, ["stat"]);
        orig.append(
          createElement("a", obj.url, ["link"], {
            href: obj.url,
            target: "_blank",
          })
        );
        const short = createElement("div", `Shortened URL: `, ["stat"]);
        short.append(
          createElement("a", `https://gm-short.herokuapp.com/${id}`, ["link"], {
            href: `https://gm-short.herokuapp.com/${id}`,
            target: "_blank",
          })
        );
        const date = createElement("div", `Date Created: ${obj.creationDate}`, [
          "stat",
        ]);
        display.textContent = "";
        display.append(title, short, orig, redirects, date);
      }
    }
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
  }
}
