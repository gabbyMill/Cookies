import sendUrl from "./submit";
const urlBar = document.querySelector(".url-bar");
export default function sendUrlThroughEnter(keyEvent) {
  if (keyEvent.key === "Enter") {
    urlBar.blur();
    sendUrl(keyEvent);
  }
}
