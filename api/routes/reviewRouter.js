const express = require("express");
const reviewController = require("../controllers/reviewController");
const { checkToken } = require("../middlewares/auth");

const router = express.Router();

router.get("/:bookId", reviewController.getReviewList);
router.post("", checkToken, reviewController.createReview);
router.delete("/:bookId", checkToken, reviewController.deleteReview);

module.exports = { router };
