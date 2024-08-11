// const User = require('../models/userModel')
// const router = require('express').Router()
// const findUser = require('../service/findUser')

// router.post('/', (req, res)=>{
//     const user = new User(req.body)
//     console.log(user)
//     user.save()
//     res.send("User saved!")
// })

// router.post('/login', async(req, res)=>{

//     try{
//         const user = await findUser(req.body.email)
//         res.status(200).send({ email: user.email, name: user.name ,password:user.password})
//     } catch(e){
//         res.status(201).send("User does not exist!")
//     }

// })

// module.exports = router



const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Create a new user
router.post("/users", userController.createUser);

// Update an existing user
router.put("/users/:userId", userController.updateUser);

// login for a user 
router.post("/users/login", userController.loginUser);


module.exports = router;
