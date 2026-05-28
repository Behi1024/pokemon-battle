import { Router } from "express";
import { ScoreModel } from "../models/ScoreModel";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const scores = await ScoreModel.find()
      .sort({ score: -1, createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      data: scores,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Could not fetch leaderboard",
    });
  }
});

export default router;
