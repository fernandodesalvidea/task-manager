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
      userId: req.user.id
      
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

// EDIT TASK
router.put('/:id/edit', authenticateToken, async (req, res) => {
  const { content, done, priority } = req.body;

  try {
    const foundTask = await Task.findById(req.params.id);
    if (!foundTask) return res.status(404).json({ message: 'Task not found' });

    if (content !== undefined) foundTask.content = content;
    if (done !== undefined) foundTask.done = done;
    if (priority !== undefined) foundTask.priority = priority;

    await foundTask.save();
    res.status(200).json(foundTask);
  } catch (err) {
    console.error('PUT /:id/edit error:', err);
    res.status(500).json({ message: 'Failed to edit task', error: err.message });
  }
});

// COMPLETE TASK
router.put('/:id/complete', authenticateToken, async (req, res) => {
  try {
    const foundTask = await Task.findById(req.params.id);
    if (!foundTask) return res.status(404).json({ message: 'Task not found' });

    foundTask.done = true;
    await foundTask.save();

    res.status(200).json(foundTask);
  } catch (err) {
    console.error('PUT /:id/complete error:', err);
    res.status(500).json({ message: 'Failed to complete task', error: err.message });
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
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log("🔎 Incoming Auth Header:", authHeader);

    if (token == null) {
        console.log("❌ No token found");
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error("❌ JWT verification error:", err.message);
            return res.sendStatus(403);
        }
        console.log("✅ Token verified. Decoded user:", user);
        req.user = user;
        next();
    });
}

module.exports = router;
