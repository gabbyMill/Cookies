const Url = require("../../../models/Url.js");
function updateMongoDB(req, res) {
  console.log(`request`);
  console.log(req.body);
  const collection = Url.find({});
  res.json(`Successfully sent from post to mongo db`);
}

module.exports = updateMongoDB;
