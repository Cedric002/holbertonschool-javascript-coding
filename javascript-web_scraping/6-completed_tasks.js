#!/usr/bin/node
const https = require("https");

https
  .get("https://jsonplaceholder.typicode.com/todos", (response) => {
    let data = "";

    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      try {
        const todos = JSON.parse(data);

        const completedTasks = {};

        todos.forEach((task) => {
          if (task.completed) {
            completedTasks[task.userId] =
              (completedTasks[task.userId] || 0) + 1;
          }
        });

        Object.entries(completedTasks).forEach(([userId, count]) => {
          console.log(`User ${userId}: ${count} completed tasks`);
        });
      } catch (error) {
        console.error("Error parsing API data:", error.message);
      }
    });
  })
  .on("error", (error) => {
    console.error("Error fetching data from the API:", error.message);
  });
