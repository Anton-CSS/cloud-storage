const fs = require("fs");
const { pathFiles } = require("../pathFiles");

class FileService {
  createDir(file) {
    const filePath = `${pathFiles}\\${file.user}\\${file.path}`;
    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);
          console.log();
          return resolve({ message: "File was created" });
        }
        return reject({ message: "File already exist" });
      } catch (e) {
        return reject({ message: e.message });
      }
    });
  }

  deleteFile(file) {
    const path = this.getPath(file);
    if (file.type === "dir") {
      fs.rmdirSync(path);
    } else {
      fs.unlinkSync(path);
    }
  }

  getPath(file) {
    return `${pathFiles}\\${file.user}\\${file.path}`;
  }
}

module.exports = new FileService();
