const express = require("express");
const viewerController = require("../controllers/viewerController");
const { checkToken } = require("../middlewares/auth");

const router = express.Router();

router.get(
  "/own/:bookId/:type",
  checkToken,
  viewerController.getViewerUserOwnBooks
);
router.get(
  "/rental/:bookId/:type",
  checkToken,
  viewerController.getViewerUserRentalBooks
);

module.exports = { router };
