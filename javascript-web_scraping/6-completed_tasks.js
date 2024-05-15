#!/usr/bin/node
const https = require("https");
const apiUrl = process.argv[2] || "https://jsonplaceholder.typicode.com/todos";

https
  .get(apiUrl, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      const todos = JSON.parse(data);
      const userTaskCounts = {};

      todos.forEach((todo) => {
        if (todo.completed) {
          const userId = todo.userId.toString();
          userTaskCounts[userId] = (userTaskCounts[userId] || 0) + 1;
        }
      });

      console.log(JSON.stringify(userTaskCounts));
    });
  })
  .on("error", (err) => {
    console.error(`Error: ${err.message}`);
  });
