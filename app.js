const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const {ApolloServer} = require('apollo-server-express');
const bodyParser = require('body-parser');
const typeDefs = require('./schema/schema');
const resolvers = require('./schema/resolvers');

app.use(cors());

mongoose.connect(process.env.MONGO_URI, 
    {useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
        if (err) return console.log(err);
        console.log("Mongoose Connected...");
    });

const server = new ApolloServer({
    typeDefs,
    resolvers
});
server.applyMiddleware({app});

let PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`🚀 Server started on port ${PORT}`);
})