const db = require("../models");

module.exports = function (app) {

    //seed
    db.Workout.find({}).then(function (res) {
    console.log("Checking if db is populated");
    if (res.length === 0) {
    console.log("DB is empty");
    require("./seeders/seed.js");
    }
    });

    //get workouts
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({}).then(dbWorkout => {
            dbWorkout.forEach(workout => {
                var total = 0;
                workout.exercise.forEach(e => {
                    total += e.duration;
                });
                workout.totalDuration = total;
            });
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
    });

    //add exercise
    app.put("/api/workouts/:id", (req, res) => {
        db.Workout.findOneAndUpdate(
            {_id: req.params.id},
            {$inc: {totalDuration: req.body.duration},
            $push: { exercises: req.body }
        },
        { new: true }).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
    })

    //new workout
    app.post("/api/workouts", ({ body }, res) => {
        db.Workout.create(body).then((dbWorkout => {
            res.json(dbWorkout);
        })).catch(err => {
            res.json(err);
        });
    });

    //find workouts 
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({}).then(dbWorkout => {
            console.log(dbWorkout);
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
    });

}