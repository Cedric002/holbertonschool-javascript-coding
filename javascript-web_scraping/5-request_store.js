#!/usr/bin/node
const fs = require("fs");
const request = require("request");

// Check if the required arguments are provided
if (process.argv.length < 3) {
  console.error("Usage: node fetchAndSave.js <URL> <file_path>");
  process.exit(1);
}

const url = process.argv[2];
const filePath = process.argv[3];

// Use request to get the webpage content
request(url, (error, response, body) => {
  if (error || response.statusCode !== 200) {
    console.error(`Error fetching ${url}: ${error.message}`);
    return;
  }

  // Write the body to a file with UTF-8 encoding
  fs.writeFile(filePath, body, "utf8", (err) => {
    if (err) {
      console.error(`Error writing to file ${filePath}: ${err.message}`);
    } else {
      console.log(`Content saved to ${filePath}`);
    }
  });
});
