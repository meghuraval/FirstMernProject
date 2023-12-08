import React, { useState } from "react";
import { useWorkoutContext } from "../../hooks/useWorkoutsContext";

export default function WorkoutForm() {
  const { dispatch } = useWorkoutContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    const response = await fetch("http://localhost:4000/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      console.log("new workout added", json);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a workout</h3>

      <label>Exercise Name</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        required
        onInvalid={(e) =>
          e.target.setCustomValidity("Please enter the Exercise Name")
        }
        onInput={(e) => e.target.setCustomValidity("")}
      />

      <label>Load (in kg)</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        required
        onInvalid={(e) => e.target.setCustomValidity("Please enter the load")}
        onInput={(e) => e.target.setCustomValidity("")}
      />

      <label>Amount of Reps</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        required
        onInvalid={(e) =>
          e.target.setCustomValidity("Please enter the amount of Reps")
        }
        onInput={(e) => e.target.setCustomValidity("")}
      />

      <button className="addBtn">Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
