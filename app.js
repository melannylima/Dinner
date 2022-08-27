const express = require('express')
const app = express()
const Newp = require('./models/newp.js')
const methodOverride = require('method-override')

// .env
require('dotenv').config()

const PORT = process.env.PORT||4000
const mongodbURI = process.env.MONGODB_URI

const SESSION_SECRET = process.env.SESSION_SECRET
// console.log('Here is the session secret');
// console.log(SESSION_SECRET);

// MONGOOSE
const mongoose = require('mongoose')
const db = mongoose.connection

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.once('open', () => {
  console.log(`Mongodb connected at ${db.host}:${db.port}`);
})

// MIDDLEWARE
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

// DEFAULT
app.get('/', (req, res) => {
  res.send('default view')
})

// INDEX
app.get('/wfd', (req, res) => {
  console.log('index');
  let pantryItems = Newp.find({})
  res.render('index.ejs', {pantry: pantryItems})
})

// NEW
app.get('/wfd/newp', (req, res) => {
  console.log('new pantry item');
  res.render('new.ejs')
})

// CREATE
app.post('/wfd', (req, res) => {
  console.log('create');
  Newp.create(req.body, (err, newItem) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/wfd')
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
