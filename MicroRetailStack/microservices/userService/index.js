const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./database'); // Import the connectDB function
const cors = require('cors');

dotenv.config(); // Load environment variables

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors({ origin: 'http://localhost:3001' }));
app.use(morgan('dev')); // Logging HTTP requests
app.use(express.json()); // Parse JSON bodies

// Import user routes after initializing express app
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('User Service is up and running! Lets see what happens');
});

// MongoDB connection check route
app.get('/mongodb-status', (req, res) => {
  const status = mongoose.connection.readyState;
  let statusMessage = '';
  switch (status) {
    case 0: statusMessage = 'MongoDB Disconnected'; break;
    case 1: statusMessage = 'MongoDB Connected'; break;
    case 2: statusMessage = 'MongoDB Connecting'; break;
    case 3: statusMessage = 'MongoDB Disconnecting'; break;
    default: statusMessage = 'Unknown MongoDB Status'; break;
  }
  res.send(`Database Status: ${statusMessage}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
