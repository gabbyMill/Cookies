export default function createElement(tag, content, classes = [], attr = {}) {
  const el = document.createElement(tag);
  el.classList.add(...classes);
  // add attributes if needed
  for (const key in attr) {
    el.setAttribute(key, attr[key]);
  }
  el.textContent = content;
  return el;
}
