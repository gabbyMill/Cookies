const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const router = express.Router();

router.use(cookieParser());

const User = require("../../../models/User.js");
const Url = require("../../../models/Url.js");

router.get("/", async (req, res) => {
  const collection = await User.find({});
  res.json(collection);
});

router.post("/signIn", async (req, res) => {
  // checkIfAuth No need for auth here right ?
  // Only signing in here, putting in the cookie,
  // and then later authenticating on specific stuff user wants to do
  const { username } = req.body;
  const secTok = process.env.SEC_TOK;
  const token = jwt.sign({ username }, secTok, { expiresIn: "10s" }); // { expiresIn: "10s" }
  // await User.updateOne({ username, token });
  await User.create({ username, token });
  // giving the user the token as a cookie:
  res.cookie("token", token, { expiresIn: "5s" });
  res.json(token);
  // send token to user ?
});

// Useless for now
router.get("/del-cookie", (req, res) => {
  // delete cookie from body or something
  res.clearCookie("foo");
  res.json("Cookie has been deleted");
});
router.get("/a", async (req, res) => {
  const x = await User.find({});
  res.json(x);
});
router.get("/b", async (req, res) => {
  const y = await Url.find({});
  res.json(y);
});

module.exports = router;
