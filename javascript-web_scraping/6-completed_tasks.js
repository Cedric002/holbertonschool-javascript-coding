#!/usr/bin/node
const https = require("https");
const apiUrl = "https://jsonplaceholder.typicode.com/todos";

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
          const userId = todo.userId;
          userTaskCounts[userId] = (userTaskCounts[userId] || 0) + 1;
        }
      });

      const usersWithCompletedTasks = Object.entries(userTaskCounts)
        .filter(([, count]) => count > 0)
        .map(([userId, count]) => `User ${userId} completed ${count} tasks.`)
        .join("\n");

      console.log(usersWithCompletedTasks);
    });
  })
  .on("error", (err) => {
    console.error(`Error: ${err.message}`);
  });
