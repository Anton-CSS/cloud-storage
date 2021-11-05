const Router = require("express");
const router = new Router();
const authMiddleware = require("../middleware/auth.middleware");
const fileController = require("../services/controllers/FileController");

router.post("", authMiddleware, fileController.createDir);
router.get("", authMiddleware, fileController.receiveFiles);

module.exports = router;
