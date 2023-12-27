const bcrypt = require('bcryptjs');
const User = require('../models/User'); 
const jwt = require('jsonwebtoken');

// User registration
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            username,
            email,
            passwordHash: hashedPassword
        });

        // Save the user
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// User login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        // JWT Token
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
      );

        res.status(200).json({ message: 'User logged in successfully',token });
        // Implement JWT token creation and return it in response for real implementation
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Generate a reset token
      const token = crypto.randomBytes(20).toString('hex');

      // Set expiration time (e.g., 1 hour)
      user.passwordResetToken = token;
      user.passwordResetExpires = Date.now() + 3600000; // 1 hour in milliseconds

      await user.save();

      // Send token via email (implement email sending logic here)
      // ...

      res.status(200).json({ message: 'Password reset token sent to email' });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};
