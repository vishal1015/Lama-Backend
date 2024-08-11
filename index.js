 const express = require('express');
 const dotenv = require('dotenv');
 const cors = require("cors");
 const connectDb = require('./DB/db.js')
 const userRoute = require('./routes/userRoute.js')
 const projectRoute = require('./routes/projectRoute.js')
 const fileRoute = require('./routes/fileRoute.js')
 dotenv.config();
 connectDb();
 const app = express();

  //middlewares
 app.use(cors());
 app.use(express.json());


 //routes
 app.use('/api', userRoute)
 app.use('/api', projectRoute)
 app.use('/api', fileRoute )

const PORT = 5000 || process.env.PORT ;
app.listen(PORT, ()=>{ console.log(`app is running successfully on port ${PORT}`)})
