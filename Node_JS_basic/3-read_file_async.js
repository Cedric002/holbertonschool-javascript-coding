const fs = require("fs").promises;

const countStudents = async (path) => {
  try {
    const data = await fs.readFile(path, "utf8");
    const lines = data.split("\n");
    const students = lines
      .slice(1)
      .filter((line) => line)
      .map((line) => line.split(","));
    const fields = {};
    for (const student of students) {
      const field = student[3];
      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(student[0]);
    }
    console.log(`Number of students: ${students.length}`);
    for (const field in fields) {
      console.log(
        `Number of students in ${field}: ${
          fields[field].length
        }. List: ${fields[field].join(", ")}`
      );
    }
  } catch (error) {
    throw new Error("Cannot load the database");
  }
};

module.exports = countStudents;
