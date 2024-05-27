const http = require("http");
const fs = require("fs");
const path = require("path");

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  if (req.url === "/") {
    res.end("Hello Holberton School!");
  } else if (req.url === "/students" && req.method === "GET") {
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
      res.statusCode = 500;
      res.end(`Error: ${err.message}`);
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
