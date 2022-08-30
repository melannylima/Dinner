const express = require('express')
const router = express.Router()
const Newp = require('../models/newp.js')

// INDEX
router.get('/', async (req, res) => {
  console.log('index');
  let pantry = await Newp.find({})
  res.render('index.ejs', {pantry})
})

// NEW
router.get('/newp', (req, res) => {
  console.log('new pantry item');
  res.render('new.ejs')
})

// CREATE
router.post('/', (req, res) => {
  console.log('create');
  Newp.create(req.body, (err, newItem) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/wfd')
    }
  })
})

// SHOW
router.get('/:id', async (req, res) => {
  console.log('show');
  let pantry = await Newp.findById(req.params.id)
  res.render('show.ejs', {pantry})
})

// DESTROY
router.delete('/:id', (req, res) => {
  console.log('delete');
  Newp.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      console.log(err);
      res.send(err)
    } else {
      res.redirect('/wfd')
    }
  })
})

// UPDATE
router.put('/:id', (req, res) => {
  Newp.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) => {
    res.redirect('/wfd')
  })
})

// EDIT
router.get('/:id/edit', async (req, res) => {
  let pantry = await Newp.findById(req.params.id)
  Newp.findById(req.params.id, (err, data) => {
    if (err) {
      res.send(err)
    } else {
      res.render('edit.ejs', {pantry})
    }
  })
})

module.exports = router
