const express = require("express");

//use the below require to import .env into your file, which helps store important data as variables.
require("dotenv").config();

//importing mongoose
const mongoose = require("mongoose");

//importing workout routes(workout.js) here so i can use it within this file, routes is the folder name in the project and workout.js is the file within the folder where all the routes are located.
const workoutRoutes = require("./routes/workouts");

//express app gets created and gets stored in the app constant
const app = express();

//this bottom line is called the middleware
//make sure to always include (req, res, next) in your middleware
//middleware is like a filter for requests coming into your web application. It can do things like checking if users are logged in, formatting data, or logging requests. It sits in the middle, checks or modifies requests before they reach the final destination (like a route or a page), and helps handle common tasks in a more organized way.
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//connect to db using mongoose, mongoose.connect(insert the connection url of database). storing the actual connection uri in the .env file behing teh  varibale name "MONGO_URI" to prevnt the URI form being openly exposed ad using the process.env.{name of variable} to us ethe environment variable
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests once connected to database, process.env.PORT is just port 4000 but hidden behind the name of "PORT" for security reasons
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//routes, the below setup means that all api routes after "/api/workouts/{route setup, for example "/hello" and in full form of the example "/api/workouts/hello"}"
//this setup means that "/api/workouts" is set as the default path, all the other routes have to follow after "/api/workouts" in order to get a response
app.use("/api/workouts", workoutRoutes);

process.env;
