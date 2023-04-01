const express = require("express")
const router = express.Router()

const bookController = require('../controllers/bookController')

router.get('/best', bookController.getBestBooks)
router.get('/genre', bookController.getBooksByGenre)


module.exports = {
  router,
}