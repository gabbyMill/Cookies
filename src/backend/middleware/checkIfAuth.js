// const express = require("express");
// const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

function checkIfAuth(req, res, next) {
  const token = req.cookies.token;
  const secTok = process.env.SEC_TOK;
  jwt.verify(token, secTok, (err, user) => {
    if (err) return res.status(403).json("Not able to verify user");
    req.user = user;
    next();
  });
}

module.exports = checkIfAuth;

// const authHeader = req.headers["auth"];
// const token = authHeader && authHeader.split(" ")[1];
