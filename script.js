//Hente ut pokemons
getPokemons();

async function getPokemons() {
  for (let i = 1; i <= 50; i++) {
    try {
      console.log(i);
      pokemonRequest = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const pokemonData = await pokemonRequest.json();
      const pokemon = {
        name: pokemonData.name,
        type: pokemonData.types[0].type.name,
        picture: pokemonData.sprites.front_default,
      };
      console.log(pokemon);
    } catch (error) {
      console.log("Couldn't catch 'em all. Please try again. ", error);
    }
  }
}
