const express = require('express');
const personRoutes = express.Router();

const Person = require('../models/Person.models');

personRoutes.get('/' , async(req,res) => {
  try {
    const data = await Person.find();
    res.status(200).json(data);
  } catch (error) {
    console.log('error is present' , error);
    res.status(500).send('Internal server error');
  }
});

personRoutes.post('/' , async(req,res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log('done');
    res.status(200).json(response);
  } catch (error) {
    console.log('error is present bbr');
    res.status(500).send('Internal server error');
  }
});

personRoutes.get('/:type' , async(req,res) => {
  try {
    const type = req.params.type;
    if(type === 'chef' || type === 'waiter' || type === 'owner'){
      const data = await Person.find({designation : type});
      // console.log(typeof(data) , 'ge');
      res.status(200).json(data);
    }
    else{
      res.status(404).send('Invalid URL');
    }
  } catch (error) {
    console.log('error is present');
    res.status(500).send('Internal server error');
  }
});

personRoutes.put('/:id' , async(req,res) => {
  try {
    // the id here is parameter that will be send by the client and according to this we will find the document from mongoDB and update it
    const id = req.params.id;
    const updatedData = req.body;

    // if mongoDB does not have that id => return null means no data is present
    const updated = await Person.findByIdAndUpdate(id , updatedData , {
      new : true, // passing this will return the updated data
      runValidators : true, // if we pass this mongoose will also run its validators on the updated data that we have defined in mongoose.Schema
    });

    console.log(updated , 'grgreh');

    if(!updated){
      return res.status(404).send('invalid user no data is present');
    }
    console.log('data updated');
    res.status(200).json(updated);

  } catch (error) {
    console.log('error is present' , error);
    res.status(500).send('Internal server error');
  }
});

module.exports = personRoutes;

// tokens and sessions are like authentication that is given to us and hence we can access any thing using these tokens
// user Request ---> server(authenticate) ---> Databse and if auhenticate than send person a file that contains session id and stores a file in db with same session id
//  user <---  cookies (data) send by the server that contains the same session id that is stored by the database

// next time of authentication 

// user ---> send by browser (cookies) ---> server and server authenicate by comparing both sesion id present in database and send by use => user only have to authenticate one time and other time will be done by cookies and these are stored by the browser

// cookies store the information related to session id and broweser send these cookies when making the http request to the server

// session and token both have the same feature i.e storing information related to the user (authentication) but the generation process for both of them is different

// in token there is no role of Database all work is done by the server 

// first time when authenticate the user ---> send user name and password ---> server
// user <--- tokens send by the server and stored in the local storage of broweser for each website <--- server

// next

// user ---> tokens (cookies) send to the server ---> server and server will validate these tokens using secret key 
// user <--- data if tokens are correct <--- server

// for tokens gerneration there will be different kinds of methods/algorithms that will be used by server eg JWT tokens (json web tokens)

// there will be two kind of JWT tokens 1. jwt.sign() ---> that will create the tokens when the user will first time authenticate this function argument contain payload (contains information related to user) and secretkey


// 2. jwt.verify() ---> this will verify the tokens that will be send by the user when making request to the server this function argument will be token and the secret key