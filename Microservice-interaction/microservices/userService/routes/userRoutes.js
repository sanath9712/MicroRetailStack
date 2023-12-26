const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', (req, res) => {
    res.send('User API is working!');
  });

router.get('/profile/',(req,res) => {
    res.send("My name is Donde esteba")
});

router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
