const express = require('express'); //import library to use express
const dotenv = require('dotenv'); //import db
const connectDB = require('./config/db');
const cors = require('cors');

//DATABASE CONNECTION ---------------------------
dotenv.config()

const app = express(); //create the server instance
app.use(cors()); // allows all origins
app.use(express.json())

//add a route:
app.get('/', (req, res) => {
  res.send('hello world!'); //test a route (homepage)
});

const PORT = process.env.PORT || 4000;
console.log('Starting server...');
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('DB connection failed', err);
});


//import Task model:
const Task = require('./models/Task');


//GET request - return tasks array, from the backend to the frontend


app.get('/task', async (req, res) => {
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
app.delete('/task/:id', async (req, res) => {
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
app.put('/task/:id', async (req, res) => {
  let {content, done} = req.body;
  try {
      const foundTask = await Task.findById(req.params.id);
      if(!foundTask){
        return res.status(404).send('not found');
      }
      if(content !== undefined){foundTask.content = content}
      if(done !== undefined){foundTask.done = done}
      await foundTask.save();//save to our DB
      res.status(201).json(foundTask); //send updated task back to the client
    }
    catch (err) {
    res.status(400).json({message: 'failed to edit task', error: err.message});
  }
});

