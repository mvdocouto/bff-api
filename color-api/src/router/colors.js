const express = require('express')
const validatePayload = require('../utils/validate')
const router = express.Router()

const logger = require('../config/logger')
const {
  listColors, findColorByCategory, createNewColor, deleteColor
} = require('../controller/color')

const {
  BODY_NOT_FOUND,
  CATEGORY_IS_DELETED,
  CATEGORY_NOT_FOUND
} = require('../utils/statusMessage')

router.get('/', async (req, res) => {
  try {
    if (Object.keys(req.query).length !== 0) {
      const { category } = req.query
      const categoryColor = await findColorByCategory(category)
      if (categoryColor.length === 0) {
        return res.status(404).json({ message: CATEGORY_NOT_FOUND })
      }

      return res.status(200).json(categoryColor)
    }

    const categoryColor = await listColors()
    return res.status(200).json(categoryColor)
  } catch (error) {
    logger.error('Get list of categories')
    return res.status(500).json({ message: error })
  }
})

router.post('/', async (req, res) => {
  if (!validatePayload(req.body)) {
    return res.status(400).json({ message: BODY_NOT_FOUND })
  }

  const { category, color } = req.body
  try {
    const newColor = await createNewColor(category, color)
    return res.status(201).json(newColor)
  } catch (error) {
    logger.error(`Error when inserting a category. ${error}`)
    return res.status(500).json({ message: error })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const result = await deleteColor(req.params.id)

    if (result.deletedCount === 1) {
      return res.status(200).json({ message: CATEGORY_IS_DELETED })
    }
    logger.error(CATEGORY_NOT_FOUND)
    return res.status(404).json({ message: CATEGORY_NOT_FOUND })
  } catch (error) {
    logger.error(`Error deleting a category. ${error}`)
    return res.status(500).json({ message: error })
  }
})

module.exports = router
