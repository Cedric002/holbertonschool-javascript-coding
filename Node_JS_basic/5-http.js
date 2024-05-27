const http = require("http");
const fs = require("fs");

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  if (req.url === "/") {
    res.end("Hello Holberton School!");
  } else if (req.url === "/students" && req.method === "GET") {
    const database = process.argv[2];
    fs.readFile(`${database || ""}`.trim(), "utf8", (err, data) => {
      if (err) {
        res.end("This is the list of our students\n");
      } else {
        const students = data
          .trim()
          .split("\n")
          .filter((line) => line.trim().length > 0);
        res.end(`This is the list of our students\n${students.join("\n")}`);
      }
    });
  } else {
    res.statusCode = 404;
    res.end("Not found");
  }
});

app.listen(1245, () => {
  console.log("Server running at http://localhost:1245/");
});

module.exports = app;
