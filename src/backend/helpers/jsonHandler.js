const fs = require("fs");
const path = require("path");

const dbFile = path.join(path.resolve("./static"), "/db.json");

function makesSureDbExists() {
  if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, JSON.stringify({}));
  }
}

function doesUrlExist(inputUrl) {
  const content = JSON.parse(fs.readFileSync(dbFile));
  for (const key in content) {
    if (content[key].url === inputUrl) {
      console.log(content[key].url);
      console.log(`url exists`);
      console.log(key);
      return key;
    }
  }
  return false;
}

module.exports = {
  makesSureDbExists,
  doesUrlExist,
};
