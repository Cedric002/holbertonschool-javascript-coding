#!/usr/bin/node
const https = require("https");

// Fetch data from the API
https
  .get("https://jsonplaceholder.typicode.com/todos", (response) => {
    let data = "";

    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      try {
        const todos = JSON.parse(data);

        // Create an object to store completed task counts per user ID
        const completedTasks = {};

        todos.forEach((task) => {
          if (task.completed) {
            // Increment the count for the user ID
            completedTasks[task.userId] =
              (completedTasks[task.userId] || 0) + 1;
          }
        });

        // Print the results as an object
        console.log(completedTasks);
      } catch (error) {
        console.error("Error parsing API data:", error.message);
      }
    });
  })
  .on("error", (error) => {
    console.error("Error fetching data from the API:", error.message);
  });
