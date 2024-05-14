#!/usr/bin/node
const request = require("request");

if (process.argv.length !== 3) {
  console.log("Usage: node script.js <episode_number>");
  process.exit(1);
}

const episodeNumber = parseInt(process.argv[2]);

if (isNaN(episodeNumber)) {
  console.log("Episode number must be a valid integer");
  process.exit(1);
}

const apiUrl = `https://swapi-api.hbtn.io/api/films/${episodeNumber}`;

request(apiUrl, (error, response, body) => {
  if (error) {
    console.error(`An error occurred: ${error.message}`);
    return;
  }

  if (response.statusCode === 200) {
    const movie = JSON.parse(body);
    console.log(movie.title);
  } else {
    console.log(`Error: ${response.statusCode}`);
  }
});
