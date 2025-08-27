const express = require('express'); //import library to use express
const dotenv = require('dotenv'); //import db
const connectDB = require('./config/db');

//DATABASE CONNECTION ---------------------------
dotenv.config()
connectDB();

const app = express(); //create the server instance
const PORT = process.env.PORT || 3000;



//add a route:
app.get('/', (req, res) => {
  res.send('hello world!'); //test a route (homepage)
});

app.listen(PORT, () => {
  console.log(`our server is running on http://localhost:${PORT}`);
});

//apply middleware:
app.use(express.json())

//import Task model:
const Task = require('./models/Task');


//GET request - return tasks array, from the backend to the frontend

app.get('/task', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({message: 'failed to fetch task', error: err.message});
  }
});

//test post request - we use POST bc the user is creating new data (task)
//make a task object
//save it to our DB
app.post('/task', async (req, res) => {
  try {
    const newTask = new Task({
      content: req.body.content,
    });
    await newTask.save(); //save to DB
    res.status(201).json(newTask); //send it back as a response
  } catch (err) {
    res.status(500).json({message: 'failed to create task', error: err.message});
  }
});

//delete a task - DELETE:
app.delete('/task/:id', (req, res) => {
  let found = false;
  let {id} = req.params;
  for(let i = 0; i < tasks.length; i++){
    if(tasks[i].id === Number(id)){ //find task
      found = true;
      tasks.splice(i, 1) //delete i
      break;
    }
  }
  if(found)
    res.status(200).send('task deleted');
  else
    res.status(404).send('ERROR task not found');
});

//edit a task - PUT:
app.put('/task/:id', (req, res) => {
let found = false;
  let {id} = req.params;
  let {content, done} = req.body;
  for(let i = 0; i < tasks.length; i++){
    if(tasks[i].id === Number(id)){ //find task
      found = true;
      if(content != undefined){
        tasks[i].content = content;
      }
      if(done != undefined){
        tasks[i].done = done;
      }
      break;
    }
  }
  if(found)
    res.status(200).send('task modified');
  else
    res.status(404).send('ERROR task not found');
});

