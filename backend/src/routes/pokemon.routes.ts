import { Router } from "express";
import { getPokemonById, getPokemonList } from "../services/pokemon.service";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const pokemon = await getPokemonList();

    res.json({
      success: true,
      data: pokemon,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Could not fetch Pokémon",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const pokemon = await getPokemonById(req.params.id);

    res.json({
      success: true,
      data: pokemon,
    });
  } catch {
    res.status(404).json({
      success: false,
      message: "Pokémon not found",
    });
  }
});

export default router;
