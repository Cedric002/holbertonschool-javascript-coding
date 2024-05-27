import http from 'http';
import fs from 'fs';
import util from 'util';

const readFile = util.promisify(fs.readFile);

async function readDatabase(filePath) {
  try {
    const data = await readFile(filePath, 'utf8');
    const lines = data.split('\n');
    const students = lines.map(line => line.split(','));
    return students;
  } catch (error) {
    throw error;
  }
}

const app = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  if (req.url === '/') {
    res.write('Hello Holberton School!');
  } else if (req.url === '/students') {
    try {
      const students = await readDatabase('/path/to/database.csv');
      res.write('This is the list of our students\n');
      students.forEach(student => {
        res.write(`Name: ${student[0]}, Field: ${student[3]}\n`);
      });
    } catch (error) {
      res.write('Cannot load the database');
    }
  }
  res.end();
});

app.listen(1245);

export default app;
