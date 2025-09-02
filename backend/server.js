const express = require('express'); //import library to use express
const dotenv = require('dotenv'); //so .env file isn't pushed
const connectDB = require('./config/db');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config()
const app = express(); //create the server instance
app.use(cors()); // allows all origins
app.use(express.json())

app.use('/', taskRoutes);

const PORT = process.env.PORT || 4000;
//console.log('Starting server...');
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('DB connection failed', err);
});

