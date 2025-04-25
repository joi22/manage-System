const express = require('express');
const connectDB = require('./Config/db');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose'); 
const router = require('./Router/user_Route');

const PORT = process.env.PORTS|| 5000;

app.use("/api/user", router)
app.use(express.json());

connectDB()

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use(require('./Router/user_Route'));



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// 