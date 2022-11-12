const express = require("express");
const voteController = require("../controllers/voteController");
const userController = require("../controllers/userController");

const router = express.Router();

router
  .route("/")
  .post(userController.protect, voteController.vote)
  .get(userController.protect, voteController.getTotalVotes);

module.exports = router;
