const allPokemons = [];
const typeFilter = [];

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
  pokemonContainer.classList.add("pokemon-div");

  const nameElement = document.createElement("h2");
  nameElement.textContent = pokemon.name;

  const typeElement = document.createElement("p");
  typeElement.textContent = pokemon.type;

  const imageElement = document.createElement("img");
  imageElement.src = pokemon.picture;
  imageElement.alt = `Picture of the pokemon ${pokemon.name}`;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";

  pokemonContainer.appendChild(nameElement);
  pokemonContainer.appendChild(typeElement);
  pokemonContainer.appendChild(imageElement);
  pokemonContainer.appendChild(editButton);
  pokemonContainer.appendChild(saveButton);
  pokemonContainer.appendChild(deleteButton);

  container.appendChild(pokemonContainer);
}

document.body.appendChild(container);

//Filtreringsknapper
const bugButton = document.createElement("button");
bugButton.textContent = "Bug";
container.appendChild(bugButton);
bugButton.onclick = function () {
  filterPokemons("bug");
};

const darkButton = document.createElement("button");
darkButton.textContent = "Dark";
container.appendChild(darkButton);
darkButton.onclick = function () {
  filterPokemons("dark");
};

const dragonButton = document.createElement("button");
dragonButton.textContent = "Dragon";
container.appendChild(darkButton);
dragonButton.onclick = function () {
  filterPokemons("dragon");
};

const electricButton = document.createElement("button");
electricButton.textContent = "Electric";
container.appendChild(electricButton);
electricButton.onclick = function () {
  filterPokemons("electric");
};

const fairyButton = document.createElement("button");
fairyButton.textContent = "Fairy";
container.appendChild(fairyButton);
fairyButton.onclick = function () {
  filterPokemons("fairy");
};

const fightingButton = document.createElement("button");
fightingButton.textContent = "Fighting";
container.appendChild(fightingButton);
fightingButton.onclick = function () {
  filterPokemons("fighting");
};

const fireButton = document.createElement("button");
fireButton.textContent = "Fire";
container.appendChild(fireButton);
fireButton.onclick = function () {
  filterPokemons("fire");
};

const flyingButton = document.createElement("button");
flyingButton.textContent = "Flying";
container.appendChild(flyingButton);
flyingButton.onclick = function () {
  filterPokemons("flying");
};

const ghostButton = document.createElement("button");
ghostButton.textContent = "Ghost";
container.appendChild(ghostButton);
ghostButton.onclick = function () {
  filterPokemons("ghost");
};

const grassButton = document.createElement("button");
grassButton.textContent = "Grass";
container.appendChild(grassButton);
grassButton.onclick = function () {
  filterPokemons("grass");
};

const groundButton = document.createElement("button");
groundButton.textContent = "Ground";
container.appendChild(groundButton);
groundButton.onclick = function () {
  filterPokemons("ground");
};

const iceButton = document.createElement("button");
iceButton.textContent = "Ice";
container.appendChild(iceButton);
iceButton.onclick = function () {
  filterPokemons("ice");
};

const normalButton = document.createElement("button");
normalButton.textContent = "Normal";
container.appendChild(normalButton);
normalButton.onclick = function () {
  filterPokemons("normal");
};

const poisonButton = document.createElement("button");
poisonButton.textContent = "Poison";
container.appendChild(poisonButton);
poisonButton.onclick = function () {
  filterPokemons("poison");
};

const psychicButton = document.createElement("button");
psychicButton.textContent = "Psychic";
container.appendChild(psychicButton);
psychicButton.onclick = function () {
  filterPokemons("psychic");
};

const rockButton = document.createElement("button");
rockButton.textContent = "Rock";
container.appendChild(rockButton);
rockButton.onclick = function () {
  filterPokemons("rock");
};

const steelButton = document.createElement("button");
steelButton.textContent = "Steel";
container.appendChild(steelButton);
steelButton.onclick = function () {
  filterPokemons("steel");
};

const waterButton = document.createElement("button");
waterButton.textContent = "Water";
container.appendChild(waterButton);
waterButton.onclick = function () {
  filterPokemons("water");
};

const allButton = document.createElement("button");
allButton.textContent = "All pokemons";
container.appendChild(allButton);
allButton.onclick = function () {
  filterPokemons("");
};

//de andre filterne nedover

//Henter element-klassenavn som array og filtreringsfunskjon
const pokemonElements = document.getElementsByClassName("pokemon-div");
function filterPokemons(filter) {
  // Går gjennom hvert element og søker etter om type er det samme som "filter"
  for (let i = 0; i < pokemonElements.length; i++) {
    if (pokemonElements[i].querySelector("p").innerHTML.includes(filter)) {
      pokemonElements[i].style.display = "block";
    } else {
      pokemonElements[i].style.display = "none";
    }
  }
}
