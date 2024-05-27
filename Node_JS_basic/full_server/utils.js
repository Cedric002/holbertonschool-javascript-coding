import fs from "fs";
import util from "util";

const readFile = util.promisify(fs.readFile);

async function readDatabase(filePath) {
  try {
    const data = await readFile(filePath, "utf8");
  } catch (error) {
    return Promise.reject(error);
  }
}

export default readDatabase;
