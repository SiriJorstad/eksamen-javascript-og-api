//Variabler

//Spillerens navn
let userName = "";

//Progress i spillet ( pick, X X X X X X)
let progress = "";

//Pokemons spilleren kan velge fra
const pokemonsYouCanChoose = [];

//Pokemon valgt av spiller
let chosenPokemon = {};

//Pokemon å battle mot
let pokemonToBattle = {};

if (progress == "") {
  welcomePage();
} else if (progress == "pick") {
  pickYourPokemon();
} else if (progress == "readyToPlay") {
  readyToPlay();
} else if (progress == "woodLevel") {
  woodLevel();
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

  await getPokemonFromAPI("bulbasaur", true);
  await getPokemonFromAPI("charmander", true);
  await getPokemonFromAPI("squirtle", true);

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
  chosenPokemonPicture.style.cssText =
    "position: absolute; bottom: 0px; left: 600px; height: 200px";

  const arrowPicture = document.createElement("img");
  arrowPicture.src = "assets/arrow.png";
  arrowPicture.style.cssText =
    "height: 200px; position: absolute; right: 200px; bottom: 20px;";

  //charAt for å få stor forbokstav(Stack Overflow)
  createTextBox(
    `Good choice, ${userName}! ${
      chosenPokemon.name.charAt(0).toUpperCase() + chosenPokemon.name.slice(1)
    } is a great pokemon! Start the search by entering the forest.`
  );

  //Ved klikk på pil. Funksjon som beveger pokemon (chatGpt)
  arrowPicture.addEventListener("click", function () {
    chosenPokemonPicture.src = chosenPokemon.pictureBack;

    let position = parseInt(chosenPokemonPicture.style.left) || 0;
    const endPosition = window.innerWidth - 200;

    const moveInterval = setInterval(function () {
      position += 15;
      chosenPokemonPicture.style.left = position + "px"; //

      if (position >= endPosition) {
        clearInterval(moveInterval);
        chosenPokemonPicture.remove();
        resetHTML();
        woodLevel();
      }
    }, 100);
  });

  document.body.appendChild(chosenPokemonPicture);
  document.body.appendChild(arrowPicture);
}

async function woodLevel() {
  document.body.style.backgroundImage = "url(./assets/wood-background.png)";
  document.body.style.backgroundSize = "cover";

  const chosenPokemonPicture = document.createElement("img");
  chosenPokemonPicture.src = chosenPokemon.pictureBack;
  chosenPokemonPicture.style.cssText =
    "position: absolute; bottom: -20px; left: 450px; height: 200px";
  document.body.appendChild(chosenPokemonPicture);
  await getPokemonFromAPI("pidgey", false);

  const pokemonToBattlePicture = document.createElement("img");
  pokemonToBattlePicture.src = pokemonToBattle.picture;
  pokemonToBattlePicture.style.cssText =
    "position: absolute; bottom: 0; left: 700px; height: 200px";
  document.body.appendChild(pokemonToBattlePicture);

  createTextBox(
    `Oh no! A wild ${pokemonToBattle.name} appeared! Let's hope ${
      chosenPokemon.name.charAt(0).toUpperCase() + chosenPokemon.name.slice(1)
    } can fight him so we can continue our search for Pikachu!`
  );

  const fightButton = document.createElement("button");
  fightButton.style.cssText =
    "font-size: 25px; padding: 10px; border: 1px solid black; border-radius: 5px; text-align: center; width: 150px; margin: auto; display: block; background-color: #ffc425;";

  fightButton.textContent = "Fight!";
  document.body.appendChild(fightButton);

  fightButton.addEventListener("click", function () {
    createStatBoxes();
  });
}

//Funksjon som henter pokemon fra API basert på navn
async function getPokemonFromAPI(pokemonName, yourPokemon) {
  try {
    pokemonRequest = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const pokemonData = await pokemonRequest.json();

    const hp = pokemonData.stats.find(
      (stat) => stat.stat.name == "hp"
    ).base_stat;
    const pokemon = {
      name: pokemonData.name,
      type: pokemonData.types[0].type.name,
      picture: pokemonData.sprites.front_default,
      pictureBack: pokemonData.sprites.back_default,
      hp: hp,
      maxHp: hp,
      moves: [],
    };

    if (yourPokemon == true) {
      pokemonMoveRequest = await fetch(
        `https://pokeapi.co/api/v2/move/tackle/`
      );
      const pokemonMoveData = await pokemonMoveRequest.json();
      pokemon.moves.push(pokemonMoveData);
      pokemonsYouCanChoose.push(pokemon);
    } else {
      pokemonToBattle = pokemon;
    }
    console.log(pokemon);
  } catch (error) {
    console.log("Couldn't catch 'em all. Please try again. ", error);
  }
}

//Funksjon som setter body til tom
function resetHTML() {
  document.body.innerHTML = "";
}

//Funksjon som lager tekstboks
function createTextBox(text) {
  const showText = document.createElement("h2");
  showText.style.cssText =
    "background: white; width: 400px; padding: 15px; border-radius: 5px; border: 1px solid black; margin: auto;";

  showText.innerText = text;
  document.body.appendChild(showText);
}

//Funksjon som lager stat-oversikt under battle
function createStatBoxes() {
  //Din pokemon
  const yourPokemoStatDiv = document.createElement("div");
  yourPokemoStatDiv.style.cssText =
    "background: #ffc426; width: 100px; padding: 15px; border-radius: 5px; border: 1px solid black; position: absolute; left: 250px; bottom: 300px";
  const yourPokemonStatTxt = document.createElement("p");
  yourPokemonStatTxt.innerText = `${chosenPokemon.name.toUpperCase()} HP: ${
    chosenPokemon.hp
  } / ${chosenPokemon.maxHp}`;

  const maxHealthBarYourPokemon = document.createElement("div");
  maxHealthBarYourPokemon.style.cssText =
    "width: 100px; border: 1px solid black; border-radius: 5px; height: 20px;";
  const healthBarYourPokemon = document.createElement("div");
  healthBarYourPokemon.style.cssText = `width: ${
    (100 * chosenPokemon.hp) / chosenPokemon.maxHp
  }px; background:  green; height: 20px`;
  //Din motstander
  const opponentPokemonStatDiv = document.createElement("div");
  opponentPokemonStatDiv.style.cssText =
    "background: #ffc426; width: 100px; padding: 15px; border-radius: 5px; border: 1px solid black; position: absolute; right: 250px; bottom: 300px;";
  const opponentPokemonStatTxt = document.createElement("p");
  opponentPokemonStatTxt.innerText = `${pokemonToBattle.name.toUpperCase()} HP: ${
    pokemonToBattle.hp
  } / ${pokemonToBattle.maxHp}`;

  const maxHealthBarOpponentPokemon = document.createElement("div");
  maxHealthBarOpponentPokemon.style.cssText =
    "width: 100px; border: 1px solid black; border-radius: 5px; height: 20px;";
  const healthBarOpponentPokemon = document.createElement("div");
  healthBarOpponentPokemon.style.cssText = `width: ${
    (100 * pokemonToBattle.hp) / pokemonToBattle.maxHp
  }px; background:  green; height: 20px`;

  document.body.appendChild(yourPokemoStatDiv);
  document.body.appendChild(opponentPokemonStatDiv);
  yourPokemoStatDiv.appendChild(yourPokemonStatTxt);
  yourPokemoStatDiv.appendChild(maxHealthBarYourPokemon);
  maxHealthBarYourPokemon.appendChild(healthBarYourPokemon);
  opponentPokemonStatDiv.appendChild(opponentPokemonStatTxt);
  opponentPokemonStatDiv.appendChild(maxHealthBarOpponentPokemon);
  maxHealthBarOpponentPokemon.appendChild(healthBarOpponentPokemon);
}

