#!/usr/bin/node
const request = require("request");
const fs = require("fs");

// Vérifiez que l'utilisateur a bien fourni les deux arguments nécessaires
if (process.argv.length < 4) {
  console.log("URL ?");
  process.exit(1);
}

let url = process.argv[2];
let filePath = process.argv[3];

request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFile(filePath, body, "utf8", function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("Success");
    });
  } else {
    console.log("Error: " + error);
  }
});
