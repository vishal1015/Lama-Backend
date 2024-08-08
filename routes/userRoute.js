const User = require('../models/userModel')
const router = require('express').Router()
const findUser = require('../service/findUser')

router.post('/', (req, res)=>{
    const user = new User(req.body)
    console.log(user)
    user.save()
    res.send("User saved!")
})

router.get('/login', async(req, res)=>{
    // try{
    //     const user = await User.findOne({email: req.body.email})
    //     res.status(200).send({email: user.email, name: user.name})
    // }catch(e){
    //     console.log("ERROR:")
    //     res.status(404).send("User does not exist!")
    // }

    try{
        const user = await findUser(req.body.email)
        res.status(200).send({ email: user.email, name: user.name })
    } catch(e){
        res.status(404).send("User does not exist!")
    }

})

module.exports = router