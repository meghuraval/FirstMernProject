import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../../hooks/useWorkoutsContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      //connecting to the server fo the backend and awaiting since it will be a promise.
      const response = await fetch("http://localhost:4000/api/workouts");
      //one the data is gottne, convert the data into json, this will also be a promise
      const json = await response.json();

      //if the data is obtaines, the set the setWorkout variable to the workouts json that are obtained.
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    //run the fetch workout function
    fetchWorkouts();
  }, []);

  return (
    //using workout._id becuase id in mongo db is used as _id, so i cant directly access id by saying workout.id.
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
