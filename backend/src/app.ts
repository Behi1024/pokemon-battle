import express from "express";
import cors from "cors";
import pokemonRoutes from "./routes/pokemon.routes";
import battleRoutes from "./routes/battle.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/pokemon", pokemonRoutes);
app.use("/battle", battleRoutes);

app.get("/", (_req, res) => {
  res.json({
    message: "Pokemon Battle API is running 🚀",
  });
});

export default app;
