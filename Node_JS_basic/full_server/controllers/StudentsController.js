import readDatabase from "../utils";

class StudentsController {
  static async getAllStudents(request, response) {
    try {
      const data = await readDatabase("/path/to/database");
      // Votre logique pour afficher les données
    } catch (error) {
      return response.status(500).send("Cannot load the database");
    }
  }

  static async getAllStudentsByMajor(request, response) {
    const { major } = request.params;
    if (!["CS", "SWE"].includes(major)) {
      return response.status(500).send("Major parameter must be CS or SWE");
    }

    try {
      const data = await readDatabase("/path/to/database");
      // Votre logique pour afficher les données
    } catch (error) {
      return response.status(500).send("Cannot load the database");
    }
  }
}

export default StudentsController;
