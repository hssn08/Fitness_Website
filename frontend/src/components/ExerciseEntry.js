import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";

const ExerciseEntry = ({ exercise, existingExercises, onUpdate, onDelete }) => {
  const [editedExercise, setEditedExercise] = useState({
    exercise: exercise.exercise,
    weight: exercise.weight.toString(),
    sets: exercise.sets.toString(),
    reps: exercise.reps.toString(),
  });

  const [originalExerciseName, setOriginalExerciseName] = useState(exercise.exercise);

  useEffect(() => {
    setOriginalExerciseName(exercise.exercise); // Update originalExerciseName when exercise name changes
  }, [exercise.exercise]);

  const isFormFilled = editedExercise.exercise.trim() !== "" && editedExercise.weight.trim() !== "" && editedExercise.sets.trim() !== "" && editedExercise.reps.trim() !== "";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedExercise((prevExercise) => ({
      ...prevExercise,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    if (!isFormFilled) {
      alert("Please fill all exercise fields");
      return;
    }
  
    // Check if the exercise name already exists for the same day
    const isDuplicateExercise = existingExercises.some(
      (existingExercise) =>
        existingExercise.exercise.toLowerCase() ===
          editedExercise.exercise.toLowerCase() &&
        existingExercise._id !== exercise._id // Exclude the current exercise from comparison
    );
  
    if (isDuplicateExercise) {
        alert("Exercise with this name already exists for this day");
        setEditedExercise((prevExercise) => ({
          ...prevExercise,
          exercise: originalExerciseName,
        }));
        return;
      }
  
    const isEdited =
    editedExercise.exercise !== exercise.exercise ||
    editedExercise.weight !== exercise.weight.toString() ||
    editedExercise.sets !== exercise.sets.toString() ||
    editedExercise.reps !== exercise.reps.toString();

  if (!isEdited) {
    alert("Please make some changes before updating");
    return;
  }
  
    try {
      const response = await fetch(
        `http://localhost:5000/bfit/goalSetting/${exercise._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedExercise),
        }
      );
      if (response.ok) {
        // Exercise updated successfully
        alert("Exercise updated successfully");
        // Call onUpdate to trigger data refresh
        onUpdate();

      } else {
        // Error occurred while updating exercise
        console.error("Error updating exercise");
        // Handle error appropriately, e.g., show error message to the user
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error appropriately, e.g., show error message to the user
    }
  };
  

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/bfit/goalSetting/${exercise._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Exercise deleted successfully
        alert("Exercise deleted successfully");
        // Call onDelete to trigger data refresh
        onDelete();
      } else {
        // Error occurred while deleting exercise
        console.error("Error deleting exercise");
        // Handle error appropriately, e.g., show error message to the user
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error appropriately, e.g., show error message to the user
    }
  };

  return (
    <Card style={{ marginTop: "1rem" }}>
      <CardContent>
        <TextField
          name="exercise"
          label="Exercise Name"
          value={editedExercise.exercise}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="weight"
          label="Weight"
          value={editedExercise.weight}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="sets"
          label="Sets"
          value={editedExercise.sets}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="reps"
          label="Reps"
          value={editedExercise.reps}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete} style={{ marginLeft: "1rem" }} >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExerciseEntry;
