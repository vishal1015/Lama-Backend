 const express = require('express');
 const dotenv = require('dotenv');
 const cors = require("cors");
 const connectDb = require('./DB/db.js')

 dotenv.config();
 connectDb();
 const app = express();

  //middlewares
 app.use(cors());
 app.use(express.json());


 //routes
 

 app.get('/', (req, res)=>{
    res.send('Hare krisna in bckend');
 })

const PORT = 5000 || process.env.PORT ;
app.listen(PORT, ()=>{ console.log(`app is running successfully on port ${PORT}`)})
