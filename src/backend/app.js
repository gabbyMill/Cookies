const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const shortUrlRoute = require("./routes/shortUrlRoute.js");
const getShortenedUrl = require("./routes/getShortened.js");

app.use(cors());
app.use(express.json());

app.use("/get", getShortenedUrl);
app.use("/api/shorturl", shortUrlRoute);

app.use("/", express.static(path.resolve("./dist")));
app.get("/", function (req, res) {
  res.sendFile(path.resolve("./dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
