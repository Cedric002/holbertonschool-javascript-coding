#!/usr/bin/node
const request = require("request");

// Faites une requête à l'API
request(
  "https://jsonplaceholder.typicode.com/todos",
  (error, response, body) => {
    if (error) {
      console.error("Erreur lors de la requête :", error.message);
      return;
    }

    try {
      const todos = JSON.parse(body);

      // Créez un objet pour stocker le nombre de tâches terminées par utilisateur
      const completedTasks = {};

      todos.forEach((task) => {
        if (task.completed) {
          // Incrémente le compteur pour l'identifiant d'utilisateur
          completedTasks[task.userId] = (completedTasks[task.userId] || 0) + 1;
        }
      });

      // Affichez les résultats sous forme d'objet
      console.log(completedTasks);
    } catch (parseError) {
      console.error(
        "Erreur lors de l'analyse des données de l'API :",
        parseError.message
      );
    }
  }
);
