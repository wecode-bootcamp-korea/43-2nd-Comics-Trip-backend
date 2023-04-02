const libraryService = require("../services/libraryService");
const { catchAsync } = require("../utils/error");

const getOwnerLibraryBooks = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const owner = await libraryService.getOwnerLibraryBooks(userId);

  return res.status(200).json({
    data: owner,
  });
});

const getRentalLibraryBooks = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const rental = await libraryService.getRentalLibraryBooks(userId);

  return res.status(200).json({
    data: rental,
  });
});

module.exports = {
  getOwnerLibraryBooks,
  getRentalLibraryBooks,
};
