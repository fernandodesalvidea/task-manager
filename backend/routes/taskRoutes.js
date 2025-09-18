const express = require('express');
const Task = require('../models/Task');
const router = express.Router();
const jwt = require('jsonwebtoken');


//GET request - return tasks array, from the backend to the frontend
router.get('/', authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({message: 'failed to fetch task', error: err.message})
  }
});

//ADD A TASK - POST
router.post('/', authenticateToken, async (req, res) => {
  try {
    //console.log("Decoded user in /task:", req.user);
    //console.log("Request body:", req.body);
      const newTask = new Task({
      content: req.body.content,
      date: Date.now(),
      priority: req.body.priority,
      userId: req.user._id || req.user.id
      
    });
    await newTask.save(); //save to DB
    res.status(201).json(newTask); //send it back as a response
  } catch (err) {
    res.status(500).json({message: 'failed to create task', error: err.message});
  }
});

//delete a task - DELETE:
router.delete('/:id', async (req, res) => {
  try{
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if(!deletedTask){
      return res.status(404).send('not found');
    }
    res.send('task deleted');
  }
  catch(err){
    res.status(500).json({message: 'failed to create task', error: err.message});
  }
})

//edit a task - PUT:
router.put('/:id', async (req, res) => {
  let {content, done, date, deadline, priority} = req.body;
  try {
      const foundTask = await Task.findById(req.params.id);
      if(!foundTask){
        return res.status(404).send('not found');
      }
      if(content !== undefined)foundTask.content = req.body.content;
      if(done !== undefined)foundTask.done = done
      if(date !== undefined)foundTask.date = date
      if(deadline !== undefined)foundTask.deadline = deadline
      if(priority !== undefined)foundTask.priority = priority
      
      await foundTask.save();//save to our DB
      res.status(201).json(foundTask); //send updated task back to the client
    }
    catch (err) {
    res.status(400).json({message: 'failed to edit task', error: err.message});
  }
});

//mark the task as complete:
router.put('/:id', async (req, res) => {
  try {
    const foundTask = await Task.findById(req.params.id); //find task in the db
    if(!foundTask){
      return res.status(400).send('not foundTask');
    }
    foundTask.done = true;
    await foundTask.save(); //save to DB
    res.status(201).json(foundTask); //send back to frontend  
  } catch (err) {
    console.error('PUT /:id error:', err);
    res.status(400).json({message: 'failed to mark task as done', error:err.message})
  }
});

//delete ALL tasks (clear all request)
router.delete('/', async (req, res) => {
  try {
    const result = await Task.deleteMany({})
    res.status(200).send({message: 'All tasks cleared'});
  } catch (err) {
    res.status(500).send(err);
  }
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
