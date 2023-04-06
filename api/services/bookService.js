const bookDao = require("../models/bookDao");

const getBooksByGenre = async () => {
  return await bookDao.getBooksByGenre();
};

const getBestBooks = async () => {
  return await bookDao.getBestBooks();
};

const getRecommendedList = async (bookId) => {
  return await bookDao.getRecommendedList(bookId);
};

const getBookDetailById = async (bookId) => {
  return bookDao.getBookDetailById(bookId);
};

const createRentalBookById = async (userId, bookId, type) => {
  const value = bookId.map((id) => `(${userId},${id},1)`);
  const values = value.join(",");
  const bookIds = bookId.join(",");
  const checkUserbook = await bookDao.isInCollection(userId, bookIds);
  if (checkUserbook) {
    const error = new Error("ALREADY_EXIST_BOOK");
    error.statuscode = 400;
    throw error;
  }
  await bookDao.createRentalBookById(values, bookId);
  await bookDao.deductPointsFromUser(userId, bookIds, type);
};

const createOwnerBookById = async (userId, bookId, type) => {
  const value = bookId.map((id) => `(${userId},${id},1)`);
  const values = value.join(",");
  const bookIds = bookId.join(",");
  const checkUserbook = await bookDao.isInCollection(userId, bookIds);
  if (checkUserbook) {
    const error = new Error("ALREADY_EXIST_BOOK");
    error.statuscode = 400;
    throw error;
  }
  await bookDao.createOwnerBookById(values);
  await bookDao.deductPointsFromUser(userId, bookIds, type);
};

module.exports = {
  getBooksByGenre,
  getBestBooks,
  getRecommendedList,
  getBookDetailById,
  createRentalBookById,
  createOwnerBookById,
};
