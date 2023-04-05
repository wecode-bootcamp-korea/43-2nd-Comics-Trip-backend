const reviewDao = require("../models/reviewDao");

const getReviewList = async (bookId) => {
  return await reviewDao.getReviewList(bookId);
};

const createReview = async (userId, bookId, content, rating) => {
  return await reviewDao.createReview(userId, bookId, content, rating);
};

const deleteReview = async (userId, bookId) => {
  return await reviewDao.deleteReview(userId, bookId);
};

module.exports = {
  getReviewList,
  createReview,
  deleteReview,
};
