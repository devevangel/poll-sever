const express = require("express");
const voteController = require("../Controllers/voteController");
const userController = require("../Controllers/userController");

const router = express.Router();

router
  .route("/")
  .post(userController.protect, voteController.vote)
  .get(userController.protect, voteController.getTotalVotes);

module.exports = router;
