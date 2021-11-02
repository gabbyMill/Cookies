const CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function generateUid(length = 6) {
  let uid = "";
  for (let i = 0; i < length; i++) {
    uid += CHARS[Math.floor(Math.random() * CHARS.length + 1)];
  }
  return uid;
}

module.exports = generateUid;
