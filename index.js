const express = require('express');
const bodyparser = require('body-parser');
const application = express();
// establish the connection between the express server and mongoDB server
const db = require('./db');
// middleware
require('dotenv').config();
// middleware
application.use(bodyparser.json());
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
db.db;

application.use(passport.initialize());
const authentication = require('./auth');

const whoReached = (req,res,next) => {
  console.log(`${new Date().getMonth()+1} hit to the ${req.originalUrl}`);
  // this is by default made by express to go to the next middleware;
  next(); 
};

// through this syntax we  will be call this middleware when any route API will hit
application.use(whoReached);

application.listen(process.env.PORT,() => {
  console.log('sever is started at 3000 port');
});


application.get('/' ,authentication , (req,res) =>{
  res.send('Your are present on home page');
})

const personRoutes = require('./routes/Person.routes');
const menuRouter = require('./routes/menu.routes');

application.use('/person' , personRoutes);
application.use('/menu' , menuRouter);


// middlewares are the task (extra features) that will be performed through the help of functions between the request and the response phase (cycle) think that that task will be performed before the API callback function 

// Authenticate means checking if he/she is part of our system
// Authorization means he/she is the part of our system and limiting its power in that system

// Authenication ----> Authorization


// Passport JS will be used as a middleware to check if the user is authenticated our system or not just before the API callback function executed
// the authentication will be performed on the basis of username and password (that is called passport local strategy)














// if we want to update a document in mongoDB => use PUT/PATCH but we have to provide which data we want to update and its updated value


// express router will make the index file more clean by organizing the routes of each model into their own seperate files and it is the default feature of express

// Get -> Read , Post -> Create , Put/Patch -> Update , Delete -> Delete

// the dealing with the server takes times => wait until it is not completed

// body parser keeps the data from the client into the req.body as a object and make it simple for server to process the data that comes from the frontend and it called middleware and the format in which we want to keep the data is told to the bodyparser in our case we want the data in the form of json

// project0 -> DB -> cluster0 -> Menu and Person