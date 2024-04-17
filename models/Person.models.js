const mongoose = require('mongoose');

// making of the blueprint of How the data will be stored through mongoose
const personSchema = new mongoose.Schema({
  name : {
    type : String,
    required:true,
  },
  mobile : {
    type : String,
    required: true,
    unique : true,
  },
  email : {
    type : String,
    required:true,
    unique:true,
  },
  address : {
    type :String,
    required:true,
  },
  salary : {
    type :Number,
    default : 10000,
  },
  designation : {
    type :String,
    enum : ['chef','waiter','owner'],
    required:true,
  },
  experience : {
    type :Number,
    default:0,
  },
});

// implement that blueprint into the mongoDB refer this as collections in database and we have to run this in index.js
const Person = mongoose.model('Person',personSchema);

module.exports = Person;

// if a field with no required field than it will add data into DB without that field too