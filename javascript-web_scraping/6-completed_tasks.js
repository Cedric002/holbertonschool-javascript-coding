#!/usr/bin/node
const request = require("request");

function processResponse(error, response, body) {
  if (error || !response || response.statusCode !== 200) {
    console.error("Error fetching data:", error);
    return;
  }

  const todos = JSON.parse(body);

  const userTasks = {};
  todos.forEach((todo) => {
    if (!todo.completed) return;

    if (!userTasks[todo.userId]) {
      userTasks[todo.userId] = 0;
    }
    userTasks[todo.userId]++;
  });

  console.log(userTasks);
}

request("https://jsonplaceholder.typicode.com/todos", processResponse);
