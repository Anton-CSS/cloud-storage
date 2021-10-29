const express = require("express");
const mongoose = require("mongoose");

const PORT = 4000;
const app = express();
const URL =
  "mongodb+srv://Anton-CSS:1234@cloud.uzaoe.mongodb.net/cloud-disk?retryWrites=true&w=majority";
const start = async () => {
  try {
    mongoose.connect(URL);
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();
