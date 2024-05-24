const fs = require("fs");

/**
 * Counts the number of students in a CSV data file.
 * @param {string} dataPath - The path to the CSV data file.
 * @returns {void}
 */
const countStudents = (dataPath) => {
  try {
    const data = fs.readFileSync(dataPath, "utf-8").trim().split("\n");
    const students = data.slice(1).filter((student) => student);
    const fields = students.map((student) => student.split(",")[3]);
    const uniqueFields = [...new Set(fields)];
    const studentsByField = uniqueFields.map((field) => ({
      field,
      count: fields.filter((f) => f === field).length,
      students: students
        .filter((student) => student.split(",")[3] === field)
        .map((student) => student.split(",")[0]),
    }));

    console.log(`Number of students: ${students.length}`);
    studentsByField.forEach(({ field, count, students }) => {
      console.log(
        `Number of students in ${field}: ${count}. List: ${students.join(", ")}`
      );
    });
  } catch (err) {
    throw new Error("Cannot load the database");
  }
};

module.exports = countStudents;
