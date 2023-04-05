const viewerService = require("../services/viewerService");
const { catchAsync } = require("../utils/error");

const getViewerUserOwnBooks = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { bookId, type } = req.params;
  const owner = await viewerService.getViewerUserOwnBooks(userId, bookId, type);

  return res.status(200).json({
    data: owner,
  });
});

const getViewerUserRentalBooks = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { bookId, type } = req.params;
  const rental = await viewerService.getViewerUserRentalBooks(
    userId,
    bookId,
    type
  );

  return res.status(200).json({
    data: rental,
  });
});

module.exports = {
  getViewerUserOwnBooks,
  getViewerUserRentalBooks,
};
