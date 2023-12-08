//creating a seperate file for the logic of controllers just so the one file of routes doesnt get too bloated.

const Workout = require("../models/workoutModels");

const mongoose = require("mongoose");

//----------------------------------------------------------------

//get all the workouts controller
const getWorkouts = async (req, res) => {
  //we are using Workout model here which is found in models/workout folder to execute controllers
  //created at -1 just sorts the list in descending order so we get the newest updated workouts first
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  //returning all workouts in json format and also returning the status code of 200
  res.status(200).json(workouts);
};

//----------------------------------------------------------------

//get a single workout controller

const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such workout with specified id" });
  }
  //we are using Workout model here which is found in models/workout folder to execute controllers
  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ err: "Not Found" });
  }
  res.status(200).json(workout);
};

//----------------------------------------------------------------

const getWorkoutByLoad = async (req, res) => {
  const { load } = req.params;

  try {
    //using parseint here to make sure that consistency remains and that the load valuse would be converted to an int, it is not needed in this case becuase the schema markup makes sure that load is an int, but i still put it here just to practice parseint.
    const workout = await Workout.find({ load: parseInt(load) });
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: "No workout wit specified load" });
  }
};

//----------------------------------------------------------------

// create a new workout controller
const createWorkout = async (req, res) => {
  //whenever a request is sent in POST, these 3 things should be present in the body becuase of the schema present in the models folder
  const { title, load, reps } = req.body;
  if (!title || !load || !reps) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields." });
  }

  if (title === undefined || title === null || title.trim() === "") {
    return res.status(400).json({ error: "Please enter a title" });
  }

  if (isNaN(load)) {
    return res.status(400).json({ error: "Load should be numbers." });
  }

  if (isNaN(reps)) {
    return res.status(400).json({ error: "Reps should be numbers." });
  }

  try {
    //we are using Workout model here which is found in models/workout folder to execute controllers
    const workout = await Workout.create({ title, load, reps });
    //below code... if everthing goes well in the try, then please send back a reponse of 200 to let user know that everything is good and also send the workout object which was created inn json format
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

//-------------------------------------------------------------------

// delete a workout controller

const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  //checkking if the id exists, if it doesn't then we can get an error in postman instead of an internal error.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such workout with specified id" });
  }

  //in mongodb, id is referred to as "_id" so in the below code its basically written thta, if the provided id matches with the database _id, then delete the workout
  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ err: "Not Found" });
  }
  res.status(200).json(workout);
};

//----------------------------------------------------------------------

// update a workout controller

const updateWorkout = async (req, res) => {
  const { id } = req.params;

  //checkking if the id exists, if it doesn't then we can get an error in postman instead of an internal error.
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such workout with specified id" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    //... is used as the spread operator which basically shows all th properties inside of req.body object
    { ...req.body },
    { new: true }
  );

  if (!workout) {
    return res.status(404).json({ err: "Not Found" });
  }
  res.status(200).json(workout);
};

//--------------------------------------------------------------
//exporting the above created functions so i can use them in workout.js where all my routes are located

module.exports = {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
  getWorkoutByLoad,
};
