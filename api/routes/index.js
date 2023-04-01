const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const bookRouter = require("./bookRouter")

router.use("/user", userRouter.router);
router.use("/books", bookRouter.router)

module.exports = router;
