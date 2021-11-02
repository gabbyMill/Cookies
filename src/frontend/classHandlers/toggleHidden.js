export default function makesSureIsHidden(className) {
  const elClasses = document.querySelector(`.${className}`);
  if ([...elClasses.classList].includes("hidden")) {
    elClasses.classList.remove("hidden");
  }
  return;
}
