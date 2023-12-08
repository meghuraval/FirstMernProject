const express = require("express");

//the ".." is used to exit out of the routes folder and then enter the controllers folder then enter the workoutController file
const {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
  getWorkoutByLoad,
} = require("../controllers/workoutController");

//setting up router in express.js
//initializing the router created and managed by express.js into a variable name called "router"
const router = express.Router();

//GET all workouts
router.get("/", getWorkouts);

//GET a single workout
router.get("/:id", getWorkout);

//GET a single workout by load
router.get("/load/:load", getWorkoutByLoad);

//POST a new workout
//the function is async because the workout.create() method is asynchronous, thats why async await is used in this POST method
router.post("/", createWorkout);

//DELETE a new workout
router.delete("/:id", deleteWorkout);

//UPDATE/PATCH a new workout
router.patch("/:id", updateWorkout);

module.exports = router;
