const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Holberton School!");
});

app.get("/students", (req, res) => {
  const filePath = path.join(__dirname, process.argv[2] || "database.csv");
  const fileStream = fs.createReadStream(filePath);

  res.write("This is the list of our students\n");
  fileStream.on("data", (chunk) => {
    const lines = chunk.toString().trim().split("\n");
    lines.forEach((line) => {
      if (line.trim() !== "") {
        res.write(`${line}\n`);
      }
    });
  });
  fileStream.on("end", () => {
    res.end();
  });
  fileStream.on("error", (err) => {
    res.status(500).send(`Error: ${err.message}`);
  });
});

app.listen(1245, () => {
  console.log("Server running at http://localhost:1245/");
});

module.exports = app;
