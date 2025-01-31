const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./schema');  // Import the User model from schema.js

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.error('Error connecting to database', error);
  });

// POST endpoint to create a user
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    // Create a new user instance from the schema
    const user = new User({ name, email, password, age });

    // Validate and save the user to the database
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      // If validation fails, return 400 status with error message
      res.status(400).json({ message: `Validation error: ${error.message}` });
    } else {
      // For other errors, return 500 status
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
