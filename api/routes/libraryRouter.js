const express = require("express");
const libraryController = require("../controllers/libraryController");
const { checkToken } = require("../middlewares/auth");

const router = express.Router();

router.get("/owner", checkToken, libraryController.getOwnerLibraryBooks);
router.get("/rental", checkToken, libraryController.getRentalLibraryBooks);

module.exports = { router };
