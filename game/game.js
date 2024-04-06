//Variabler

//Spillerens navn
let userName = "";

//Progress i spillet ( pick, X X X X X X)
let progress = "";

//Pokemons spilleren kan velge fra
const pokemonsYouCanChoose = [];

//Pokemon valgt av spiller
let chosenPokemon = {};

if (progress == "") {
  welcomePage();
} else if (progress == "pick") {
  pickYourPokemon();
}

//De forskjellige sidene/funksjonene som vises
function welcomePage() {
  //Bakgrunn velkomstside
  document.body.style.backgroundImage = "url(./assets/first-background.png)";
  document.body.style.backgroundSize = "cover";

  //Velkomsttekst
  const welcomeToGameText = document.createElement("h2");
  welcomeToGameText.innerText = "Help Ash to find Pikachu!";
  welcomeToGameText.style.cssText = "font-size: 50px; text-align: center;";

  const welcomeContainer = document.createElement("div");
  welcomeContainer.style.cssText =
    "display: flex; flex-direction: column; gap: 10px; width: 340px; margin: auto;";

  const userQuestionName = document.createElement("input");
  userQuestionName.setAttribute("type", "text");
  userQuestionName.setAttribute("placeholder", "Choose your username");
  userQuestionName.style.cssText =
    "display: flex; font-size: 25px; padding: 10px; border: 1px solid black; border-radius: 5px; text-align: center;";

  const saveNameButton = document.createElement("button");
  saveNameButton.textContent = "Play";
  saveNameButton.style.cssText =
    "font-size: 25px; padding: 10px; border: 1px solid black; border-radius: 5px; text-align: center; width: 150px; margin: auto; background-color: #4cfd6e;";

  saveNameButton.addEventListener("click", function () {
    userName = userQuestionName.value;
    resetHTML();
    pickYourPokemon();
  });

  document.body.appendChild(welcomeToGameText);
  welcomeContainer.appendChild(userQuestionName);
  welcomeContainer.appendChild(saveNameButton);
  document.body.appendChild(welcomeContainer);
}

async function pickYourPokemon() {
  document.body.style.backgroundImage =
    "url(./assets/background-without-ash.png)";
  document.body.style.backgroundSize = "cover";

  const pickYourPokemonContainer = document.createElement("div");
  pickYourPokemonContainer.style.cssText =
    "background-color: white; padding: 30px; border-radius: 5px; border: 1px solid black; text-align: center; width: 650px; margin: auto; display: flex; flex-direction: column; gap: 10px; margin-top: 40px; ";
  document.body.appendChild(pickYourPokemonContainer);
  const pickYourPokemonTxt = document.createElement("h2");
  pickYourPokemonTxt.innerText = "Choose your pokemon to help you on the way!";
  pickYourPokemonContainer.appendChild(pickYourPokemonTxt);

  await getPokemonsFromAPI("bulbasaur");
  await getPokemonsFromAPI("charmander");
  await getPokemonsFromAPI("squirtle");

  pokemonsYouCanChoose.forEach((pokemon) => {
    const pickPokemonDiv = document.createElement("div");
    pickPokemonDiv.style.cssText =
      "border-radius: 5px; border: 1px solid black; background-color: #87d2f1;";

    const pickPokemonName = document.createElement("p");
    pickPokemonName.textContent = pokemon.name.toUpperCase();
    const pickPokemonPicuture = document.createElement("img");
    pickPokemonPicuture.src = pokemon.picture;

    pickYourPokemonContainer.appendChild(pickPokemonDiv);
    pickPokemonDiv.appendChild(pickPokemonName);
    pickPokemonDiv.appendChild(pickPokemonPicuture);

    pickPokemonDiv.addEventListener("click", function () {
      chosenPokemon = pokemon;
      resetHTML();
      readyToPlay();
    });
  });
}

function readyToPlay() {
  document.body.style.backgroundImage =
    "url(./assets/background-without-ash.png)";
  document.body.style.backgroundSize = "cover";
  const chosenPokemonPicture = document.createElement("img");
  chosenPokemonPicture.src = chosenPokemon.picture;
  chosenPokemonPicture.style.cssText = "position: absolute; top: 700px; left: 600px;";


  document.body.appendChild(chosenPokemonPicture)
}

//Funksjon som henter pokemon fra API basert på navn
async function getPokemonsFromAPI(pokemonName) {
  try {
    pokemonRequest = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const pokemonData = await pokemonRequest.json();
    const pokemonYouCanChoose = {
      name: pokemonData.name,
      type: pokemonData.types[0].type.name,
      picture: pokemonData.sprites.front_default,
    };

    pokemonsYouCanChoose.push(pokemonYouCanChoose);
  } catch (error) {
    console.log("Couldn't catch 'em all. Please try again. ", error);
  }
}

//Funksjon som setter body til tom
function resetHTML() {
  document.body.innerHTML = "";
}
