const express = require("express");
const router = express.Router();
// const path = require("path");
const User = require("../../../models/User.js");
const checkIfAuth = require("../middleware/checkIfAuth.js");
const jwt = require("jsonwebtoken");

router.post("/signUp", checkIfAuth, (req, res) => {
  console.log(req.headers);
  const { user } = req.body;
  const secTok = process.env.SEC_TOK;
  const token = jwt.sign(user, secTok); // { expiresIn: "10s" }
  res.json(token);
  // document.sessionStorage.setItem("session1", token);
});
// router.get("/verify", checkIfAuth, (req, res) => {
//   console.log(req.user);
//   res.redirect("/app");
// });

const { incrementRedirect } = require("../helpers/jsonHandler.js");
// this route will serve the clients its
// corresponding url to the generated ids
router.get("/:id", checkIfAuth, async (req, res, next) => {
  console.log("in serve client route");
  const { id } = req.params;
  // const dbFile = path.join(path.resolve("./"), "/db.json");
  try {
    // Switch to MongoDB
    // const content = JSON.parse(fs.readFileSync(dbFile));

    const content = await User.find({});
    // console.log(content);
    // res.status(200).json(content);
    for (const objects of content) {
      if (objects.id === id) {
        incrementRedirect(objects);
        return res.redirect(objects.url); // redirect to json
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
