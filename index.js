#!/usr/bin/env node

const { getCode, getName, getData, getNames } = require("country-list");
const axios = require("axios").default;

let date = new Date();
let getFullYears = date.getFullYear();

let myArgs = process.argv.slice(2);
let myArgsYears = process.argv.slice(3)[0];
let getMyArgs = myArgs[0];
let getNamesArray = [];

if (getMyArgs != undefined) {
  let getTheCodeName = getCode(getMyArgs);

  codeNameVerification(getTheCodeName, myArgs);
} else {
  console.log("error");
}

function codeNameVerification(getTheCodeName, getMyArgs) {
  getNamesArray.push(getNames());

  const found = getNamesArray[0].find((element) => element == getMyArgs[0]);

  if (found != undefined) {
    if (
      myArgsYears != undefined &&
      myArgsYears <= getFullYears &&
      myArgsYears > 0
    ) {
      getTheCountryHolidates(getTheCodeName);
    } else {
      myArgsYears = getFullYears;
      getTheCountryHolidates(getTheCodeName);
    }
  } else {
    console.log(
      "Nom de pays non valide, le nom du pays doit commencer par une majuscule !"
    );
  }
}
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
      console.log(myArgsYears);
    });
}
