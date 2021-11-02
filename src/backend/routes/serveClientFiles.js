const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("in serve client route");
  res.json(`in serve client route`);
});

module.exports = router;
