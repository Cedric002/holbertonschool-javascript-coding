#!/usr/bin/node
const request = require("request");

function processResponse(error, response, body) {
  if (error || !response || response.statusCode !== 200) {
    console.error("Error fetching data:", error);
    return;
  }

  const todos = JSON.parse(body).map((todo) => ({
    userId: todo.userId,
    completed: todo.completed,
  }));

  const userTasks = {};
  todos.forEach((task) => {
    if (!task.completed) return;

    if (!userTasks[task.userId]) {
      userTasks[task.userId] = { count: 0 };
    }
    userTasks[task.userId].count++;
  });

  Object.entries(userTasks).forEach(([userId, userTask]) => {
    console.log(`User ${userId} has completed ${userTask.count} tasks.`);
  });
}

request("https://jsonplaceholder.typicode.com/todos", processResponse);
