const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const router = express.Router();

router.use(cookieParser());

const User = require("../../../models/User.js");
const checkIfAuth = require("../middleware/checkIfAuth.js");
router.post("/", async (req, res) => {
  const collection = await User.find({});
  console.log("colletction", collection);
  res.json(collection);
});

router.post("/signIn", checkIfAuth, (req, res) => {
  const { user } = req.body;
  const secTok = process.env.SEC_TOK;
  const token = jwt.sign({ user }, secTok, { expiresIn: "365d" }); // { expiresIn: "10s" }
  res.json(token);
  // send cookie to user
});

router.get("/set-cookies", (req, res) => {
  // set cookie from body or something
  res.cookie("foo", "bar", { expiresIn: "365d" }); // sets cookie
  res.json(`Set cookies`);
});
router.get("/get-cookies", (req, res) => {
  // get cookie from body or something
  res.json(req.cookies); // req.cookies
});

router.get("/del-cookie", (req, res) => {
  // delete cookie from body or something
  res.clearCookie("foo");
  res.json("Cookie has been deleted");
});

module.exports = router;

// const Url = require("../../../models/Url.js");

// const test = {
//   id: "123",
//   redirected: 1,
//   url: "https://gabby.org",
//   creationDate: "123 ",
// };
