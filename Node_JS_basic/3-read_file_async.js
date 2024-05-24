const fs = require("fs");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);

/**
 * Counts the number of students in a CSV data file asynchronously.
 * @param {string} dataPath - The path to the CSV data file.
 * @returns {Promise<void>}
 */
const countStudents = async (dataPath) => {
  try {
    const data = await readFileAsync(dataPath, "utf-8");
    const lines = data.trim().split("\n");
    console.log(`Number of students: ${lines.length - 1}`);

    const fieldNames = lines[0].split(",").slice(0, -1); // Remove the empty field at the end
    const studentsByField = lines.slice(1).reduce((acc, line) => {
      if (line) {
        const [firstName, field] = line.split(",");
        if (!acc[field]) {
          acc[field] = [];
        }
        acc[field].push(firstName);
      }
      return acc;
    }, {});

    for (const fieldName of fieldNames) {
      if (studentsByField[fieldName]) {
        console.log(
          `Number of students in ${fieldName}: ${
            studentsByField[fieldName].length
          }. List: ${studentsByField[fieldName].join(", ")}`
        );
      } else {
        console.log(`Number of students in ${fieldName}: 0. List: `);
      }
    }
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("Cannot load the database");
    } else {
      throw err;
    }
  }
};

module.exports = countStudents;
