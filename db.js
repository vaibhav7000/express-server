// this file is used to setup the connection between node JS server and the mongoDB server by using mongoose

// mongoDB also has its own server that is responsible for communicating with the Database and this mongoDB server should also listen at some port or at some address
// by default the server listens at mongo://localhost:27071

const mongoose = require('mongoose');

// const dbUrl = 'mongodb://localhost:27071/name_of_database'
// if the database is already present => our server will be connected to it else it will make new server in mongoDB

const dbUrl = 'mongodb://localhost:27017/resturant';

// this will connect the node JS server with the mongoDB server
// this is procedure to connect
mongoose.connect(dbUrl , {
  useNewUrlParser:true,
  useUnifiedTopology:true,
});

// after the connection the mongoose will provide us a connection object (db) that is responsible for interaction (communication) between 2 servers
// this will setup the connection
const db = mongoose.connection;

db.on('connected' , () => {
  console.log('connection to the db server is successful');
})

db.on('disconnected' , () => {
  console.log('db server is disconnected');
});

db.on('error' , () => {
  console.log('db server is facing some error to be connected');
});

// to make the connection we have to run this file in the index.js

module.exports = {
  db
};