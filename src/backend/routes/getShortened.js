const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

// this route will serve the clients its
// corresponding url to the generated ids
router.get("/:id", (req, res, next) => {
  console.log("in serve client route");
  const dbFile = path.join(path.resolve("./static"), "/db.json");
  console.log(dbFile);
  console.log(req.params);
  try {
    const content = JSON.parse(fs.readFileSync(dbFile));
    for (const key in content) {
      if (key === req.params.id) {
        // return the corresponding url
        console.log(`Match found ${JSON.stringify(content[key].url)}`);
        return res.redirect(content[key].url);
      }
    }
  } catch (error) {
    console.log("error in reading db file");
    next(error);
  }
  // res.end(); ?
});

module.exports = router;
