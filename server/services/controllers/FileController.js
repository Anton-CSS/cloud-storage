const fs = require("fs");
const Uuid = require("uuid");
const fileService = require("../fileService");
const User = require("../../models/user");
const File = require("../../models/File");
const { pathFiles, pathStatic } = require("../../pathFiles");

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
      await file.save();
      return res.json(file);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: e.message });
    }
  }

  async receiveFiles(req, res) {
    let files;
    try {
      const { sort } = req.query;
      switch (sort) {
        case "name":
          files = await File.find({
            user: req.user.id,
            parent: req.query.parent,
          }).sort({ name: 1 });
          break;
        case "type":
          files = await File.find({
            user: req.user.id,
            parent: req.query.parent,
          }).sort({ type: 1 });
          break;
        case "date":
          files = await File.find({
            user: req.user.id,
            parent: req.query.parent,
          }).sort({ date: 1 });
          break;
        default:
          files = await File.find({
            user: req.user.id,
            parent: req.query.parent,
          });
          break;
      }
      return res.json(files);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Cannot get files" });
    }
  }

  async uploadFile(req, res) {
    try {
      console.log(req);
      const { file } = req.files;
      const parent = await File.findOne({
        user: req.user.id,
        _id: req.body.parent,
      });
      const user = await User.findOne({ _id: req.user.id });
      if (user.usedSpace + file.size > user.diskSpace) {
        return res.status(500).json({ message: "Don't have free space" });
      }
      user.usedSpace += file.size;
      let path;
      if (parent) {
        path = `${pathFiles}\\${user._id}\\${parent.path}\\${file.name}`;
      } else {
        path = `${pathFiles}\\${user._id}\\${file.name}`;
      }
      if (fs.existsSync(path)) {
        return res.status(500).json({ message: "File already exist" });
      }
      file.mv(path);
      const type = file.name.split(".").pop();

      let filePath = file.name;
      if (parent) {
        filePath = `${parent.path}\\${file.name}`;
      }

      const dbFile = new File({
        name: file.name,
        type,
        size: file.size,
        path: filePath,
        parent: parent._id,
        user: user._id,
      });
      await dbFile.save();
      await user.save();

      res.json(dbFile);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Upload error" });
    }
  }

  async downloadFile(req, res) {
    try {
      const file = await File.findOne({ _id: req.query.id, user: req.user.id });
      const path = fileService.getPath(file);
      // const path = `${pathFiles}\\${req.user.id}\\${file.path}\\${file.name}`;
      if (fs.existsSync(path)) {
        return res.download(path, file.name);
      }
      return res.status(500).json({ message: "Path don't find" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Download error" });
    }
  }

  async deleteFile(req, res) {
    try {
      const file = await File.findOne({ _id: req.query.id, user: req.user.id });
      if (!file) {
        return res.status(500).json({ message: "File not found" });
      }
      fileService.deleteFile(file);
      await file.remove();
      return res.json({ message: "File was deleted" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Dir is not empty" });
    }
  }

  async searchFile(req, res) {
    try {
      const searchName = req.query.search;
      let files = await File.find({ user: req.user.id });
      files = files.filter((file) => file.name.includes(searchName));
      return res.json(files);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Search error" });
    }
  }

  async uploadAvatar(req, res) {
    try {
      const { file } = req.files;
      const user = await User.findById(req.user.id);
      const avatarName = `${Uuid.v4()}.jpg`;
      file.mv(`${pathStatic}\\${avatarName}`);
      user.avatar = avatarName;
      await user.save();
      return res.json(user);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Upload avatar error" });
    }
  }

  async deleteAvatar(req, res) {
    try {
      const user = await User.findById(req.user.id);
      fs.unlinkSync(`${pathStatic}\\${user.avatar}`);
      user.avatar = null;
      await user.save();
      return res.status(200).json(user);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Cannot delete avatar" });
    }
  }
}

module.exports = new FileController();
