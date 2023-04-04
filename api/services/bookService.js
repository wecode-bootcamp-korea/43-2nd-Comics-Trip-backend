const bookDao = require('../models/bookDao')

const getBooksByGenre = async(genreId) => {
  return await bookDao.getBooksByGenre(genreId)
}
 
const getBestBooks = async() => {
  return await bookDao.getBestBooks()
}

const getRecommendedList = async(bookId) => {
  return await bookDao.getRecommendedList(bookId)
}

module.exports = {
  getBooksByGenre,
  getBestBooks,
  getRecommendedList
}