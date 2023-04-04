const bookService = require('../services/bookService')
const { catchAsync } = require('../utils/error')

const getBooksByGenre = catchAsync(async(req, res) => {
  const  {genreId}  = req.query;
  if(!genreId){
    return res.status(400).json({meesage:"KEY_ERROR"})
  }
  const books = await bookService.getBooksByGenre(genreId)
  return res.status(200).json(books)
}
)
const getBestBooks = catchAsync( async(req, res) => {
  const books = await bookService.getBestBooks()
  return res.status(200).json(books)
})

const getRecommendedList = catchAsync(async(req, res) => {
  const {bookId} = req.params;
  const books = await bookService.getRecommendedList(bookId)
  return res.status(200).json(books)

})
module.exports = {
  getBooksByGenre,
  getBestBooks,
  getRecommendedList

}