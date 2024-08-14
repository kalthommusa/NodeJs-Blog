const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }
});

const User = mongoose.model('User', UserSchema); // collection will be named 'users' in the databas not 'User' 

module.exports = User;