const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const bookRouter = require("./bookRouter");
const libraryRouter = require("./libraryRouter");

router.use("/user", userRouter.router);
router.use("/books", bookRouter.router);
router.use("/librarys", libraryRouter.router);

module.exports = router;
