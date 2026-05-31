import { apiGet } from "./api";
import type { Pokemon } from "../types";

export const pokemonService = {
  getById: (id: number | string) =>
    apiGet<Pokemon>(`/pokemon/${id}`),

  getRandom: () =>
    apiGet<Pokemon>("/pokemon/random"),
};
