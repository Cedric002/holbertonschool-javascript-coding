#!/usr/bin/node
const fs = require("fs");
const request = require("request");

if (process.argv.length !== 4) {
  console.log("Usage: node script.js <url> <file_path>");
  process.exit(1);
}

const url = process.argv[2];
const filePath = process.argv[3];

request(url, (error, response, body) => {
  if (error) {
    console.error(`An error occurred: ${error.message}`);
    return;
  }

  if (response.statusCode === 200) {
    fs.writeFile(filePath, body, "utf8", (err) => {
      if (err) {
        console.error(
          `An error occurred while writing the file: ${err.message}`
        );
        return;
      }
      console.log(`File saved: ${filePath}`);
    });
  } else {
    console.log(`Error: ${response.statusCode}`);
  }
});
