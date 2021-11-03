const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const shortUrlRoute = require("./routes/shortUrlRoute.js");
const getShortenedUrl = require("./routes/getShortened.js");
const errorHandler = require("./middleware/errorHandler.js");

app.use(cors());
app.use(express.json());

app.use("/", getShortenedUrl);
app.use("/api/shorturl", shortUrlRoute);

app.use("/app", express.static(path.resolve("./dist")));
app.get("/app", function (req, res) {
  res.sendFile(path.resolve("./dist/index.html"));
});
app.use(errorHandler);
app.app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
