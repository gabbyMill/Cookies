import axios from "axios";
const urlBar = document.querySelector(".url-bar");
const display = document.querySelector(".display-result");

export default async function sendUrl(e) {
  console.log(e.target);
  e.preventDefault();
  // e.stopPropagation();
  const res = await axios.post(`http://localhost:3000/api/shorturl`, {
    url: urlBar.value,
  });

  console.log(res.data);
  // e.preventDefault();
  // display.classList.toggle("hidden");
  // // possible to seperate into function
  // // that first checks if hidden is on and if is removes it (vice versa)
  // display.textContent = res.data;
  return;
}
