const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,  // Ensure emails are unique
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password should be at least 6 characters'],
  },
  age: {
    type: Number,
    min: [18, 'Age must be at least 18'],
  },
});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
