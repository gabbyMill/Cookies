const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const { incrementRedirect } = require("../helpers/jsonHandler.js");
// this route will serve the clients its
// corresponding url to the generated ids
router.get("/:id", (req, res, next) => {
  console.log("in serve client route");
  const dbFile = path.join(path.resolve("./"), "/db.json");
  try {
    const content = JSON.parse(fs.readFileSync(dbFile));
    for (const objects of content) {
      if (objects.id === req.params.id) {
        incrementRedirect(objects);
        res.redirect(objects.url);
        res.end();
      }
    }
  } catch (error) {
    console.log("error in reading db file");
    next(error);
    res.end();
    // or
    // throw {message: 'problem reading file', status: 500} // ?
  }
});
router.get("/", (req, res) => {
  res.redirect("/app");
  res.end();
});

module.exports = router;
