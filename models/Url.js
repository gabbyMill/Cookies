const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
  id: String,
  redirected: Number,
  url: String,
  creationDate: String,
});

const Url = mongoose.model("Url", urlSchema);

// userSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

module.exports = Url;
