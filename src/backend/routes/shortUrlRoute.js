const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const uniqueIdGenerator = require("../helpers/uniqueId.js");
const { makesSureDbExists } = require("../helpers/jsonHandler");
const { doesUrlExist } = require("../helpers/jsonHandler.js");
// this function will receive a request with a body
// that includes a url that needs shortening.
// it will write in your database the key (original url)
// and generate a value (new unique ID) and store them in an array/obj

makesSureDbExists(); // self-explanatory

router.post("/", (req, res, next) => {
  const { url } = req.body;
  if (doesUrlExist(url)) {
    return res.send(`http://localhost:3000/${doesUrlExist(url)}`);
  }
  const dbFile = path.join(path.resolve("./dist"), "/db.json");
  console.log("in short url route");
  try {
    const content = JSON.parse(fs.readFileSync(dbFile));
    const id = uniqueIdGenerator();
    content[id] = req.body;
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
