const express = require('express')
const app = express()

// MONGOOSE
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/dinnerapp')
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
})

// MIDDLEWARE
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
  res.send('new pantry item')
})

app.listen(3000, () => {
  console.log(`listening on port 3000`);
})
