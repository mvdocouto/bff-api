const ColorsByCategory = require('../model/colors')

const listColors = async () => {
  const categoryColor = await ColorsByCategory.find().select(
    'category color'
  )
  return categoryColor
}

const findColorByCategory = async (category) => {
  const categoryColor = await ColorsByCategory.find({
    category: category
  }).select('category color')
  return categoryColor
}

const createNewColor = async (category, color) => {
  const modelColor = new ColorsByCategory({
    category: category,
    color: color
  })
  const newColor = await modelColor.save()
  return newColor
}

const deleteColor = async (id) => {
  const result = await ColorsByCategory.deleteOne({ _id: id })
  return result
}

module.exports = {
  listColors,
  findColorByCategory,
  createNewColor,
  deleteColor
}
