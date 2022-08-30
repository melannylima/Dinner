const mongoose = require('mongoose')

// SCHEMA
const recipeSchema = new mongoose.Schema({
  name: {type: String, required: true},
  img: String,
  cookTime: {type: Number, minimum: 0},
  directions: String,
  ingredients: String
})

// MODEL
const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe
