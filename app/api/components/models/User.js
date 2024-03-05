const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  image: String,
  googleId: String, // To store the Google OAuth ID
});


const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
