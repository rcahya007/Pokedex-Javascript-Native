// Initial Place and Load More
const placePokemonLeft = document.getElementById("place-pokemon");
const buttonLoadMore = document.getElementById("buttonLoadMore");

// Initial Condition
const initialPokemon = 9;
let idInitialPokemon = 1;
let conditionCardPokemon = 0;

// url For Fetch
const url = "https://pokeapi.co/api/v2/pokemon/";

// Load Card Pokemon
const initialLoadPokemon = async (banyakNya) => {
  for (let i = idInitialPokemon; i <= banyakNya; i++) {
    await fetchPokemon(i);
    idInitialPokemon = i;
    conditionCardPokemon = i;
    console.log(conditionCardPokemon);
  }
  buttonLoadMore.setAttribute(
    "onclick",
    `initialLoadPokemon(${conditionCardPokemon + 9})`
  );
  idInitialPokemon = idInitialPokemon + 1;
};

// Function Showing Pokemon
function showingPokemon(dataPokemon) {
  const picture =
    dataPokemon.sprites.versions["generation-v"]["black-white"].animated
      .front_default;
  const no_pokemon = dataPokemon.id;
  const name_pokemon = dataPokemon.name;
  const types = dataPokemon.types;
  const cardPokemon = document.createElement("button");
  cardPokemon.className = "card-pokemon";
  cardPokemon.setAttribute("id", dataPokemon.id);
  cardPokemon.setAttribute("onclick", `getinitPokeRight(${dataPokemon.id})`);
  const innerCardPokemon = `<img src=${picture} alt="#" />
  <div class="info-pokemon">
    <div class="no">N<sup>o</sup>${no_pokemon}</div>
    <div class="name">${name_pokemon}</div>
    <div class="type">
    ${types
      .map((element) => {
        return `<button class="btn-type ${element.type.name}">${element.type.name}</button>`;
      })
      .join("")}
    </div>
  </div>`;
  cardPokemon.innerHTML = innerCardPokemon;
  placePokemonLeft.appendChild(cardPokemon);
}

// Fetch data pokemon
async function fetchPokemon(id) {
  const getPokemon = await fetch(url + id);
  getPokemon.json().then((data) => {
    showingPokemon(data);
  });
}

// initial Data Info Pokemon Right Side
const getinitPokeRight = async (idInitialPokemon) => {
  const rightPlace = document.getElementById("right");
  rightPlace.scrollIntoView();
  const placePokemonRight = document.getElementById("bigPokemon");
  const id = document.getElementsByClassName("id-pokemon");
  const name_pokemon = document.getElementsByClassName("name-pokemon");
  const placeGenera = document.getElementsByClassName("sub-name");
  const flavor_text = document.getElementById("flavor_text");
  const getPlaceAbilities = document.getElementsByClassName("btn-abilities");
  const heightPokemon = document.getElementById("heightPokemon");
  const weightPokemon = document.getElementById("weightPokemon");
  const baseExp = document.getElementById("baseExp");
  //AllStats
  const statHP = document.getElementById("hp");
  const statATK = document.getElementById("atk");
  const statDEF = document.getElementById("def");
  const statSPA = document.getElementById("spa");
  const statSPD = document.getElementById("spd");
  const statSPEED = document.getElementById("speed");
  const statTotal = document.getElementById("total");
  // PokeLvlOne
  const placeLvlOne = document.getElementById("pokeLvlOne");
  const placeLvlTwo = document.getElementById("pokeLvlTwo");
  const placeLvlThree = document.getElementById("pokeLvlThree");
  // PokemonImgBefore
  const placePokemonBefore = document.getElementById("beforePokemon");
  const placePokemonAfter = document.getElementById("afterPokemon");
  // Name,Id PokemonBefore
  const nameIdPokemonBefore = document.getElementById("nameIdPokeBefore");
  // Name, Id PokemonAfter
  const nameIdPokemonAfter = document.getElementById("nameIdPokeAfter");
  // buttonPokemonBefore
  const buttonPokemonBefore = document.getElementById("img-before-left");
  // buttonPokemonBefore
  const buttonPokemonAfter = document.getElementById("img-after-right");
  //buttonEvoLevel1,2,3
  const buttonImgLvlOne = document.getElementById("buttonImgLvlOne");
  const buttonImgLvlTwo = document.getElementById("buttonImgLvlTwo");
  const buttonImgLvlThree = document.getElementById("buttonImgLvlThree");

  const fetchPokemon = await fetch(url + idInitialPokemon);
  fetchPokemon.json().then(async (data) => {
    const genera = await fetch(
      "https://pokeapi.co/api/v2/pokemon-species/" + idInitialPokemon
    );

    //Picture and ID Pokemon
    const picture = data.sprites.other.dream_world.front_default;
    placePokemonRight.src = picture;
    id[0].innerHTML = "#" + data.id;
    name_pokemon[0].innerHTML = data.name;

    // Sub Name Pokemon
    genera.json().then((dataGen) => {
      placeGenera[0].innerHTML = dataGen.genera[7].genus;
      flavor_text.innerHTML = dataGen.flavor_text_entries[1].flavor_text;
    });

    // Type Pokemon
    const typePokemon = data.types;
    const placeType = document.getElementsByClassName("type-right");
    const innerPlaceType = `
      ${typePokemon
        .map((dataType) => {
          return `<button>${dataType.type.name}</button>`;
        })
        .join("")}
    `;
    placeType[0].innerHTML = innerPlaceType;

    // Abilities
    const dataAbilities = data.abilities;
    const createButtonAbilities = `
      ${dataAbilities
        .map((dataAbiliti) => {
          return `<button>${dataAbiliti.ability.name}`;
        })
        .join("")}
    `;
    getPlaceAbilities[0].innerHTML = createButtonAbilities;

    // Height
    const height = data.height;
    let convertHeight = 0;
    if (height.toString().length <= 2) {
      convertHeight = height / 10;
    } else if (height.toString().length > 2) {
      convertHeight = height / 100;
    }
    heightPokemon.innerHTML = convertHeight + "m";

    // Weight
    const weight = data.weight;
    let convertWeight = 0;
    if (weight.toString().length <= 2) {
      convertWeight = height / 10;
    } else if (height.toString().length > 2) {
      convertWeight = height / 100;
    }
    weightPokemon.innerHTML = convertHeight + "Kg";

    // Base EXP
    baseExp.innerHTML = data.base_experience;

    //Stats
    const hp = data.stats[0].base_stat;
    const atk = data.stats[1].base_stat;
    const def = data.stats[2].base_stat;
    const spa = data.stats[3].base_stat;
    const spd = data.stats[4].base_stat;
    const speed = data.stats[5].base_stat;
    let total = hp + atk + def + spa + spd + speed;

    statHP.innerHTML = hp;
    statATK.innerHTML = atk;
    statDEF.innerHTML = def;
    statSPA.innerHTML = spa;
    statSPD.innerHTML = spd;
    statSPEED.innerHTML = speed;
    statTotal.innerHTML = total;

    //EVOLUTION
    const chainEvo = await fetch(genera.url);
    chainEvo.json().then(async (dataEvo) => {
      // Get Evo Chain
      const getEvoChain = await fetch(dataEvo.evolution_chain.url);
      getEvoChain.json().then(async (dataEvoChain) => {
        // Get Level One
        const getDataLevelOne = await fetch(dataEvoChain.chain.species.url);
        getDataLevelOne.json().then(async (data) => {
          const pictureLevelOne = await fetch(url + data.id);
          pictureLevelOne.json().then(async (dataPicture) => {
            placeLvlOne.src =
              dataPicture.sprites.other.dream_world.front_default;
            buttonImgLvlOne.setAttribute(
              "onclick",
              `getinitPokeRight(${dataPicture.id})`
            );
          });
        });

        // Get Level Two
        const getDataLevelTwo = await fetch(
          dataEvoChain.chain.evolves_to[0].species.url
        );
        getDataLevelTwo.json().then(async (data) => {
          const pictureLevelTwo = await fetch(url + data.id);
          pictureLevelTwo.json().then(async (dataPicture) => {
            placeLvlTwo.src =
              dataPicture.sprites.other.dream_world.front_default;

            buttonImgLvlTwo.setAttribute(
              "onclick",
              `getinitPokeRight(${dataPicture.id})`
            );
            // Check Level 3 ada atau tidak
            if (dataEvoChain.chain.evolves_to[0].evolves_to[0] === undefined) {
              placeLvlThree.src =
                dataPicture.sprites.other.dream_world.front_default;
              buttonImgLvlThree.setAttribute(
                "onclick",
                `getinitPokeRight(${dataPicture.id})`
              );
            } else {
              // Get Level Three
              const urlDataPokeLvl3 =
                dataEvoChain.chain.evolves_to[0].evolves_to[0].species.url;
              const getDataLevelThree = await fetch(urlDataPokeLvl3);
              getDataLevelThree.json().then(async (data) => {
                const pictureLevelThree = await fetch(url + data.id);
                pictureLevelThree.json().then(async (dataPicture) => {
                  placeLvlThree.src =
                    dataPicture.sprites.other.dream_world.front_default;
                  buttonImgLvlThree.setAttribute(
                    "onclick",
                    `getinitPokeRight(${data.id})`
                  );
                });
              });
            }
          });
        });
      });
    });

    // Get Pokemon First
    if (data.id == 1) {
      placePokemonBefore.src =
        data.sprites.versions["generation-v"][
          "black-white"
        ].animated.front_default;
      const isiHTML = `${data.name} <span>#${data.id}</span>`;
      nameIdPokemonBefore.innerHTML = isiHTML;
      buttonPokemonBefore.setAttribute(
        "onclick",
        `getinitPokeRight(${data.id})`
      );

      //Get PokemonAfter
      const idPokemonAfter = data.id + 1;
      const getPokemonAfter = await fetch(url + idPokemonAfter);
      getPokemonAfter.json().then((data) => {
        placePokemonAfter.src =
          data.sprites.versions["generation-v"][
            "black-white"
          ].animated.front_default;
        const isiHTML = `<span>#${data.id}</span> ${data.name} `;
        nameIdPokemonAfter.innerHTML = isiHTML;
        buttonPokemonAfter.setAttribute(
          "onclick",
          `getinitPokeRight(${data.id})`
        );
      });
    } else if (data.id > 1) {
      //Get PokemonBefore
      const idPokemonBefore = data.id - 1;
      const getPokemonBefore = await fetch(url + idPokemonBefore);
      getPokemonBefore.json().then((data) => {
        placePokemonBefore.src =
          data.sprites.versions["generation-v"][
            "black-white"
          ].animated.front_default;
        const isiHTML = `${data.name} <span>#${data.id}</span>`;
        nameIdPokemonBefore.innerHTML = isiHTML;
        buttonPokemonBefore.setAttribute(
          "onclick",
          `getinitPokeRight(${data.id})`
        );
      });
      //Get PokemonAfter
      const idPokemonAfter = data.id + 1;
      const getPokemonAfter = await fetch(url + idPokemonAfter);
      getPokemonAfter.json().then((data) => {
        placePokemonAfter.src =
          data.sprites.versions["generation-v"][
            "black-white"
          ].animated.front_default;
        const isiHTML = `<span>#${data.id}</span> ${data.name} `;
        nameIdPokemonAfter.innerHTML = isiHTML;
        buttonPokemonAfter.setAttribute(
          "onclick",
          `getinitPokeRight(${data.id})`
        );
      });
    }
  });
};

// Condition Button Back To Top
const buttonToTop = document.getElementById("moveTop");
function scrollFunction() {
  if (
    document.body.scrollTop > 500 ||
    document.documentElement.scrollTop > 500
  ) {
    buttonToTop.style.display = "block";
  } else {
    buttonToTop.style.display = "none";
  }
}
// Move to Top
window.onscroll = function () {
  scrollFunction();
};

// Function Go Top
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Run First Function
getinitPokeRight(idInitialPokemon);
initialLoadPokemon(initialPokemon);
