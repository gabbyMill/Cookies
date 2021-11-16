const express = require("express");
const router = express.Router();
// const path = require("path");
const Url = require("../../../models/Url.js");
const checkIfAuth = require("../middleware/checkIfAuth.js");

const { incrementRedirect } = require("../helpers/jsonHandler.js");
// this route will serve the clients its
// corresponding url to the generated ids
router.get("/:id", checkIfAuth, async (req, res, next) => {
  console.log("get id");
  const { id } = req.params;
  // const dbFile = path.join(path.resolve("./"), "/db.json");
  try {
    // Switch to MongoDB
    // const content = JSON.parse(fs.readFileSync(dbFile));
    const content = await Url.find({});
    // console.log(content);
    // res.status(200).json(content);
    for (const objects of content) {
      if (objects.id === id) {
        incrementRedirect(objects);
        return res.json(objects.url); // redirect to json
      }
    }
    throw { error: 400, message: "ID not found" };
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
