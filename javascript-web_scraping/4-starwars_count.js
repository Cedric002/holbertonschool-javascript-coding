#!/usr/bin/node
const request = require("request");

let url = process.argv[2];

request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    let films = JSON.parse(body).results;
    let count = 0;
    films.forEach((film) => {
      film.characters.forEach((character) => {
        if (character.includes("/18/")) {
          count++;
        }
      });
    });
    console.log(count);
  }
});
