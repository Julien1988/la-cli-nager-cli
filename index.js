#!/usr/bin/env node

const { getCode, getName, getData, getNames } = require("country-list");
const axios = require("axios").default;

// Récupération de l'année courante
let date = new Date();
let getFullYears = date.getFullYear();

// Récupération du 1er argument dans le terminal (nom du pays)
let myArgs = process.argv.slice(2);
// Récupération du 2ème argument dans le terminal (année)
let myArgsYears = process.argv.slice(3)[0];
let getMyArgs = myArgs[0];
let getNamesArray = [];

// Vérification si un 1er argument a été définis (le Nom)
if (getMyArgs != undefined) {
  let getTheCodeName = getCode(getMyArgs);

  codeNameVerification(getTheCodeName, myArgs);
} else {
  console.log("error");
}

function codeNameVerification(getTheCodeName, getMyArgs) {
  getNamesArray.push(getNames());

  // Vérification dans l'ensemble des noms de pays si le nom de pays entré en 1er argument est bien valide
  const found = getNamesArray[0].find((element) => element == getMyArgs[0]);

  if (found != undefined) {
    if (
      // Vérification si l'année passée en 2ème argument est bien valide et a été définie
      myArgsYears != undefined &&
      myArgsYears <= getFullYears &&
      myArgsYears > 0
    ) {
      getTheCountryHolidates(getTheCodeName);
    } else {
      // Si l'année n'a pas été définie en 2ème argument, ou n'est pas valide, l'année en cours sera choisie par défaut
      myArgsYears = getFullYears;
      getTheCountryHolidates(getTheCodeName);
    }
  } else {
    console.log(
      "Nom de pays non valide, le nom du pays doit commencer par une majuscule !"
    );
  }
}

// Récupération de l'API via axios
function getTheCountryHolidates(getTheCodeName) {
  axios
    .get(
      "https://date.nager.at/api/v2/PublicHolidays/" +
        myArgsYears +
        "/" +
        getTheCodeName
    )
    .then(function (response) {
      // handle success

      // Affichage de l'ensemble des dates de congé ainsi que des noms de ces derniers
      for (let i = 0; i < response.data.length; i++) {
        console.log(response.data[i].date);
        console.log(response.data[i].name);
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      console.log("error");
    })
    .finally(function () {
      // always executed
    });
}
