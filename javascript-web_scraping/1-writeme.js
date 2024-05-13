#!/usr/bin/node
const fs = require("fs");

fs.writeFile(process.argv[2], process.argv[3], "utf-8", (err) => {
  if (err) {
    console.error("Error writing file:", err);
  } else {
    console.log("File written successfully!");
  }
});
