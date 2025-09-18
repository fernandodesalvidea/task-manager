const express = require('express'); //import library to use express
const dotenv = require('dotenv'); 
dotenv.config()
const path = require('path');
const connectDB = require('./config/db');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');


const app = express(); //create the server instance
app.use(cors()); // allows all origins
app.use(express.json())

//register api routes
app.use('/api/task', taskRoutes);
app.use('/api/user', userRoutes)

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// For any route not handled by your API, send back React's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 4000;
//console.log('Starting server...');
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('DB connection failed', err);
});

console.log(process.env.PORT);


