#!/usr/bin/node
const fs = require("fs");
const request = require("request");

const url = process.argv[2];
const filePath = process.argv[3];

if (!url || !filePath) {
  console.error("Please provide a URL and a file path as arguments.");
  process.exit(1);
}

request(url, (error, response, body) => {
  if (error) {
    console.error(`Error fetching ${url}: ${error.message}`);
    return;
  }

  if (response.statusCode !== 200) {
    console.error(`Error fetching ${url}: Status code ${response.statusCode}`);
    return;
  }

  fs.writeFile(filePath, body, "utf8", (err) => {
    if (err) {
      console.error(`Error writing to ${filePath}: ${err.message}`);
      return;
    }

    console.log(`Contents of ${url} saved to ${filePath}`);
  });
});
