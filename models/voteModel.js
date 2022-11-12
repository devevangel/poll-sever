const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A vote must belong to a user"],
    },
    candidateId: {
      type: String,
      required: [true, "A vote must have a candidate id"],
    },
    candidateName: {
      type: String,
      required: [true, "Vote must have a candidate name"],
    },
  },
  { timestamps: true }
);

const Vote = mongoose.model("Vote", voteSchema);
module.exports = Vote;
