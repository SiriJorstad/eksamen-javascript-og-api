//Variabler
//Spillerens navn
let userName = "";

//Progress i spillet ( pick, X X X X X X)
let progress = 0;
const levels = [
  welcomePage,
  pickYourPokemon,
  readyToPlay,
  woodLevel,
  jungleLevel,
  knutLevel,
  pikachuLevel,
  theEnd,
];
levels[0]();

//Pokemons spilleren kan velge fra
let pokemonsYouCanChoose = [];

//Pokemon valgt av spiller
let chosenPokemon = {};

//Pokemon å battle mot
let pokemonToBattle = {};

//De forskjellige sidene/funksjonene som vises
function welcomePage() {
  //Bakgrunn velkomstside
  document.body.style.cssText =
    "background-image: url(./assets/first-background.png); background-size: cover;";

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
    "font-weight: bold; font-size: 25px; padding: 10px; border: 1px solid black; border-radius: 5px; text-align: center; width: 150px; margin: auto; background-color: #4cfd6e;";

  saveNameButton.addEventListener("click", function () {
    userName = userQuestionName.value;
    progress++;
    resetHTML();
    levels[progress]();
  });

  document.body.appendChild(welcomeToGameText);
  welcomeContainer.appendChild(userQuestionName);
  welcomeContainer.appendChild(saveNameButton);
  document.body.appendChild(welcomeContainer);
}

async function pickYourPokemon() {
  document.body.style.backgroundImage = document.body.style.cssText =
    "background-image: url(./assets/background-without-ash.png); background-size: cover;";

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
      progress++;
      resetHTML();
      levels[progress]();
    });
  });
}

//Pil button
const arrowPicture = document.createElement("img");
arrowPicture.src = "assets/arrow.png";
arrowPicture.style.cssText =
  "height: 200px; position: absolute; right: 200px; bottom: 20px;";
arrowPicture.addEventListener("click", nextLevel);

//Bilde av pokemon og motstander variabler
const chosenPokemonPicture = document.createElement("img");
const pokemonToBattlePicture = document.createElement("img");

// readyToPlay
function readyToPlay() {
  document.body.style.backgroundImage = document.body.style.cssText =
    "background-image: url(./assets/background-without-ash.png); background-size: cover;";

  chosenPokemonPicture.src = chosenPokemon.picture;
  chosenPokemonPicture.style.cssText =
    "position: absolute; bottom: 60px; left: 650px; height: 100px";

  //charAt for å få stor forbokstav(Stack Overflow)
  createTextBox(
    `Good choice, ${userName}! ${
      chosenPokemon.name.charAt(0).toUpperCase() + chosenPokemon.name.slice(1)
    } is a great pokemon! Start the search by entering the forest.`
  );

  document.body.appendChild(chosenPokemonPicture);
  document.body.appendChild(arrowPicture);
}

//Funksjon etter pil-klikk som tar spiller til neste nivå
function nextLevel() {
  progress++;
  pokemonToBattle = {};
  chosenPokemonPicture.src = chosenPokemon.pictureBack;

  //Beveger pokemon mot høyre (chatGpt)
  let position = parseInt(chosenPokemonPicture.style.left) || 0;
  const endPosition = window.innerWidth - 200;

  const moveInterval = setInterval(function () {
    position += 15;
    chosenPokemonPicture.style.left = position + "px";
    if (position >= endPosition) {
      clearInterval(moveInterval);
      resetHTML();
      levels[progress]();
    }
  }, 100);
}

//Fightbutton
const fightButton = document.createElement("button");
fightButton.style.cssText =
  "font-size: 25px; padding: 10px; border: 1px solid black; border-radius: 5px; text-align: center; width: 150px; margin: auto; display: block; background-color: #ffc425;";
fightButton.textContent = "Fight!";

// woodLevel
async function woodLevel() {
  document.body.style.cssText =
    "background-image: url(./assets/wood-background.png); background-size: cover;";

  chosenPokemonPicture.src = chosenPokemon.pictureBack;
  chosenPokemonPicture.style.cssText =
    "position: absolute; bottom: 20px; left: 480px; height: 100px;";
  document.body.appendChild(chosenPokemonPicture);
  await getPokemonFromAPI("pidgey", false);

  pokemonToBattlePicture.src = pokemonToBattle.picture;
  pokemonToBattlePicture.style.cssText =
    "position: absolute; bottom: 50px; left: 700px; height: 100px";
  document.body.appendChild(pokemonToBattlePicture);

  createTextBox(
    `Oh no! A wild ${pokemonToBattle.name} appeared! Let's hope ${
      chosenPokemon.name.charAt(0).toUpperCase() + chosenPokemon.name.slice(1)
    } can fight him so we can continue our search for Pikachu!`
  );

  document.body.appendChild(fightButton);

  fightButton.addEventListener("click", function () {
    createStatBoxes();
    showMoves();
    fightButton.remove();
  });
}

async function jungleLevel() {
  document.body.style.cssText =
    "background-image: url(./assets/jungle-background.jpg); background-size: cover;";

  chosenPokemonPicture.src = chosenPokemon.pictureBack;
  chosenPokemonPicture.style.cssText =
    "position: absolute; bottom: 60px; left: 550px; height: 100px";
  document.body.appendChild(chosenPokemonPicture);

  await getPokemonFromAPI("rattata", false);
  pokemonToBattlePicture.src = pokemonToBattle.picture;
  pokemonToBattlePicture.style.cssText =
    "position: absolute; bottom: 100px; left: 700px; height: 100px";
  document.body.appendChild(pokemonToBattlePicture);

  createTextBox(
    `An angry ${pokemonToBattle.name} is in the way! Let's fight him!`
  );
  document.body.appendChild(fightButton);

  fightButton.addEventListener("click", function () {
    createStatBoxes();
    showMoves();
    fightButton.remove();
  });
}

function knutLevel() {
  document.body.style.cssText =
    "background-image: url(./assets/knut-background.png); background-size: cover;";

  createTextBox("Oh look over there! Is that Pikachu? Did we find him?");
  const lookForPikachuButton = document.createElement("button");
  lookForPikachuButton.innerText = "Let's go take a look";
  lookForPikachuButton.style.cssText =
    "font-size: 20px; padding: 6px; border: 1px solid black; border-radius: 5px; text-align: center; width: 150px; margin: auto; display: block; background-color: #ffc103; font-weight: bold;";
  document.body.appendChild(lookForPikachuButton);

  pokemonToBattle = {
    name: "Knut",
    type: "bug",
    picture: "assets/knut.gif",
    pictureBack: "",
    hp: 50,
    attack: 0,
    defense: 100,
    maxHp: 50,
    moves: [
      { name: "blinked slowly", power: 0 },
      { name: "jumped up and down", power: 0 },
      { name: "scratched his head", power: 0 },
      { name: "looked confused", power: 0 },
      { name: "tilted his head", power: 0 },
      { name: "started laughing", power: 0 },
      { name: "rubbed his belly", power: 0 },
      { name: "ran in a circle", power: 0 },
    ],
  };

  lookForPikachuButton.addEventListener("click", function () {
    lookForPikachuButton.remove();
    document.body.style.cssText =
      "background-image: url(./assets/knut-no-tail-background.png); background-size: cover;";

    chosenPokemonPicture.src = chosenPokemon.pictureBack;
    chosenPokemonPicture.style.cssText =
      "position: absolute; bottom: 80px; left: 470px; height: 100px;";
    document.body.appendChild(chosenPokemonPicture);

    pokemonToBattlePicture.src = pokemonToBattle.picture;
    pokemonToBattlePicture.style.cssText =
      "position: absolute; bottom: 90px; left: 660px; height: 150px";
    document.body.appendChild(pokemonToBattlePicture);

    createTextBox(
      `Oh oh.....this is not Pikachu! This is Knut! We need to fight him!`
    );
    document.body.appendChild(fightButton);
  });
}

async function pikachuLevel() {
  document.body.style.cssText =
    "background-image: url(./assets/pikachu-background.png); background-size: cover;";

  chosenPokemonPicture.src = chosenPokemon.pictureBack;
  chosenPokemonPicture.style.cssText =
    "position: absolute; bottom: 240px; left: 560px; height: 100px;";
  document.body.appendChild(chosenPokemonPicture);
  await getPokemonFromAPI("meowth", false);

  pokemonToBattlePicture.src = pokemonToBattle.picture;
  pokemonToBattlePicture.style.cssText =
    "position: absolute; bottom: 260px; left: 740px; height: 100px";
  document.body.appendChild(pokemonToBattlePicture);

  createTextBox(
    `Look it's the real Pikachu!! But a wild ${
      pokemonToBattle.name
    } is blocking the way..! Show us what you got, ${
      chosenPokemon.name.charAt(0).toUpperCase() + chosenPokemon.name.slice(1)
    }!`
  );
  document.body.appendChild(fightButton);
  fightButton.addEventListener("click", function () {
    createStatBoxes();
    showMoves();
    fightButton.remove();
  });
}

function theEnd() {
  document.body.style.cssText =
    "background-image: url(./assets/the-end.png); background-size: cover; padding-top: 100px;";

  createTextBox(
    `You did it, ${userName}! Thank you for helping Ash find Pikachu!`
  );
  const playAgainButton = document.createElement("button");
  playAgainButton.style.cssText = playAgainButton.style.cssText =
    "font-size: 10px; padding: 10px; border: 1px solid black; border-radius: 5px; text-align: center; width: 150px; margin: auto; display: block; background-color: white;";
  playAgainButton.innerText = "Do you want to play again?";
  playAgainButton.addEventListener("click", function () {
    resetGame();
  });

  document.body.appendChild(playAgainButton);
}
//Funksjon som henter pokemon fra API basert på navn og om det er en valgbar pokemon/motstander
async function getPokemonFromAPI(pokemonName, yourPokemon) {
  try {
    pokemonRequest = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );
    const pokemonData = await pokemonRequest.json();

    const hp = pokemonData.stats.find(
      (stat) => stat.stat.name == "hp"
    ).base_stat;
    const attack = pokemonData.stats.find(
      (stat) => stat.stat.name == "attack"
    ).base_stat;
    const defense = pokemonData.stats.find(
      (stat) => stat.stat.name == "defense"
    ).base_stat;
    const pokemon = {
      name: pokemonData.name,
      type: pokemonData.types[0].type.name,
      picture: pokemonData.sprites.other.showdown.front_default,
      pictureBack: pokemonData.sprites.other.showdown.back_default,
      hp: hp,
      attack: attack,
      defense: defense,
      maxHp: hp,
      moves: [],
    };

    try {
      if (yourPokemon == true) {
        if (pokemon.name == "charmander") {
          const charmanderMovesToFetch = [
            "dragon-breath",
            "fire-punch",
            "fire-spin",
          ];
          for (const move of charmanderMovesToFetch) {
            const pokemonMoveRequest = await fetch(
              `https://pokeapi.co/api/v2/move/${move}/`
            );
            const pokemonMoveData = await pokemonMoveRequest.json();
            pokemon.moves.push(pokemonMoveData);
          }
        }

        if (pokemon.name == "bulbasaur") {
          const bulbasaurMovesToFetch = ["razor-leaf", "seed-bomb", "tackle"];
          for (const move of bulbasaurMovesToFetch) {
            const pokemonMoveRequest = await fetch(
              `https://pokeapi.co/api/v2/move/${move}/`
            );
            const pokemonMoveData = await pokemonMoveRequest.json();
            pokemon.moves.push(pokemonMoveData);
          }
        }

        if (pokemon.name == "squirtle") {
          const squirtleMovesToFetch = ["water-pulse", "rapid-spin", "bite"];
          for (const move of squirtleMovesToFetch) {
            const pokemonMoveRequest = await fetch(
              `https://pokeapi.co/api/v2/move/${move}/`
            );
            const pokemonMoveData = await pokemonMoveRequest.json();
            pokemon.moves.push(pokemonMoveData);
          }
        }

        pokemonsYouCanChoose.push(pokemon);
      } else {
        const pokemonToBattleMoves = pokemonData.moves.filter(
          (move) => move.version_group_details[0].level_learned_at == 0
        );
        pokemon.moves = pokemonToBattleMoves;
        pokemonToBattle = pokemon;
      }
    } catch (error) {
      console.log("Couldn't catch 'em all. Please try again. ", error);
    }
  } catch (error) {
    console.log("Error fetching Pokemon data. Please try again. ", error);
  }
}

//Funksjon som setter body til tom
function resetHTML() {
  document.body.innerHTML = "";
}

//Funksjon som lager tekstboks
const showText = document.createElement("h2");
function createTextBox(text) {
  if (document.getElementById("show-text")) {
    showText.innerText = text;
  } else {
    showText.id = "show-text";
    showText.style.cssText =
      "background: white; width: 400px; padding: 15px; border-radius: 5px; border: 1px solid black; margin: auto;";

    showText.innerText = text;
    document.body.appendChild(showText);
  }
}

//Lager stat-oversikt under battle
const yourPokemonStatTxt = document.createElement("p");
const healthBarYourPokemon = document.createElement("div");

const opponentPokemonStatTxt = document.createElement("p");
const healthBarOpponentPokemon = document.createElement("div");
const maxHealthBarYourPokemon = document.createElement("div");

const yourPokemonStatDiv = document.createElement("div");
yourPokemonStatDiv.style.cssText =
  "background: #ffc426; width: 100px; padding: 15px; border-radius: 5px; border: 1px solid black; position: absolute; left: 250px; bottom: 300px";
const opponentPokemonStatDiv = document.createElement("div");
opponentPokemonStatDiv.style.cssText =
  "background: #ffc426; width: 100px; padding: 15px; border-radius: 5px; border: 1px solid black; position: absolute; right: 250px; bottom: 300px;";
const maxHealthBarOpponentPokemon = document.createElement("div");

yourPokemonStatDiv.appendChild(yourPokemonStatTxt);
yourPokemonStatDiv.appendChild(maxHealthBarYourPokemon);
maxHealthBarYourPokemon.appendChild(healthBarYourPokemon);
opponentPokemonStatDiv.appendChild(opponentPokemonStatTxt);
opponentPokemonStatDiv.appendChild(maxHealthBarOpponentPokemon);
maxHealthBarOpponentPokemon.appendChild(healthBarOpponentPokemon);

function createStatBoxes() {
  //Din pokemon
  yourPokemonStatTxt.innerText = `${chosenPokemon.name.toUpperCase()} HP: ${
    chosenPokemon.hp
  } / ${chosenPokemon.maxHp}`;

  maxHealthBarYourPokemon.style.cssText =
    "width: 100px; border: 1px solid black; border-radius: 5px; height: 20px;";
  healthBarYourPokemon.style.cssText = `width: ${
    (100 * chosenPokemon.hp) / chosenPokemon.maxHp
  }px; background:  green; height: 20px`;
  //Din motstander
  opponentPokemonStatTxt.innerText = `${pokemonToBattle.name.toUpperCase()} HP: ${
    pokemonToBattle.hp
  } / ${pokemonToBattle.maxHp}`;

  maxHealthBarOpponentPokemon.style.cssText =
    "width: 100px; border: 1px solid black; border-radius: 5px; height: 20px;";
  healthBarOpponentPokemon.style.cssText = `width: ${
    (100 * pokemonToBattle.hp) / pokemonToBattle.maxHp
  }px; background:  green; height: 20px`;

  document.body.appendChild(yourPokemonStatDiv);
  document.body.appendChild(opponentPokemonStatDiv);
}

//Funksjon som oppdaterer HP i statsoversikten
function updateStats() {
  yourPokemonStatTxt.innerText = `${chosenPokemon.name.toUpperCase()} HP: ${
    chosenPokemon.hp
  } / ${chosenPokemon.maxHp}`;
  healthBarYourPokemon.style.cssText = `width: ${
    (100 * chosenPokemon.hp) / chosenPokemon.maxHp
  }px; background:  green; height: 20px`;

  opponentPokemonStatTxt.innerText = `${pokemonToBattle.name.toUpperCase()} HP: ${
    pokemonToBattle.hp
  } / ${pokemonToBattle.maxHp}`;

  healthBarOpponentPokemon.style.cssText = `width: ${
    (100 * pokemonToBattle.hp) / pokemonToBattle.maxHp
  }px; background:  green; height: 20px`;
}

//Funksjon som viser mulige moves i battle
const moveContainer = document.createElement("div");
function showMoves() {
  moveContainer.innerHTML = "";
  moveContainer.style.cssText =
    "display: flex; gap: 10px; justify-content: center; ";
  document.body.appendChild(moveContainer);
  chosenPokemon.moves.forEach((move) => {
    const moveButton = document.createElement("button");
    moveButton.innerText = move.name.toUpperCase();
    moveButton.className = "move-button";
    moveButton.style.cssText =
      "font-size: 16px; padding: 4px; border: 1px solid black; border-radius: 5px; text-align: center; width: 150px; margin: 0; display: block; background-color: #ffc426; margin-top: 100px;";

    moveContainer.appendChild(moveButton);

    moveButton.addEventListener("click", function () {
      moveContainer.style.display = "none";

      const damage = calculateAttackDamage(
        chosenPokemon.attack,
        move.power,
        pokemonToBattle.defense
      );
      pokemonToBattle.hp = Math.max(pokemonToBattle.hp - damage, 0);
      updateStats();
      createTextBox(
        `${chosenPokemon.name} did ${move.name} on ${pokemonToBattle.name}!`
      );

      setTimeout(function () {
        //Hvis motstander har 0 i HP
        if (pokemonToBattle.hp <= 0) {
          document.body.appendChild(arrowPicture);
          yourPokemonStatDiv.remove();
          opponentPokemonStatDiv.remove();
          pokemonToBattlePicture.remove();
          if (progress == 6) {
            createTextBox(`Hurray! ${chosenPokemon.name} did it!`);
          } else {
            createTextBox(
              `Yey! ${chosenPokemon.name} won the battle against ${pokemonToBattle.name}! Let's continue the search for Pikachu.`
            );
          }

          arrowPicture.addEventListener("click", nextLevel);
        } else {
          attackFromOpponent();
          setTimeout(function () {
            if (chosenPokemon.hp > 0) {
              moveContainer.style.display = "flex";
            }
          }, 2000);
        }
      }, 4000);
    });
  });
}

//Funksjon som regner ut attack score. Den som angriper sin attack, movets styrke, og den som angriper sin defense.
// (attack*(power/defense)) / 2
//Søkte etter forskjellige løsninger for utregning på nett, endte opp med et regneforslag fra chatGpt
function calculateAttackDamage(attackersPower, movePower, opponentDefense) {
  const damage = Math.floor(
    (attackersPower * (movePower / opponentDefense)) / 2
  );
  return damage;
}

//Funksjon som henter tilfeldig move og gjør attack fra motstander
async function attackFromOpponent() {
  const randomAttackMoveIndex = Math.floor(
    Math.random() * pokemonToBattle.moves.length
  );
  try {
    let pokemonMoveData = {};
    if (pokemonToBattle.name == "Knut") {
      pokemonMoveData = pokemonToBattle.moves[randomAttackMoveIndex];
    } else {
      pokemonToBattleMoveRequest = await fetch(
        `https://pokeapi.co/api/v2/move/${pokemonToBattle.moves[randomAttackMoveIndex].move.name}`
      );
      pokemonMoveData = await pokemonToBattleMoveRequest.json();
    }

    const pokemonToBattleMovePower = pokemonMoveData.power;

    const damage = calculateAttackDamage(
      pokemonToBattle.attack,
      pokemonToBattleMovePower,
      chosenPokemon.defense
    );
    chosenPokemon.hp = Math.max(chosenPokemon.hp - damage, 0);
    updateStats();
    if (pokemonToBattle.name == "Knut") {
      createTextBox(`${pokemonToBattle.name} ${pokemonMoveData.name}`);
    } else {
      createTextBox(
        `Oh no! ${pokemonToBattle.name} did ${pokemonMoveData.name} on ${chosenPokemon.name}!`
      );
    }
    if (chosenPokemon.hp <= 0) {
      setTimeout(function () {
        alert(
          `Sorry, ${userName}! ${chosenPokemon.name} lost the battle. Try again to find Pikachu!`
        );
        resetGame();
      }, 2000);
    }
  } catch (error) {
    console.log("Couldn't catch 'em all. Please try again. ", error);
  }
}

//Funksjon som resetter spillet
function resetGame() {
  resetHTML();
  userName = "";
  pokemonsYouCanChoose = [];
  chosenPokemon = {};
  progress = 0;
  welcomePage();
}
