import { Router } from "express";
import { getPokemonById, getRandomPokemon } from "../services/pokemon.service";
import { ScoreModel } from "../models/ScoreModel";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { pokemonId } = req.body;

    if (!pokemonId) {
      return res.status(400).json({
        success: false,
        message: "pokemonId is required",
      });
    }

    const playerPokemon = await getPokemonById(String(pokemonId));
    const enemyPokemon = await getRandomPokemon();

    const playerPower = playerPokemon.baseExperience ?? 0;
    const enemyPower = enemyPokemon.baseExperience ?? 0;

    const result = playerPower >= enemyPower ? "win" : "lose";
    const score = result === "win" ? 100 : 25;

    await ScoreModel.create({
      userId: "000000000000000000000000",
      username: "demo-user",
      pokemonId: playerPokemon.id,
      pokemonName: playerPokemon.name,
      enemyId: enemyPokemon.id,
      enemyName: enemyPokemon.name,
      result,
      score,
    });

    res.json({
      success: true,
      data: {
        player: playerPokemon,
        enemy: enemyPokemon,
        playerPower,
        enemyPower,
        result,
        score,
      },
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Battle could not be completed",
    });
  }
});

export default router;
