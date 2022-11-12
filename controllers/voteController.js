const Vote = require("../models/voteModel");
const User = require("../models/userModel");

// vote a
exports.vote = async (req, res) => {
  // Check if user has voted before
  const user = await User.findById(req.body.userId);
  if (user) {
    return res.status(400).json({
      status: "fail",
      message: "This user seems to have voted already",
    });
  }

  const newVote = await Vote.create(req.body);

  res.status(201).json({
    status: "success",
    vote: newVote,
  });
};

exports.getTotalVotes = async (req, res) => {
  const optionsOneCount = await Vote.find({ candidateId: "opt_1" }).count();
  const optionsTwoCount = await Vote.find({ candidateId: "opt_2" }).count();
  const optionsThreeCount = await Vote.find({ candidateId: "opt_3" }).count();
  const optionsFourCount = await Vote.find({ candidateId: "opt_4" }).count();
  const totalCount = await Vote.find().count();

  res.status(200).json({
    status: "success",
    opt_1: optionsOneCount,
    opt_2: optionsTwoCount,
    opt_3: optionsThreeCount,
    opt_4: optionsFourCount,
    total: totalCount,
  });
};
