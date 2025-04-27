const express = require('express');
const connectDB = require('./Config/db');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose'); 
const router = require('./Router/user_Route');

const PORT = process.env.PORTS|| 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./Router/user_Route'));


// connection  for database
connectDB()

// Router define for all routes
app.use("/api/user", router)
app.use("/api/register", router)
app.use("/api", router)

app.get('/', (req, res) => {
  res.send('Hello, world!');
});




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// 