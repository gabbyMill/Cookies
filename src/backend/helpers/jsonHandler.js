const fs = require("fs");
const path = require("path");

const dbFile = path.join(path.resolve("./dist"), "/db.json");

function makesSureDbExists() {
  if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, JSON.stringify([]));
  }
}

function doesUrlExist(inputUrl) {
  const content = JSON.parse(fs.readFileSync(dbFile));
  for (const objects of content) {
    if (objects.url === inputUrl) {
      return objects.id;
    }
  }
  return false;
}

function incrementRedirect(obj) {
  const content = JSON.parse(fs.readFileSync(dbFile));
  for (const objects of content) {
    if (objects.id === obj.id) {
      objects.redirected++;
      return fs.writeFileSync(dbFile, JSON.stringify(content));
    }
  }
  return false;
}

module.exports = {
  makesSureDbExists,
  doesUrlExist,
  incrementRedirect,
};
