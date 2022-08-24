const express = require('express')
const app = express()

// .env
require('dotenv').config()

const PORT = process.env.PORT
const mongodbURI = process.env.MONGODBURI

const SESSION_SECRET = process.env.SESSION_SECRET
console.log('Here is the session secret');
console.log(SESSION_SECRET);

// MONGOOSE
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/dinnerapp')
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
})

// MIDDLEWARE
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// INDEX
app.get('/wfd', (req, res) => {
  console.log('index');
  res.render('index.ejs')
})

// NEW
app.get('/wfd/newp', (req, res) => {
  console.log('new pantry item');
  res.render('new.ejs')
})

app.post('/wfd', (req, res) => {

})

app.listen(3000, () => {
  console.log(`Server running on port ${PORT}`);
})
