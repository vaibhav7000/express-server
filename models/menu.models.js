const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  dishName : {
    type: String,
    required : true,
  },
  dishPrice : {
    type : Number,
    required : true,
  },
  dishCategoty : {
    type:String,
    enum : ['North Indian' , 'South Indian'],
  },

});

const Menu = mongoose.model('Menu',menuSchema);

module.exports = Menu;

// ingredients : {
//  type : [String] / type : [{type : String}]
// default : []
// }