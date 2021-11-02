const fs = require("fs");
const path = require("path");

const dbFile = path.join(path.resolve("./dist"), "/db.json");

function makesSureDbExists() {
  if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, JSON.stringify({}));
  }
}

function doesUrlExist(inputUrl) {
  const content = JSON.parse(fs.readFileSync(dbFile));
  for (const key in content) {
    if (content[key].url === inputUrl) {
      return key;
    }
  }
  return false;
}

module.exports = {
  makesSureDbExists,
  doesUrlExist,
};
