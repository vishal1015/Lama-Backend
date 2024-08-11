// const mongoose = require("mongoose");
// const { isEmail } = require("validator");

// const Schema = mongoose.Schema;

// const userSchema = new Schema(
//   {
//     name: {
//         type: String,
//         required: true,
//     },
//     email: {
//       type: String,
//       required: [true, "please entern an email"],
//       unique: true,
//       lowercase: true,
//       validate: [isEmail, "please enter a valid email"],
//     },
//     password: {
//       type: String,
//       required: [true, "please entern an email"],
//     //   minlength: [6, "min password leanght 6 char"],
//     },
//     projects: [
//         {
//             type: Schema.Types.ObjectId,
//             ref: 'Project'
//         }
//     ]
//   },
//   { timestamps: true }
// );

// const User = mongoose.model("User", userSchema);

// module.exports = User;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
},{timestamps:true});

// module.exports = mongoose.model("User", userSchema);
const User = mongoose.model("User", userSchema);

module.exports = User;