const fs = require("fs");
const path = require("path");
// const mongoose = require("mongoose");
const Url = require("../../../models/Url.js");

// what do you say about error handling here ?

const dbFile = path.join(path.resolve("./"), "/db.json");

function makesSureDbExists() {
  if (!fs.existsSync(dbFile)) {
    // Switch to MongoDB
    fs.writeFileSync(dbFile, JSON.stringify([]));
  }
}

function doesUrlExist(inputUrl) {
  try {
    // Switch to MongoDB
    const content = Url.find({});
    // const content = JSON.parse(fs.readFileSync(dbFile));
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

async function incrementRedirect(obj) {
  try {
    // const content = JSON.parse(fs.readFileSync(dbFile));
    // Switch to MongoDB
    const content = await Url.find({});
    for (const objects of content) {
      if (objects.id === obj.id) {
        objects.redirected++;
        // Switch to MongoDB
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
