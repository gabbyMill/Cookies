const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser"); // ?
const checkIfAuth = require("../backend/middleware/checkIfAuth.js");
const updateMongoDB = require("../backend/routes/updateMongoDB.js");
dotenv.config();

app.use(cookieParser()); // ?

const morgan = require("morgan");
morgan.token("body", req => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

const port = process.env.PORT || 3000;

const shortUrlRoute = require("./routes/shortUrlRoute.js");
const getShortenedUrl = require("./routes/getShortened.js");
const errorHandler = require("./middleware/errorHandler.js");

app.use(cors());
app.use(express.json());

app.use("/api", checkIfAuth, shortUrlRoute);
app.post("/mongopass", updateMongoDB);

app.use("/app", express.static(path.resolve("./dist")));
app.get("/app", function (req, res) {
  res.sendFile(path.resolve("./dist/index.html"));
});
app.use("/", getShortenedUrl); // applied auth middleware only for this route
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

const url = process.env.MONGODB_URI;
(async () => {
  try {
    await mongoose.connect(url);
    console.log(`Mongo Connected`);
  } catch (err) {
    console.log(`Error connecting to Mongo ${err.message}`);
  }
})();
