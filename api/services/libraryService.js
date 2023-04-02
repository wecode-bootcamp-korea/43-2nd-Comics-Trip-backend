const libraryDao = require("../models/libraryDao");

const getOwnerLibraryBooks = async (userId) => {
  return libraryDao.getOwnerLibraryBooks(userId);
};

const getRentalLibraryBooks = async (userId) => {
  return libraryDao.getRentalLibraryBooks(userId);
};

module.exports = {
  getOwnerLibraryBooks,
  getRentalLibraryBooks,
};
