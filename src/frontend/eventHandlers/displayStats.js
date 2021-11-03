// for now user is irrelevant but maybe
// later I'll add a user feature where you can

import axios from "axios";
import makesSureIsNotHidden from "../classHandlers/toggleHidden";

// switch between users
export default async function displayStats(user, id) {
  const link = document.querySelector(".link");
  if (link) {
    id = link.textContent.split(`http://localhost:3000/`)[1];
  }
  const res = await axios.get(`http://localhost:3000/api/statistic/${id}`);
  console.log(res.data);
  // display res.data etc...
  // make sure stats isn't hidden
}
