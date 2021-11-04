const fs = require("fs");
const path = require("path");
const { nextTick } = require("process");

// what do you say about error handling here ?

const dbFile = path.join(path.resolve("./"), "/db.json");

function makesSureDbExists() {
  if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, JSON.stringify([]));
  }
}

function doesUrlExist(inputUrl) {
  try {
    const content = JSON.parse(fs.readFileSync(dbFile));
    for (const objects of content) {
      if (objects.url === inputUrl) {
        return objects.id;
      }
    }
    return false;
  } catch (error) {
    throw { message: "Problem reading db file", status: 500 }; // ?
  }
}

function incrementRedirect(obj) {
  try {
    const content = JSON.parse(fs.readFileSync(dbFile));
    for (const objects of content) {
      if (objects.id === obj.id) {
        objects.redirected++;
        return fs.writeFileSync(dbFile, JSON.stringify(content));
      }
    }
    return false;
  } catch (error) {
    throw { message: "Problem reading db file", status: 500 };
  }
}

module.exports = {
  makesSureDbExists,
  doesUrlExist,
  incrementRedirect,
};
