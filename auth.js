const passort = require('passport');
const localStrategy = require('passport-local').Strategy;

const Person = require('./models/Person.models');

passort.use(new localStrategy(async(userName,password,done) => {
  // done is a callback function that will be passed by passport JS (middleware) and it takes 3 arguments (error,user,message)
  // if find then return the document of the user else return null/false
  try {
    const user = await Person.findOne({username : userName});

    if(!user){
      return done(null,false,{message : 'invalid username'});
    }

    const isPassMatch = user.password === password;

    if(!isPassMatch){
      return done(null,false,{message:'Incorrect Password'});
    }

    return done(null,user,{message : 'user is present'});
  } catch (error) {
    console.log('error is present',error);
    return done(error,false,{message : 'Internal Server error'});
  }
}));

const authentication = passort.authenticate('local',{session : false});

module.exports = authentication;