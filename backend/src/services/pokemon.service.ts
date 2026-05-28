export async function getPokemonList() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");

  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon list");
  }

  const data = await response.json();

  return data.results.map((pokemon: { name: string; url: string }) => {
    const id = Number(pokemon.url.split("/").filter(Boolean).pop());

    return {
      id,
      name: pokemon.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };
  });
}

export async function getPokemonById(id: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon details");
  }

  const data = await response.json();

  return {
    id: data.id,
    name: data.name,
    image: data.sprites.front_default,
    types: data.types.map((item: { type: { name: string } }) => item.type.name),
    height: data.height,
    weight: data.weight,
    baseExperience: data.base_experience,
  };
}

export async function getRandomPokemon() {
  const randomId = Math.floor(Math.random() * 151) + 1;

  return getPokemonById(String(randomId));
}
