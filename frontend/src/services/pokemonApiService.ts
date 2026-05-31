
const BASE = "https://pokeapi.co/api/v2";

export interface PokemonSummary {
  id: number;
  name: string;
  types: string[];
  sprite: string;         // official artwork
  baseExperience: number;
}

function spriteUrl(id: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

function idFromUrl(url: string): number {
  const parts = url.replace(/\/$/, "").split("/");
  return Number(parts[parts.length - 1]);
}

async function fetchDetail(idOrName: number | string): Promise<PokemonSummary> {
  const res = await fetch(`${BASE}/pokemon/${idOrName}`);
  if (!res.ok) throw new Error(`Pokémon '${idOrName}' nicht gefunden`);
  const d = await res.json();
  return {
    id: d.id,
    name: d.name,
    types: (d.types as { type: { name: string } }[]).map((t) => t.type.name),
    sprite: d.sprites?.other?.["official-artwork"]?.front_default ?? spriteUrl(d.id),
    baseExperience: d.base_experience ?? 0,
  };
}

export async function fetchPokemonPage(limit = 20, offset = 0): Promise<PokemonSummary[]> {
  const res = await fetch(`${BASE}/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error("Pokémon-Liste konnte nicht geladen werden");
  const data: { results: { name: string; url: string }[] } = await res.json();

  return Promise.all(
    data.results.map((p) => fetchDetail(idFromUrl(p.url)))
  );
}

export async function searchPokemon(name: string): Promise<PokemonSummary> {
  return fetchDetail(name.toLowerCase().trim());
}

export const TYPE_COLORS: Record<string, string> = {
  normal: "#9099A1",   fire: "#F9622E",    water: "#4D90D5",
  electric: "#F4D23C", grass: "#63BB5B",   ice: "#74CEC0",
  fighting: "#CE4069", poison: "#AB6AC8",  ground: "#D97746",
  flying: "#8FA8DD",   psychic: "#F97176", bug: "#90C12C",
  rock: "#C5B78C",     ghost: "#5269AC",   dragon: "#0A6DC4",
  dark: "#5A5366",     steel: "#5A8EA2",   fairy: "#EC8FE6",
};
