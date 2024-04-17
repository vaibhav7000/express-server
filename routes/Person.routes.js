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
    res.status(200).json(response);
  } catch (error) {
    console.log('error is present');
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