const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const bookRouter = require("./bookRouter");
const libraryRouter = require("./libraryRouter");
const reviewRouter = require("./reviewRouter");
const viewerRouter = require("./viewerRouter");

router.use("/users", userRouter.router);
router.use("/books", bookRouter.router);
router.use("/librarys", libraryRouter.router);
router.use("/reviews", reviewRouter.router);
router.use("/viewers", viewerRouter.router);

module.exports = router;
