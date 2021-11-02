const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// this function will receive a request with a body
// that includes a url that needs shortening.
// it will write in your database the key (original url)
// and generate a value (new unique ID) and store them in an array/obj

router.post("/", (req, res, next) => {
  console.log("in short url route");
  console.log(req.body);
  try {
    fs.writeFileSync(
      path.join(path.resolve("./static"), "/db.json"),
      JSON.stringify(req.body)
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
  res.json(req.body);
}); // all logic of shortening will happen here

module.exports = router;
