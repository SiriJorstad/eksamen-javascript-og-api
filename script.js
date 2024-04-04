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

  //Slettefunksjon
  deleteButton.addEventListener("click", function () {
    pokemonContainer.remove();
  });

  pokemonContainer.appendChild(nameElement);
  pokemonContainer.appendChild(typeElement);
  pokemonContainer.appendChild(imageElement);
  pokemonContainer.appendChild(editButton);
  pokemonContainer.appendChild(saveButton);
  pokemonContainer.appendChild(deleteButton);

  container.appendChild(pokemonContainer);
}

document.body.appendChild(container);

//Filtreringsknapper med fargekoder
const bugButton = document.createElement("img");
bugButton.src = "/assets/bug.webp";
container.appendChild(bugButton);
bugButton.onclick = function () {
  filterPokemons("bug", "#91a019");
};

const darkButton = document.createElement("img");
darkButton.src = "/assets/dark.webp";
container.appendChild(darkButton);
darkButton.onclick = function () {
  filterPokemons("dark", "#282828");
};

const dragonButton = document.createElement("img");
dragonButton.src = "/assets/dragon.webp";
container.appendChild(dragonButton);
dragonButton.onclick = function () {
  filterPokemons("dragon", "#5061e1");
};

const electricButton = document.createElement("img");
electricButton.src = "/assets/electric.webp";
container.appendChild(electricButton);
electricButton.onclick = function () {
  filterPokemons("electric", "#fac006");
};

const fairyButton = document.createElement("img");
fairyButton.src = "/assets/fairy.webp";
container.appendChild(fairyButton);
fairyButton.onclick = function () {
  filterPokemons("fairy", "#f170f1");
};

const fightingButton = document.createElement("img");
fightingButton.src = "/assets/fighting.webp";
container.appendChild(fightingButton);
fightingButton.onclick = function () {
  filterPokemons("fighting", "#ff8006");
};

const fireButton = document.createElement("img");
fireButton.src = "/assets/fire.webp";
container.appendChild(fireButton);
fireButton.onclick = function () {
  filterPokemons("fire", "#e7282b");
};

const flyingButton = document.createElement("img");
flyingButton.src = "/assets/flying.webp";
container.appendChild(flyingButton);
flyingButton.onclick = function () {
  filterPokemons("flying", "#81baef");
};

const ghostButton = document.createElement("img");
ghostButton.src = "/assets/ghost.webp";
container.appendChild(ghostButton);
ghostButton.onclick = function () {
  filterPokemons("ghost", "#714170");
};

const grassButton = document.createElement("img");
grassButton.src = "/assets/grass.webp";
container.appendChild(grassButton);
grassButton.onclick = function () {
  filterPokemons("grass", "#41a129");
};

const groundButton = document.createElement("img");
groundButton.src = "/assets/ground.webp";
container.appendChild(groundButton);
groundButton.onclick = function () {
  filterPokemons("ground", "#915120");
};

const iceButton = document.createElement("img");
iceButton.src = "/assets/ice.webp";
container.appendChild(iceButton);
iceButton.onclick = function () {
  filterPokemons("ice", "#3ed8ff");
};

const normalButton = document.createElement("img");
normalButton.src = "/assets/normal.webp";
container.appendChild(normalButton);
normalButton.onclick = function () {
  filterPokemons("normal", "#9fa19f");
};

const poisonButton = document.createElement("img");
poisonButton.src = "/assets/poison.webp";
container.appendChild(poisonButton);
poisonButton.onclick = function () {
  filterPokemons("poison", "#9040cc");
};

const psychicButton = document.createElement("img");
psychicButton.src = "/assets/psychic.webp";
container.appendChild(psychicButton);
psychicButton.onclick = function () {
  filterPokemons("psychic", "#ef4077");
};

const rockButton = document.createElement("img");
rockButton.src = "/assets/rock.webp";
container.appendChild(rockButton);
rockButton.onclick = function () {
  filterPokemons("rock", "#afa981");
};

const steelButton = document.createElement("img");
steelButton.src = "/assets/steel.webp";
container.appendChild(steelButton);
steelButton.onclick = function () {
  filterPokemons("steel", "#60a1b8");
};

const waterButton = document.createElement("img");
waterButton.src = "/assets/water.webp";
container.appendChild(waterButton);
waterButton.onclick = function () {
  filterPokemons("water", "#2980ef");
};

const allButton = document.createElement("button");
allButton.textContent = "ALL POKEMONS";
allButton.style.backgroundColor = "white";
allButton.style.borderRadius = "1cm";
container.appendChild(allButton);
allButton.onclick = function () {
  filterPokemons("");
};

//Henter element-klassenavn som array og filtreringsfunskjon
const pokemonElements = document.getElementsByClassName("pokemon-div");
function filterPokemons(filter, color) {
  // Går gjennom hvert element og søker etter om type er det samme som "filter"
  for (let i = 0; i < pokemonElements.length; i++) {
    if (pokemonElements[i].querySelector("p").innerHTML.includes(filter)) {
      pokemonElements[i].style.display = "block";
      pokemonElements[i].style.backgroundColor = color;
    } else {
      pokemonElements[i].style.display = "none";
    }
  }
}
