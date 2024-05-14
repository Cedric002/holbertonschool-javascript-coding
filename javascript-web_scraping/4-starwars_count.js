#!/usr/bin/node
const request = require("request");

if (process.argv.length !== 3) {
  console.log("Usage: node script.js <api_url>");
  process.exit(1);
}

const apiUrl = process.argv[2];
const characterId = 18;

request(apiUrl, (error, response, body) => {
  if (error) {
    console.error(`An error occurred: ${error.message}`);
    return;
  }

  if (response.statusCode === 200) {
    const films = JSON.parse(body).results;
    const moviesWithCharacter = films.filter((film) => {
      const characterUrls = film.characters;
      return characterUrls.includes(
        `https://swapi-api.hbtn.io/api/people/${characterId}/`
      );
    });

    console.log(moviesWithCharacter.length);
  } else {
    console.log(`Error: ${response.statusCode}`);
  }
});
