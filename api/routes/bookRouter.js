const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const { checkToken } = require("../middlewares/auth");

router.get("/best", bookController.getBestBooks);
router.get("/genre", bookController.getBooksByGenre);
router.get("/recomlist/:bookId", bookController.getRecommendedList);
router.get("/detail/:bookId", bookController.getBookDetailById);
router.post("/rental", checkToken, bookController.createRentalBookById);
router.post("/owner", checkToken, bookController.createOwnerBookById);

module.exports = { router };
