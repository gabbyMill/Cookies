const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const uniqueIdGenerator = require("../helpers/uniqueId.js");
// does not validate it not being already in db

// this function will receive a request with a body
// that includes a url that needs shortening.
// it will write in your database the key (original url)
// and generate a value (new unique ID) and store them in an array/obj
function doesUrlExist(inputUrl) {
  const dbFile = path.join(path.resolve("./static"), "/db.json");
  const content = JSON.parse(fs.readFileSync(dbFile));
  for (const key in content) {
    if (content[key].url === inputUrl) {
      console.log(content[key].url);
      console.log(`url exists`);
      return true;
    }
  }
  return false;
}

router.post("/", (req, res, next) => {
  if (doesUrlExist(req.body.url)) {
    console.log("false");
    return res.send(`${req.body.url} has already been shortened for you`);
  }
  // insert functionality here that checks if this link is already
  // in the database ?
  // need to think if this is a functionality u really want
  const dbFile = path.join(path.resolve("./static"), "/db.json");
  console.log("in short url route");
  try {
    if (!fs.existsSync(dbFile)) {
      fs.writeFileSync(dbFile, JSON.stringify({}));
    }
    const content = JSON.parse(fs.readFileSync(dbFile));
    const id = uniqueIdGenerator();
    content[id] = req.body; // stores an object not the object value
    // this depends on how the body data will be sent
    // I can probably decide to send an array of values or only value etc...
    fs.writeFileSync(dbFile, JSON.stringify(content));
  } catch (error) {
    console.log(error);
    next(error);
  }
  res.json(req.body);
}); // all logic of shortening will happen hereE

module.exports = router;
