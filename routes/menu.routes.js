const express = require('express');
const menuRouter = express.Router();

const Menu = require('../models/menu.models');

menuRouter.get('/' , async(req,res) => {
  try {
    const data = await Menu.find();
    res.status(200).json(data);
  } catch (error) {
    console.log('error is present', error);
    res.status(500).send('Internal server error');
  }
});

menuRouter.post('/' , async(req,res) => {
  try {
    const data = req.body;
    const newItem = new Menu(data);
    const response = await newItem.save();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

module.exports = menuRouter;