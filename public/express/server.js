const express = require("express");
const app = express();
var isRunning = false;
const { basename } = require("path");

const runServer = async (filePath) => {
  if (filePath == null) return;
  var dir = filePath.replace(basename(filePath), "");
  app.use(express.static(dir));
  app.get("/", (req, res) => {
    res.json({ msg: true });
  });
  if (!isRunning) {
    var server = app.listen(80, () => {
      console.log("App listening on Port 80");
      isRunning = true;
    });
  }
};
module.exports = { runServer };
