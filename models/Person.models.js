const mongoose = require('mongoose');
const bycrypt = require('bcrypt');

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
  username : {
    type: String,
    required : true,
    unique : true,
  },
  password : {
    type : String,
    required : true,
  },
});

personSchema.methods.comparePassword = async (userPassword) => {
  const currentUser = this;
  try {
    const isMatch = await bycrypt.compare(userPassword , currentUser.password);
    return isMatch;
  } catch (error) {
    console.log('error is present in comparing password');
    return false;
  }
}


// this function will be called just before we will save document in mongoDB and here we will apply hashing on that field that we want this is provided by mongoose
personSchema.pre('save' , async function(next){
  const currentPerson = this;

  if(!currentPerson.isModified('password')){
    return next();
  }
  else{
    // apply hashing here
    try {
      // genrates a salt (extra string that will be added to passwaord)
      const salt = await bycrypt.genSalt(10);

      const hashPassword = await bycrypt.hash(currentPerson.password,salt);

      currentPerson.password = hashPassword;

      next();
    } catch (error) {
      console.log('error is present in hashing' , error);
      return next();
    }
  }
})

// implement that blueprint into the mongoDB refer this as collections in database and we have to run this in index.js
const Person = mongoose.model('Person',personSchema);

module.exports = Person;

// if a field with no required field than it will add data into DB without that field too

// when we will compare password than the compare method of bycrypt will extract salt from the hashed pass and the add that salt to the pass given by user and will perform hashing on it and then compare the two things