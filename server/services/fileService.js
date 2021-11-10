const fs = require("fs");
const File = require("../models/File");

const pathFiles =
  "C:\\Users\\79267\\Desktop\\Мои тренировки\\сloud storage - MERN\\server\\files";

class FileService {
  createDir(file) {
    const filePath = `${pathFiles}\\${file.user}\\${file.path}`;
    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);
          return resolve({ message: "File was created" });
        }
        return reject({ message: "File already exist" });
      } catch (e) {
        return reject({ message: "File error" });
      }
    });
  }
}

module.exports = new FileService();
