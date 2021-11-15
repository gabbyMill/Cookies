require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_ACCESS_TOKEN;
const app = express();
app.use(express.json());
const posts = [
  {
    username: "Sara",
    title: "I am your mother",
  },
  {
    username: "Abraham",
    title: "I am your father",
  },
  {
    username: "Darth Vader",
    title: "No! i am your father",
  },
];
app.get("/posts", authToken, (req, res) => {
  console.log(req.user);
  res.json(posts);
});
app.post("/login", (req, res) => {
  // valid user
  const username = req.body.username;
  const user = { name: username };
  const accessToken = generateAccessToken(user);
  res.json(accessToken);
});
app.delete("/logout", (req, res) => {
  res.send("yes");
});
function generateAccessToken(user) {
  return jwt.sign(user, secret, { expiresIn: "6s" });
}
function authToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
app.listen(3000, () => {
  console.log("running on port 3000");
});
