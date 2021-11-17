const Url = require("../../../models/Url.js");

async function doesUrlExist(inputUrl) {
  try {
    const content = await Url.find({});
    for (const objects of content) {
      if (objects.url === inputUrl) {
        return objects.id;
      }
    }
    return false;
  } catch (err) {
    throw { message: "Problem reading db file", status: 500 }; // ?
  }
}

async function incrementRedirect(obj) {
  try {
    // return this ?
    await Url.findByIdAndUpdate(obj.id, {
      redirected: obj.redirected++,
    });
    return; // doesn't need to return y
  } catch (err) {
    throw { message: "Problem reading db file", status: 500 };
  }
}

module.exports = {
  doesUrlExist,
  incrementRedirect,
};

// Was In INCREMENT OBJECT FUNCTION

// const content = await Url.find({});
// for (const objects of content) {
//   if (objects.id === obj.id) {
//     objects.redirected++;
//     // Switch to MongoDB
//     return fs.writeFileSync(dbFile, JSON.stringify(content));
//   }
// }
// return false; // returns false if didn't succeed in updating
