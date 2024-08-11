// const Project = require("../models/projectModel");
// const router = require("express").Router();
// const User = require('../models/userModel')

// const user = {
//   email: 'abc@gmail.com',
// }

// router.post('/', async(req, res)=>{
//     console.log("Congro! I am creating project for you...")
//     try {
//       const user = await User.findOne({ email: "abc@gmail.com" });
//       console.log('User found!')
//       const project = new Project({
//         name: req.body.name,
//         desc: req.body.desc,
//         user: user._id,
//       });
//       try {
//         const savedPro = await project.save();
//         console.log("Project Saved");
//         user.projects.push(savedPro._id);
//         console.log("User updated with Project");
//         try {
//             await user.save();
//         } catch (e) {
//             res.status(500).send("Could not save user after updading...");
//         }
//         console.log("User saved")
//         res.send("Project Added")
//       } catch (e) {
//         res.status(500).send("Internal Error!");
//       }
//     } catch (e) {
//       res.status(500).send("User not found to assign project!");
//     }  
// })

//   router.put("/edit", (req, res) => {
//     const newDesc = req.body.desc;
//     try {
//     } catch (e) {
//       console.log(`Eroor  in finding description ${e}`);
//     }
//   });

// router.get('/get', async(req, res) => {
//   console.log("Req received from frontend")
//   try{
//     const fetchedUser = await User.findOne(user)
//     console.log("fetchedUser is: ", fetchedUser)
//     // res.send(fetchedUser)
//     projects = []
//     for(let i=0; i<fetchedUser.projects.length; i++){
//       const pId = fetchedUser.projects[i]
//       try{
//         const project = await Project.findOne({_id: pId})
//         projects.push(project)
//       } catch(e){
//         console.log("Fetching Projects form DB: ", e.message)
//         res.send(e.message)
//       }
//     }
//     res.send(projects)
//   } catch(e){
//     res.send(e.message)
//   }
// })


// module.exports = router



const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

// Create a new project
router.post('/users/:userId/projects', projectController.createProject);

// Get all projects for a user
router.get("/users/:userId/projects", projectController.getProjects);

// Update an existing project
router.put(
  "/users/:userId/projects/:projectId",
  projectController.updateProject
);

// Delete a project
router.delete(
  "/users/:userId/projects/:projectId",
  projectController.deleteProject
);

module.exports = router;

