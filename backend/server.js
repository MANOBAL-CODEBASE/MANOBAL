// Import
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

// Important Calls
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

// Declarations
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST;
const MONGO_URL = process.env.MONGO_URL;

// API Call
app.get('/', (req, res) => {
  res.send('<h1>Hello from Server</h1>');
});

// Server Listen & DB Connection
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('DB is Connected');
    app.listen(PORT, () => {
      console.log(`Server is Running on http://${HOST}:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
