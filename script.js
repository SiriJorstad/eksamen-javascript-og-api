//Lage container for pokemons
const container = document.createElement("div");

// Hente inn lagrede pokemons fra localStorage
let savedPokemons;
if (JSON.parse(localStorage.getItem("savedPokemons"))) {
  savedPokemons = JSON.parse(localStorage.getItem("savedPokemons"));
} else {
  savedPokemons = [];
}

//Hente inn pokemons lagd av bruker
let userCreatedPokemons;
if (JSON.parse(localStorage.getItem("userCreatedPokemons"))) {
  userCreatedPokemons = JSON.parse(localStorage.getItem("userCreatedPokemons"));
  userCreatedPokemons.forEach((userCreatedPokemon, i) => {
    createPokemonElement(userCreatedPokemon);
  });
} else {
  userCreatedPokemons = [];
}
//Filtreringsknapper med fargekoder
createFilterButtons();

function createFilterButtons() {
  const filterButtonsContainer = document.createElement("div");
  const bugButton = document.createElement("img");
  bugButton.src = "/assets/bug.webp";
  filterButtonsContainer.appendChild(bugButton);
  bugButton.onclick = function () {
    filterPokemons("bug", "#91a019");
  };

  const darkButton = document.createElement("img");
  darkButton.src = "/assets/dark.webp";
  filterButtonsContainer.appendChild(darkButton);
  darkButton.onclick = function () {
    filterPokemons("dark", "#282828");
  };

  const dragonButton = document.createElement("img");
  dragonButton.src = "/assets/dragon.webp";
  filterButtonsContainer.appendChild(dragonButton);
  dragonButton.onclick = function () {
    filterPokemons("dragon", "#5061e1");
  };

  const electricButton = document.createElement("img");
  electricButton.src = "/assets/electric.webp";
  filterButtonsContainer.appendChild(electricButton);
  electricButton.onclick = function () {
    filterPokemons("electric", "#fac006");
  };

  const fairyButton = document.createElement("img");
  fairyButton.src = "/assets/fairy.webp";
  filterButtonsContainer.appendChild(fairyButton);
  fairyButton.onclick = function () {
    filterPokemons("fairy", "#f170f1");
  };

  const fightingButton = document.createElement("img");
  fightingButton.src = "/assets/fighting.webp";
  filterButtonsContainer.appendChild(fightingButton);
  fightingButton.onclick = function () {
    filterPokemons("fighting", "#ff8006");
  };

  const fireButton = document.createElement("img");
  fireButton.src = "/assets/fire.webp";
  filterButtonsContainer.appendChild(fireButton);
  fireButton.onclick = function () {
    filterPokemons("fire", "#e7282b");
  };

  const flyingButton = document.createElement("img");
  flyingButton.src = "/assets/flying.webp";
  filterButtonsContainer.appendChild(flyingButton);
  flyingButton.onclick = function () {
    filterPokemons("flying", "#81baef");
  };

  const ghostButton = document.createElement("img");
  ghostButton.src = "/assets/ghost.webp";
  filterButtonsContainer.appendChild(ghostButton);
  ghostButton.onclick = function () {
    filterPokemons("ghost", "#714170");
  };

  const grassButton = document.createElement("img");
  grassButton.src = "/assets/grass.webp";
  filterButtonsContainer.appendChild(grassButton);
  grassButton.onclick = function () {
    filterPokemons("grass", "#41a129");
  };

  const groundButton = document.createElement("img");
  groundButton.src = "/assets/ground.webp";
  filterButtonsContainer.appendChild(groundButton);
  groundButton.onclick = function () {
    filterPokemons("ground", "#915120");
  };

  const iceButton = document.createElement("img");
  iceButton.src = "/assets/ice.webp";
  filterButtonsContainer.appendChild(iceButton);
  iceButton.onclick = function () {
    filterPokemons("ice", "#3ed8ff");
  };

  const normalButton = document.createElement("img");
  normalButton.src = "/assets/normal.webp";
  filterButtonsContainer.appendChild(normalButton);
  normalButton.onclick = function () {
    filterPokemons("normal", "#9fa19f");
  };

  const poisonButton = document.createElement("img");
  poisonButton.src = "/assets/poison.webp";
  filterButtonsContainer.appendChild(poisonButton);
  poisonButton.onclick = function () {
    filterPokemons("poison", "#9040cc");
  };

  const psychicButton = document.createElement("img");
  psychicButton.src = "/assets/psychic.webp";
  filterButtonsContainer.appendChild(psychicButton);
  psychicButton.onclick = function () {
    filterPokemons("psychic", "#ef4077");
  };

  const rockButton = document.createElement("img");
  rockButton.src = "/assets/rock.webp";
  filterButtonsContainer.appendChild(rockButton);
  rockButton.onclick = function () {
    filterPokemons("rock", "#afa981");
  };

  const steelButton = document.createElement("img");
  steelButton.src = "/assets/steel.webp";
  filterButtonsContainer.appendChild(steelButton);
  steelButton.onclick = function () {
    filterPokemons("steel", "#60a1b8");
  };

  const waterButton = document.createElement("img");
  waterButton.src = "/assets/water.webp";
  filterButtonsContainer.appendChild(waterButton);
  waterButton.onclick = function () {
    filterPokemons("water", "#2980ef");
  };

  const allButton = document.createElement("button");
  allButton.textContent = "ALL POKEMONS";
  allButton.style.backgroundColor = "white";
  allButton.style.borderRadius = "100px";
  filterButtonsContainer.appendChild(allButton);
  allButton.onclick = function () {
    filterPokemons("");
  };

  document.body.appendChild(filterButtonsContainer);
}

//Lag egen pokemon knapp
const createPokemon = document.createElement("button");
createPokemon.textContent = "ADD YOUR OWN POKEMON";
createPokemon.style.backgroundColor = "white";
createPokemon.style.borderRadius = "100px";
createPokemon.style.fontSize = "18px";
document.body.appendChild(createPokemon);

//Lag egen pokemon
createPokemon.addEventListener("click", function () {
  const userPokemonName = prompt(
    "Lag din egen pokemon her! Hva vil du at pokemonen skal hete?"
  );
  const userPokemonType = prompt("Hva slags type skal pokemonen være?");
  const userCreatedPokemon = {
    name: userPokemonName,
    type: userPokemonType,
    picture: "/assets/new-pokemon.gif",
  };

  createPokemonElement(userCreatedPokemon);
  userCreatedPokemons.push(userCreatedPokemon);
  localStorage.setItem(
    "userCreatedPokemons",
    JSON.stringify(userCreatedPokemons)
  );
});

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

// Legge til pokemons i HTML
function createPokemonElement(pokemon) {
  const pokemonContainer = document.createElement("div");
  pokemonContainer.classList.add("pokemon-div");
  pokemonContainer.style.border = "1px solid black";
  pokemonContainer.style.width = "250px";
  pokemonContainer.style.display = "inline-block";
  pokemonContainer.style.margin = "10px";
  pokemonContainer.style.padding = "10px";
  pokemonContainer.style.borderRadius = "10px";

  const nameElement = document.createElement("h2");
  nameElement.textContent = pokemon.name.toUpperCase();

  const typeElement = document.createElement("p");
  typeElement.textContent = pokemon.type;

  const imageElement = document.createElement("img");
  imageElement.src = pokemon.picture;
  imageElement.style.height = "96px";
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
    deletePokemon(pokemon.name);
  });
  //Redigeringsfunksjon
  editButton.addEventListener("click", function () {
    const nameInput = document.createElement("input");
    nameInput.value = nameElement.textContent;
    nameElement.replaceWith(nameInput);

    const typeInput = document.createElement("input");
    typeInput.value = typeElement.textContent;
    typeElement.replaceWith(typeInput);
  });

  //Lagre i local storage
  saveButton.addEventListener("click", function () {
    savePokemon(pokemon);
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

function savePokemon(pokemon) {
  if (savedPokemons.length < 5) {
    let pokemonExist = false;
    for (let i = 0; i < savedPokemons.length; i++) {
      if (savedPokemons[i].name == pokemon.name) {
        alert("Du har allerede lagret denne pokemonen!");
        pokemonExist = true;
      }
    }
    if (pokemonExist == false) {
      savedPokemons.push({
        name: pokemon.name,
        type: pokemon.type,
        picture: pokemon.picture,
      });

      updateSavedPokemons();
    }
  } else {
    alert(
      "You can't save more than 5 Pokemons :-( Delete pokemons to get more space."
    );
  }
}

//Funksjon som oppdaterer lagrede pokemons
function updateSavedPokemons() {
  savedPokemonsContainer.innerHTML = "";

  savedPokemons.forEach((savedPokemon, i) => {
    const savedPokemonElement = document.createElement("div");
    savedPokemonElement.style.border = "1px solid black";
    savedPokemonElement.innerHTML = `<img src="${savedPokemon.picture}" alt="${savedPokemon.name}"/>
  <p>${savedPokemon.name}</p>
  <p>${savedPokemon.type}</p>
  <button onclick="deletePokemon('${savedPokemon.name}')">Slett</button>`;

    savedPokemonsContainer.appendChild(savedPokemonElement);
  });
  localStorage.setItem("savedPokemons", JSON.stringify(savedPokemons));
  localStorage.setItem(
    "userCreatedPokemons",
    JSON.stringify(userCreatedPokemons)
  );
}

//Henter element-klassenavn som array og filtreringsfunskjon
const pokemonElements = document.getElementsByClassName("pokemon-div");
function filterPokemons(filter, color) {
  // Går gjennom hvert element og søker etter om type er det samme som "filter"
  let anyDisplayed = false;
  for (let i = 0; i < pokemonElements.length; i++) {
    if (pokemonElements[i].querySelector("p").innerHTML.includes(filter)) {
      pokemonElements[i].style.display = "inline-block";
      pokemonElements[i].style.backgroundColor = color;
      anyDisplayed = true;
    } else {
      pokemonElements[i].style.display = "none";
    }
  }
  if (anyDisplayed == false) {
    showMessageNoPokemon.style.display = "block";
  } else {
    showMessageNoPokemon.style.display = "none";
  }
}

//Container for lagrede pokemons
const savedPokemonsText = document.createElement("p");
savedPokemonsText.textContent = "Dine lagrede pokemons:";
document.body.appendChild(savedPokemonsText);

const savedPokemonsContainer = document.createElement("div");
savedPokemonsContainer.style.border = "1px solid black";
savedPokemonsContainer.style.width = "500px";
document.body.appendChild(savedPokemonsContainer);

//Starte funksjon for å oppdatere lagrede pokemons
updateSavedPokemons();

//Slettefunksjon for pokemons i oversikten
function deletePokemon(pokemonName) {
  for (let i = 0; i < savedPokemons.length; i++) {
    if (savedPokemons[i].name == pokemonName) {
      savedPokemons.splice(i, 1);
    }
  }
  for (let i = 0; i < userCreatedPokemons.length; i++) {
    if (userCreatedPokemons[i].name == pokemonName) {
      userCreatedPokemons.splice(i, 1);
    }
  }

  updateSavedPokemons();
}

//Melding hvis det ikke finnes pokemons av en type
const showMessageNoPokemon = document.createElement("h2");
showMessageNoPokemon.textContent =
  "Couldn't Catch 'Em All. No pokemons of this type";
showMessageNoPokemon.style.display = "none";
container.appendChild(showMessageNoPokemon);
