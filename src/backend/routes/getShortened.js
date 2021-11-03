const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

// this route will serve the clients its
// corresponding url to the generated ids
router.get("/:id", (req, res, next) => {
  console.log("in serve client route");
  const dbFile = path.join(path.resolve("./dist"), "/db.json");
  try {
    const content = JSON.parse(fs.readFileSync(dbFile));
    for (const objects of content) {
      if (objects.id === req.params.id) {
        return res.redirect(objects.url);
      }
    }
  } catch (error) {
    console.log("error in reading db file");
    next(error);
  }
  // res.end(); ?
});
router.get("/", (req, res) => {
  res.redirect("/app");
});

module.exports = router;
