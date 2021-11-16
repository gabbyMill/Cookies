const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const validator = require("validator");
const Url = require("../../../models/Url.js");

const uniqueIdGenerator = require("../helpers/uniqueId.js");
const { makesSureDbExists } = require("../helpers/jsonHandler");
const { doesUrlExist } = require("../helpers/jsonHandler.js");
// this function will receive a request with a body
// that includes a url that needs shortening.
// it will write in your database the key (original url)
// and generate a value (new unique ID) and store them in an array/obj

makesSureDbExists(); // self-explanatory

router.post("/shorturl", async (req, res, next) => {
  let { url } = req.body;
  if (!validator.isURL(url)) {
    return next({ status: 400, message: "Not a Valid URL" });
  }
  if (!url.includes("https://")) {
    url = "https://" + url;
  }
  // not handled correctly
  // checks if exists then finds the url array again ?
  if (!doesUrlExist(url)) {
    return res.send(
      `https://gm-short.herokuapp.com/${doesUrlExist(url).toString()}`
    );
  }

  try {
    const id = uniqueIdGenerator();
    const urlObj = { id, redirected: 0 };
    urlObj.url = url;
    urlObj.creationDate = moment().format("DD-MM-YYYY HH:mm:ss ");
    await Url.create(urlObj);
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
  console.log("statistic/:id");
  const dbFile = path.join(path.resolve("./"), "/db.json");
  // Switch to MongoDB
  const content = JSON.parse(fs.readFileSync(dbFile));
  res.json(content);
  res.end();
});

module.exports = router;
