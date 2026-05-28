import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const ScoreModel = mongoose.model("Score", scoreSchema);
