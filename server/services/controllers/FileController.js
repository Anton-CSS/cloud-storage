const fileService = require("../fileService");
const User = require("../../models/user");
const File = require("../../models/File");

class FileController {
  async createDir(req, res) {
    try {
      const { name, type, parent } = req.body;
      const file = new File({ name, type, parent, user: req.user.id });
      const parentFile = await File.findOne({ _id: parent });
      if (!parentFile) {
        file.path = name;
        await fileService.createDir(file);
      } else {
        file.path = `${parentFile.path}\\${file.name}`;
        await fileService.createDir(file);
        parentFile.children.push(file._id);
        await parentFile.save();
      }
      file.save();
      return res.json(file);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }
  async receiveFiles(req, res) {
    try {
      const files = await File.find({
        user: req.user.id,
        parent: req.query.parent,
      });
      return res.json({ files });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Cannot get files" });
    }
  }
}

module.exports = new FileController();
