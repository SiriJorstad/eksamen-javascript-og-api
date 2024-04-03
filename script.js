//Hente ut pokemons fra API
getPokemons();

async function getPokemons() {
  for (let i = 1; i <= 50; i++) {
    try {
      pokemonRequest = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const pokemonData = await pokemonRequest.json();
      const pokemon = {
        name: pokemonData.name,
        type: pokemonData.types[0].type.name,
        picture: pokemonData.sprites.front_default,
      };
      createPokemonElement(pokemon);
    } catch (error) {
      console.log("Couldn't catch 'em all. Please try again. ", error);
    }
  }
}

//Legge til pokemons i HTML
const container = document.createElement("div");

function createPokemonElement(pokemon) {
  const pokemonContainer = document.createElement("div");

  const nameElement = document.createElement("h2");
  nameElement.textContent = `Name: ${pokemon.name}`;

  const typeElement = document.createElement("p");
  typeElement.textContent = `Type: ${pokemon.type}`;

  const imageElement = document.createElement("img");
  imageElement.src = pokemon.picture;
  imageElement.alt = `Picture of the pokemon ${pokemon.name}`;

  pokemonContainer.appendChild(nameElement);
  pokemonContainer.appendChild(typeElement);
  pokemonContainer.appendChild(imageElement);

  container.appendChild(pokemonContainer);
}

document.body.appendChild(container);
