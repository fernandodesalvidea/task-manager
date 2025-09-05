const express = require('express');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');

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

function generateAccessToken(id, email) {
    return jwt.sign({id, email}, process.env.JWT_SECRET, {expiresIn: '1800s'});
}

//login a current user:
router.post('/user/login', async (req, res) => {
    try {
        const existingUser = await User.findOne({email: req.body.email});
        if(!existingUser){
            return res.status(400).send('user does not exist');
        }
        const isMatch = await existingUser.comparePassword(req.body.password);
        if(!isMatch) return res.status(401).send('invalid password');
        const token = generateAccessToken(existingUser.id, existingUser.email);
        res.json({token});
    } 
    catch (err) {
        res.status(500).json({message: 'error authenticating user', error: err.message});
    }
});

module.exports = router;