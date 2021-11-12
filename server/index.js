const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const authRouter = require("./routers/auth-router");
const fileRouter = require("./routers/file-router");
const cors = require("./middleware/middleware");

const PORT = 4000;

const app = express();
app.use(cors);
app.use(fileUpload({}));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/files", fileRouter);

const URL =
  "mongodb+srv://Anton-CSS:1234@cloud.uzaoe.mongodb.net/cloud-disk?retryWrites=true&w=majority";

const start = async () => {
  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
