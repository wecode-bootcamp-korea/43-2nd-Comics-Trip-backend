const viewerDao = require("../models/viewerDao");

const getViewerUserOwnBooks = async (userId, bookId, type) => {
  return viewerDao.getViewerUserBooks(userId, bookId, type);
};
const getViewerUserRentalBooks = async (userId, bookId, type) => {
  return viewerDao.getViewerUserBooks(userId, bookId, type);
};

module.exports = {
  getViewerUserOwnBooks,
  getViewerUserRentalBooks,
};
