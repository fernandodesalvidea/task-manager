const express = require('express'); //import library to use express
const app = express(); //create the server instance
const PORT = 3000;

/////VARIABLES////
const tasks = []
let nextId = 1;


//add a route:
app.get('/', (req, res) => {
  res.send('hello world!'); //test a route (homepage)
});

app.listen(PORT, () => {
  console.log(`our server is running on http://localhost:${PORT}`);
});

//apply middleware:
app.use(express.json())



//GET request - return tasks array, from the backend to the frontend
app.get('/task', (req, res) => {
  res.status(200).send(tasks)
});

//test post request - we use POST bc the user is creating new data (task)
//make a task object
//push it to the array
app.post('/task', (req, res) => {
  let task = { //make object
    id: nextId,
    content: req.body.content,
    done: false,
  }
  tasks.push(task); //add to array
  res.status(200).send(task);
  nextId++;
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

