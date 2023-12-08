//initializing mongoose in this file to create a schema for data
//Developers prefer Mongoose because it simplifies MongoDB interactions, allowing them to define data structures, perform operations easily, and apply validations effortlessly, making database management in Node.js applications more organized and efficient.
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
