const express = require("express");
const router = express.Router();
// const path = require("path");
const Url = require("../../../models/Url.js");
const checkIfAuth = require("../middleware/checkIfAuth.js");

const { incrementRedirect } = require("../helpers/jsonHandler.js");
// this route will serve the clients its
// corresponding url to the generated ids

router.get("/:id", checkIfAuth, async (req, res, next) => {
  const { id } = req.params;
  try {
    const content = await Url.find({});
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
  }
});

router.get("/", (req, res) => {
  res.redirect("/app");
  res.end();
});

module.exports = router;
