const express = require('express');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');

//register a new user
router.post('/register', async (req, res) => {
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
         if (err.code === 11000) { // Mongo duplicate key
      res.status(400).json({ message: 'Email already registered' });
    } else {
      res.status(500).json({ message: 'Error creating user', error: err.message });
    }
    }
});

function generateAccessToken(id, email) {
    return jwt.sign({id, email}, process.env.JWT_SECRET, {expiresIn: '1800s'});
    //id: user._id
}

//login a current user:
router.post('/login', async (req, res) => {
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

router.get('/profile', authenticateToken, (req, res) => {
    res.json({message: `Welcome, ${req.user.email}!`});
})

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']; //grab value of "Authorization" header
    const token = authHeader && authHeader.split(' ')[1]; //splits <Bearer> <token>, grab token

    if(token == null) return res.sendStatus(401); //no token? user not authorized access

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) console.error("JWT verification error:", err);
        if(err) return res.status(403); //token invalid or forbidden
        req.user = user; // attach decoded token payload (id, email) to req.user
        //that way, later routes can use it
        next();
    });
}

module.exports = router;