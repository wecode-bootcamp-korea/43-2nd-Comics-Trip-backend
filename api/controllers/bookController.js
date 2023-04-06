const bookService = require("../services/bookService");
const { catchAsync } = require("../utils/error");

const getBooksByGenre = catchAsync(async (req, res) => {
  const books = await bookService.getBooksByGenre();
  return res.status(200).json(books);
});

const getBestBooks = catchAsync(async (req, res) => {
  const books = await bookService.getBestBooks();
  return res.status(200).json(books);
});

const getRecommendedList = catchAsync(async (req, res) => {
  const { bookId } = req.params;
  const books = await bookService.getRecommendedList(bookId);
  return res.status(200).json(books);
});

const getBookDetailById = catchAsync(async (req, res) => {
  const { bookId } = req.params;

  const detail = await bookService.getBookDetailById(bookId);

  return res.status(200).json({
    data: detail,
  });
});

const createRentalBookById = catchAsync(async (req, res) => {
  const { bookId, type } = req.body;
  const userId = req.user.id;

  if (!bookId) {
    const error = new Error("선택된 도서가 없습니다.");
    error.statuscode = 400;
    throw error;
  }
  await bookService.createRentalBookById(userId, bookId, type);

  return res.status(201).json({ message: `SUCCESSFULLY_CREATE_RENTAL` });
});

const createOwnerBookById = catchAsync(async (req, res) => {
  const { bookId, type } = req.body;
  const userId = req.user.id;

  if (!bookId) {
    const error = new Error("선택된 도서가 없습니다.");
    error.statuscode = 400;
    throw error;
  }
  await bookService.createOwnerBookById(userId, bookId, type);

  return res.status(201).json({ message: `SUCCESSFULLY_CREATE_OWNER` });
});

module.exports = {
  getBooksByGenre,
  getBestBooks,
  getRecommendedList,
  getBookDetailById,
  createRentalBookById,
  createOwnerBookById,
};
