const fs = require("fs");

/**
 * Counts the number of students in a CSV file and logs the results to the console.
 * @param {string} path - The path to the CSV file.
 */
const countStudents = (path) => {
  try {
    const data = fs.readFileSync(path, "utf8");
    const lines = data.trim().split("\n");
    const students = lines.filter((line) => line.trim() !== "");
    const numberOfStudents = students.length;

    console.log(`Number of students: ${numberOfStudents}`);

    const fields = {};
    students.forEach((student) => {
      const [firstName, field] = student.split(",");
      if (fields[field]) {
        fields[field].push(firstName);
      } else {
        fields[field] = [firstName];
      }
    });

    Object.keys(fields).forEach((field) => {
      const firstNames = fields[field];
      console.log(
        `Number of students in ${field}: ${
          firstNames.length
        }. List: ${firstNames.join(", ")}`
      );
    });
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log("Cannot load the database");
    } else {
      console.log(err);
    }
  }
};

module.exports = countStudents;
