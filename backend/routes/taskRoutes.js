const express = require('express');
const Task = require('../models/Task');
const router = express.Router();


router.get('/', (req, res) => {
  res.send('hello world');
});

//GET request - return tasks array, from the backend to the frontend
router.get('/task', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({message: 'failed to fetch task', error: err.message})
  }
});

//test post request - we use POST bc the user is creating new data (task)
//make a task object
//save it to our DB
router.post('/task', async (req, res) => {
  try {
      const newTask = new Task({
      content: req.body.content,
      date: Date.now
    });
    await newTask.save(); //save to DB
    res.status(201).json(newTask); //send it back as a response
  } catch (err) {
    res.status(500).json({message: 'failed to create task', error: err.message});
  }
});

//delete a task - DELETE:
router.delete('/task/:id', async (req, res) => {
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
router.put('/task/:id', async (req, res) => {
  let {content, done, date, deadline} = req.body;
  try {
      const foundTask = await Task.findById(req.params.id);
      if(!foundTask){
        return res.status(404).send('not found');
      }
      if(content !== undefined){foundTask.content = content}
      if(done !== undefined){foundTask.done = done}
      if(date !== undefined){foundTask.date = date}
      if(deadline !== undefined){foundTask.deadline = deadline}
      
      await foundTask.save();//save to our DB
      res.status(201).json(foundTask); //send updated task back to the client
    }
    catch (err) {
    res.status(400).json({message: 'failed to edit task', error: err.message});
  }
});

//delete ALL tasks (clear all request)
router.delete('/task', async (req, res) => {
  try {
    const result = await Task.deleteMany({})
    res.status(200).send({message: 'All tasks cleared'});
  } catch (err) {
    res.status(500).send(err);
  }
})

module.exports = router;
