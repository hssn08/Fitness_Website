import React, { useState } from "react";
import { TextField, Button, Card, CardContent} from "@mui/material";

  const AddExerciseData = ({ onClose, dayOfWeek, onAdd, existingExercises }) => {
  const [exercise, setExercise] = useState("");
  const [weight, setWeight] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");

  const isFormFilled = exercise !== "" && weight !== "" && sets !== "" && reps !== "";

  const handleSubmit = async () => {

    if (isFormFilled) {

      const exerciseExists = existingExercises.some(ex => ex.exercise.trim().toLowerCase() === exercise.trim().toLowerCase());
      if (exerciseExists) {

        alert("Exercise with the same name already exists for this day.");
        return;
      }
      try {
        const response = await fetch("http://localhost:5000/bfit/goalSetting", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            exercise,
            weight,
            sets,
            reps,
            dayOfWeek,
          }),
        });
        if (response.ok) {
          // Data added successfully
          alert("Data added successfully");
          onAdd();
          onClose(); // Close the form
        } else {
          // Error occurred while adding data
          alert("Error adding data. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
      }
    } else {
      alert("Please fill all fields");
    }

  };
  
  return (
    <Card>
      <CardContent>
        <div style={{ marginBottom: 16 }}>
          <TextField
            label="Exercise Name"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <TextField
            label="Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <TextField
            label="Sets"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <TextField
            label="Reps"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddExerciseData;
