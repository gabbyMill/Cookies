const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const Url = require("../../../models/Url.js");

const uniqueIdGenerator = require("../helpers/uniqueId.js");
const { makesSureDbExists } = require("../helpers/jsonHandler");
const { doesUrlExist } = require("../helpers/jsonHandler.js");
const validator = require("validator");
// this function will receive a request with a body
// that includes a url that needs shortening.
// it will write in your database the key (original url)
// and generate a value (new unique ID) and store them in an array/obj

makesSureDbExists(); // self-explanatory

router.post("/shorturl", (req, res, next) => {
  let { url } = req.body;
  if (!validator.isURL(url)) {
    console.log("not a valid url");
    return next({ status: 400, message: "Not a Valid URL" });
  }
  if (!url.includes("https://")) {
    url = "https://" + url;
  }
  if (doesUrlExist(url)) {
    return res.send(`https://gm-short.herokuapp.com/${doesUrlExist(url)}`);
  }
  const dbFile = path.join(path.resolve("./"), "/db.json");
  console.log("in short url route");
  try {
    // Switch to MongoDB
    const content = JSON.parse(fs.readFileSync(dbFile));
    const id = uniqueIdGenerator();
    const urlObj = { id, redirected: 0 };
    urlObj.url = url;
    urlObj.creationDate = moment().format("DD-MM-YYYY HH:mm:ss ");
    content.push(urlObj);
    // Switch to MongoDB
    fs.writeFileSync(dbFile, JSON.stringify(content));
    return res.json([`https://gm-short.herokuapp.com/${id}`, true]);
    // indicate to client-side that this is a new url
    // and did not previously exist in DB
  } catch (error) {
    console.log(error);
    next(error);
    res.end();
  }
});

router.get("/statistic/:id", (req, res) => {
  const dbFile = path.join(path.resolve("./"), "/db.json");
  // Switch to MongoDB
  const content = JSON.parse(fs.readFileSync(dbFile));
  res.json(content);
  res.end();
});

module.exports = router;
