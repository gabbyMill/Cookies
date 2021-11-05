const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

const shortUrlRoute = require("./routes/shortUrlRoute.js");
const getShortenedUrl = require("./routes/getShortened.js");
const errorHandler = require("./middleware/errorHandler.js");

app.use(cors());
app.use(express.json());

app.use("/api", shortUrlRoute);

app.use("/app", express.static(path.resolve("./dist")));
app.get("/app", function (req, res) {
  res.sendFile(path.resolve("./dist/index.html"));
});
app.use("/", getShortenedUrl);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
// COMMENT error handler needs optimizing

// 92-941a6345d75e fwd="109.65.0.215" dyno=web.1 connect=0ms service=8ms status=302 bytes=275 protocol=https
// 2021-11-04T21:09:15.195324+00:00 app[web.1]: in serve client route
// 2021-11-04T21:09:45.195018+00:00 heroku[router]: at=error code=H12 desc="Request timeout" method=GET path="/app" host=gabby-mill-shortener.herokuapp.com request_id=c01bb5b7-5df4-4d9e-a36f-d8faa3f0d41c fwd="109.65.0.215" dyno=web.1 connect=0ms service=30000ms status=503 bytes=0 protocol=https
// 2021-11-04T21:09:46.026209+00:00 app[web.1]: in serve client route
