const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe.js')

// RECIPE INDEX
router.get('/', async (req, res) => {
  console.log('recipe index');
  let recipe = await Recipe.find({})
  res.render('indexr.ejs', {recipe})
})

// NEW RECIPE
router.get('/nr', (req, res) => {
  console.log('new recipe');
  res.render('newr.ejs')
})

// CREATE RECIPE
router.post('/', (req, res) => {
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
router.get('/:id', async (req, res) => {
  console.log('show recipe');
  let recipe = await Recipe.findById(req.params.id)
  res.render('showr.ejs', {recipe})
})

// DESTROY RECIPE
router.delete('/:id', (req, res) => {
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
router.put('/:id', (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) => {
    res.redirect('/dc')
  })
})

// EDIT RECIPE
router.get('/:id/edit', async (req, res) => {
  let recipe = await Recipe.findById(req.params.id)
  Recipe.findById(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render('editr.ejs', {recipe})
    }
  })
})

module.exports = router
