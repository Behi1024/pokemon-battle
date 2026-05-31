
export interface User {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface AuthResponse {
  msg: string;
  token?: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}


export interface PokemonType {
  type: { name: string };
}

export interface PokemonStat {
  base_stat: number;
  stat: { name: string };
}

export interface PokemonSprites {
  front_default: string;
  other?: {
    "official-artwork"?: { front_default: string };
  };
}

export interface Pokemon {
  id: number;
  name: string;
  baseExperience: number;
  sprites: PokemonSprites;
  types: PokemonType[];
  stats: PokemonStat[];
}


export interface BattlePayload {
  pokemonId: number;
}

export interface BattleResult {
  player: Pokemon;
  enemy: Pokemon;
  playerPower: number;
  enemyPower: number;
  result: "win" | "lose";
  score: number;
}

export interface BattleResponse {
  success: boolean;
  data: BattleResult;
}


export interface ScoreEntry {
  _id: string;
  userId: string;
  username: string;
  pokemonId: number;
  pokemonName: string;
  enemyId: number;
  enemyName: string;
  result: "win" | "lose";
  score: number;
  createdAt: string;
}

export interface LeaderboardResponse {
  success: boolean;
  data: ScoreEntry[];
}


export interface ApiError {
  success: false;
  message: string;
}
