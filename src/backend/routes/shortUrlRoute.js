const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const moment = require("moment");

const uniqueIdGenerator = require("../helpers/uniqueId.js");
const { makesSureDbExists } = require("../helpers/jsonHandler");
const { doesUrlExist } = require("../helpers/jsonHandler.js");
const validator = require("validator");
// this function will receive a request with a body
// that includes a url that needs shortening.
// it will write in your database the key (original url)
// and generate a value (new unique ID) and store them in an array/obj

makesSureDbExists(); // self-explanatory

router.post("/", (req, res, next) => {
  let { url } = req.body;
  if (!validator.isURL(url)) {
    console.log("not a valid url");
    return next({ status: 400, message: "Not a Valid URL" });
  }
  if (!url.includes("https://")) {
    url = "https://" + url;
  }
  if (doesUrlExist(url)) {
    return res.send(`http://localhost:3000/${doesUrlExist(url)}`);
  }
  const dbFile = path.join(path.resolve("./dist"), "/db.json");
  console.log("in short url route");
  try {
    const content = JSON.parse(fs.readFileSync(dbFile));
    const id = uniqueIdGenerator();
    const urlObj = { id, redirected: 0 };
    urlObj.url = url;
    urlObj.creationDate = moment().format("DD-MM-YYYY HH:mm:ss ");
    content.push(urlObj);
    fs.writeFileSync(dbFile, JSON.stringify(content));
    return res.json([`http://localhost:3000/${id}`, true]);
    // indicate to client-side that this is a new url
    // and did not previously exist in DB
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
