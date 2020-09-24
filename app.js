const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, 
    {useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
        if (err) return console.log(err);
        console.log("Mongoose Connected...");
    })

let PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
})