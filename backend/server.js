const express = require("express");
require("dotenv").config();
const { default: mongoose } = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000; // Default port is 3000 if not provided
const work=require('./routes/workOut')
const user=require('./routes/user');

app.use(express.json())


//routes
app.use('/api/workouts',work)
app.use('/api/user',user)
mongoose.connect(process.env.MONG_URL)
.then(()=>{
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
      console.log("Connected to db");
    });
    
})
.catch((err)=>{
    console.log(err);
})

