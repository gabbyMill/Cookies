const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const shortUrlRoute = require("./routes/shortUrlRoute.js");
const serveClientFiles = require("./routes/serveClientFiles.js");

app.use(cors());
app.use(express.json());

app.use("/", serveClientFiles);
app.use("/api/shorturl", shortUrlRoute);
app.use(express.static("static"));

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
