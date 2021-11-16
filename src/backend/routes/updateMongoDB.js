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

router.post("/register", async (req, res) => {
  // Later incorporate bycrpt.
  // Later relate this endpoint with sign in form in front-end
  // checkIfAuth No need for auth here right ?
  // Only signing in here, putting in the cookie,
  // and then later authenticating on specific stuff user wants to do
  // console.log(req.body);
  const { username, email, password } = req.body;
  const secTok = process.env.SEC_TOK;
  const token = jwt.sign({ username }, secTok, { expiresIn: "10s" }); // { expiresIn: "10s" }
  // await User.updateOne({ username, token });
  // Incorporate bycrpt for passwords
  // This should be in register
  await User.create({ username, token, email, password });
  // giving the user the token as a cookie:
  // This should stay here
  res.cookie("token", token, { expiresIn: "5s" });
  res.json(token);
  // send token to user and save it to Browser-LS
});

module.exports = router;

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
