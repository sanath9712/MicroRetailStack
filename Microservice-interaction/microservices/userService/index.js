const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables
const app = express();

app.use(morgan('dev')); // Logging HTTP requests
app.use(express.json()); // Parse JSON bodies

// Import user routes after initializing express app
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('User Service is up and running! Lets see what happens');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
