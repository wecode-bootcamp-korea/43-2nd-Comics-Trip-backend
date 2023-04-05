const reviewService = require("../services/reviewService");
const { catchAsync } = require("../utils/error");

const getReviewList = catchAsync(async (req, res) => {
  const { bookId } = req.params;
  const review = await reviewService.getReviewList(bookId);
  return res.status(200).json({ data: review });
});

const createReview = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { bookId, content, rating } = req.body;

  await reviewService.createReview(userId, bookId, content, rating);

  return res.status(201).json({ message: `SUCCESSFULLY_CREATE_REVIEW` });
});

const deleteReview = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.params;
  await reviewService.deleteReview(userId, bookId);

  return res.status(204).json();
});

module.exports = {
  getReviewList,
  createReview,
  deleteReview,
};
