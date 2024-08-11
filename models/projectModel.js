// const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

// const projectSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     desc:{
//         type: String
//     },
//     user: {
//         type: Schema.Types.ObjectId,
//         ref: 'User'
//     }
//   },
//   { timestamps: true }
// );

// const Project = mongoose.model("Project", projectSchema);

// module.exports = Project;


const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
},{timestamps:true});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project; 
