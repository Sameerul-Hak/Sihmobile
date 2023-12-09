const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin:{
    type:String,
    default:false
  },
  isSite:{
    type:String,
    default:false
  },
  experience:{
    type:String,
    default:""
  },
  expert:
  {
    type:String,
    default:""
  },
  expectedPay:{
    type:String,
    default:1000
  },
  gender:{
    type:String,
  },
  previousProjects:{
    type:String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;