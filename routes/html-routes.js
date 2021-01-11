const express = require("express").Router();
const path = require("path");

express.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "./../public/index.html"));
});

express.get("/exercise", function (req, res) {
    res.sendFile(path.join(__dirname + "./../public/exercise.html"));
});

express.get("/stats", function (req, res) {
    res.sendFile(path.join(__dirname + "./../public/stats.html"));
});

module.exports = express;