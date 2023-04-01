const bookDao = require('../models/bookDao')

const getBooksByGenre = async(genreId) => {
  return await bookDao.getBooksByGenre(genreId)
}
 
const getBestBooks = async() => {
  return await bookDao.getBestBooks()
}

module.exports = {
  getBooksByGenre,
  getBestBooks
}