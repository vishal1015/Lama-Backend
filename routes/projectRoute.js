const Project = require("../models/projectModel");
const router = require("express").Router();
const User = require('../models/userModel')


router.post('/', async(req, res)=>{
    console.log("Congro! I am creating project for you...")
    try {
      const user = await User.findOne({ email: "abc@gmail.com" });
      console.log('User found!')
      const project = new Project({
        name: req.body.name,
        desc: req.body.desc,
        user: user._id,
      });
      try {
        const savedPro = await project.save();
        console.log("Project Saved");
        user.projects.push(savedPro._id);
        console.log("User updated with Project");
        try {
            await user.save();
        } catch (e) {
            res.status(500).send("Could not save user after updading...");
        }
        console.log("User saved")
        res.send("Project Added")
      } catch (e) {
        res.status(500).send("Internal Error!");
      }
    } catch (e) {
      res.status(500).send("User not found to assign project!");
    }

    router.put('/edit', (req, res)=>{
        const newDesc = req.body.desc
        try{
            
        }
        catch(e){
            console.log(`Eroor  in finding description ${e}`);
        }
    })
    
    
})


module.exports = router