const express = require('express')
const app = express()
const Newp = require('./models/newp.js')
const Recipe = require('./models/recipe.js')
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

// CONTROLLERS
const pantryController = require('./controllers/pantryController.js')
app.use('/wfd', pantryController)

const recipeController = require('./controllers/recipeController.js')
app.use('/dc', recipeController)

// DEFAULT
app.get('/', (req, res) => {
  res.render('home.ejs')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
