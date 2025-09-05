const express = require('express');
const User = require('../models/User');
const router = express.Router();

//register a new user
router.post('/user/register', async (req, res) => {
    try {
        const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        createdAt: Date.now(),
    });
    await newUser.save();
    res.status(201).json(newUser);
    } 
    catch (err) {
        res.status(500).json({message: 'error creating user', error: err.message});
    }
});

module.exports = router;