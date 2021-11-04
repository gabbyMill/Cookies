const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

const shortUrlRoute = require("./routes/shortUrlRoute.js");
const getShortenedUrl = require("./routes/getShortened.js");
const errorHandler = require("./middleware/errorHandler.js");

app.use(cors());
app.use(express.json());

app.use("/", getShortenedUrl);
app.use("/api", shortUrlRoute);

app.use("/app", express.static(path.resolve("./dist")));
app.get("/app", function (req, res) {
  res.sendFile(path.resolve("./dist/index.html"));
});
app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
// COMMENT error handler needs optimizing
