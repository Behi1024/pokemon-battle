import { apiGet, apiPost } from "./api";
import type { BattlePayload, BattleResponse, LeaderboardResponse } from "../types";

export const battleService = {
  fight: (payload: BattlePayload) =>
    apiPost<BattleResponse>("/battle", payload),

  leaderboard: () =>
    apiGet<LeaderboardResponse>("/leaderboard"),
};
