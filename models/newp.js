const mongoose = require('mongoose')

// SCHEMA
const pantrySchema = new mongoose.Schema({
  name: {type: String, required: true},
  img: String,
  qty: {type: Number, minimum: 0},
  tag: String,
})

// MODEL
const Newp = mongoose.model('Newp', pantrySchema)

module.exports = Newp
