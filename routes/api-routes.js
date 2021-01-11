const express = require("express").Router();
const db = require("../models")

express.post("/api/workouts", (req, res) => {
    console.log(req)
    db.Workout.create({})
        .then(dbWorkouts => {
            console.log("Workouts: ", dbWorkouts)
            res.json(dbWorkouts)
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

express.get("/api/workouts", (req, res) => {
    db.Workout.find()
        .then(dbWorkouts => {
            console.log("Workouts: ", dbWorkouts)
            res.json(dbWorkouts)
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

express.get("/api/workouts/range", function (req, res) {
    db.Workout.find()
        .then(dbWorkouts => {
            console.log("RNG Workouts: ", dbWorkouts)
            res.json(dbWorkouts)
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

express.put("/api/workouts/:id", (req, res) => {
    db.Workout.findByIdAndUpdate(
        req.params.id,
        { $push: { exercises: req.body } },
        { new: true}
    ).then(function (dbWorkout) {
        res.json(dbWorkout);
        console.log("Workouts: ", dbWorkout)
    })
        .catch(err => {
            res.status(400).json(err);
        });
});


module.exports = express;