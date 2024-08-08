const User = require("../models/userModel");

const findUser = (email) => {
    console.log("I am promise.")
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({ email: email });
        resolve(user);
      } catch (e) {
        console.log("ERROR: ", e.message);
        reject("User does not exist!");
      }
    });
}


module.exports = findUser