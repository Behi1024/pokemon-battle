import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    pokemonId: {
      type: Number,
      required: true,
    },

    pokemonName: {
      type: String,
      required: true,
    },

    enemyId: {
      type: Number,
      required: true,
    },

    enemyName: {
      type: String,
      required: true,
    },

    result: {
      type: String,
      enum: ["win", "lose"],
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
