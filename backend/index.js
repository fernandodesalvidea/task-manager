const express = require('express'); //import library to use express
const app = express(); //create the server instance
const PORT = 3000;

//add a route:
app.get('/', (request, response) => {
  response.send('hello world!'); //test a route (homepage)
});

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});


