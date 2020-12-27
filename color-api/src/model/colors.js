const mongoose = require('mongoose')

const ColorByCategoriesSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model(
  'ColorByCategories',
  ColorByCategoriesSchema
)
