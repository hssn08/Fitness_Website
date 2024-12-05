import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddExerciseData from "./AddExerciseData";
import ExerciseEntry from "./ExerciseEntry";

const GoalSettingData = ({ day }) => {
  const [showForm, setShowForm] = useState(false);
  const [exerciseData, setExerciseData] = useState([]);

  useEffect(() => {
    fetchExerciseData();
  }, [day]); // Trigger fetch when day changes

  const fetchExerciseData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/bfit/goalSetting?dayOfWeek=${day}`
      );
      if (response.ok) {
        const data = await response.json();
        setExerciseData(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleAdd = () => {
    // Call fetchExerciseData to refresh the data after add
    fetchExerciseData();
    setShowForm(false);
  };

  const handleDelete = () => {
    // Call fetchExerciseData to refresh the data after delete
    fetchExerciseData();
  };

  const handleUpdate = () => {
    // Call fetchExerciseData to refresh the data after update
    fetchExerciseData();
  };

  // Filter exercises for the specific day
  const exercisesForDay = exerciseData.filter(
    (exercise) => exercise.dayOfWeek === day
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography variant="h4" sx={{ mr: 2 }}>
          {day}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleAddClick}>
          Add
        </Button>
      </Box>
      <Dialog open={showForm} onClose={handleCloseForm} fullWidth maxWidth="sm">
        <DialogTitle>Add Exercise Data</DialogTitle>
        <DialogContent>
          <AddExerciseData
            onClose={handleCloseForm}
            dayOfWeek={day}
            onAdd={handleAdd}
            existingExercises={exercisesForDay}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseForm}
            sx={{
              backgroundColor: "orange",
              color: "white",
              "&:hover": { backgroundColor: "darkorange" },
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {exercisesForDay.length > 0 ? (
        <Grid container spacing={4} style={{ marginTop: "1rem" }}>
          {exercisesForDay.map((exercise, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <ExerciseEntry
                    exercise={exercise}
                    existingExercises={exercisesForDay}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">No exercises for this day.</Typography>
      )}
    </Box>
  );
};

export default GoalSettingData;
