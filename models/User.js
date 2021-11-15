const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id: String,
  redirected: Number,
  url: String,
  creationDate: String,
});

const User = mongoose.model("User", userSchema);

// userSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

module.exports = User;
