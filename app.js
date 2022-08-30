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

// DEFAULT
app.get('/', (req, res) => {
  res.send('default view')
})

// RECIPE INDEX
app.get('/dc', async (req, res) => {
  console.log('recipe index');
  let recipe = await Recipe.find({})
  res.render('indexr.ejs', {recipe})
})

// NEW RECIPE
app.get('/dc/nr', (req, res) => {
  console.log('new recipe');
  res.render('newr.ejs')
})

// CREATE RECIPE
app.post('/dc', (req, res) => {
  console.log('creates recipe');
  Recipe.create(req.body, (err, data) => {
    if (err) {
      console.log(err);
    } else (
      res.redirect('dc')
    )
  })
})

// SHOW RECIPE
app.get('/dc/:id', async (req, res) => {
  console.log('show recipe');
  let recipe = await Recipe.findById(req.params.id)
  res.render('showr.ejs', {recipe})
})

// DESTROY RECIPE
app.delete('/dc/:id', (req, res) => {
  console.log('delete recipe');
  Recipe.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/dc')
    }
  })
})

// UPDATE RECIPE
app.put('/dc/:id', (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) => {
    res.redirect('/dc')
  })
})

// EDIT RECIPE
app.get('/dc/:id/edit', async (req, res) => {
  let recipe = await Recipe.findById(req.params.id)
  Recipe.findById(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render('editr.ejs', {recipe})
    }
  })
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
