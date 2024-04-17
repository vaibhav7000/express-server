const express = require('express');
const bodyparser = require('body-parser');
// establish the connection between the express server and mongoDB server
const db = require('./db');
require('dotenv').config();

const application = express();
application.use(bodyparser.json());


db.db;

application.listen(process.env.PORT,() => {
  console.log('sever is started at 3000 port');
});

application.get('/' , (req,res) =>{
  res.send('Your are present on home page');
})

const personRoutes = require('./routes/Person.routes');
const menuRouter = require('./routes/menu.routes');

application.use('/person' , personRoutes);
application.use('/menu' , menuRouter);

// if we want to update a document in mongoDB => use PUT/PATCH but we have to provide which data we want to update and its updated value


// express router will make the index file more clean by organizing the routes of each model into their own seperate files and it is the default feature of express

// Get -> Read , Post -> Create , Put/Patch -> Update , Delete -> Delete

// the dealing with the server takes times => wait until it is not completed

// body parser keeps the data from the client into the req.body as a object and make it simple for server to process the data that comes from the frontend and it called middleware and the format in which we want to keep the data is told to the bodyparser in our case we want the data in the form of json

// project0 -> DB -> cluster0 -> Menu and Person