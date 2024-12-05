import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
  CardMedia,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import rickshaw from "../assets/images/rickshaw.jpeg";
import singlelegpress from "../assets/images/singlelegpress.jpeg";
import landmine from "../assets/images/landmine.jpeg";
import weighted from "../assets/images/weighted.jpeg";
import tbar from "../assets/images/tbar.jpeg";
import palmdown from "../assets/images/palmdown.jpeg";
import atlas from "../assets/images/atlas.jpeg";
import dumb from "../assets/images/dumb.jpeg";
import clean from "../assets/images/clean.jpeg";
import hammer from "../assets/images/hammer.jpeg";

const imageMap = {
  "Rickshaw Carry": rickshaw,
  "Single-Leg Press": singlelegpress,
  "Landmine twist": landmine,
  "Weighted pull-up": weighted,
  "T-Bar Row with Handle": tbar,
  "Palms-down wrist curl over bench": palmdown,
  "Atlas Stones": atlas,
  "Dumbbell front raise to lateral raise": dumb,
  "Clean from Blocks": clean,
  "Incline Hammer Curls": hammer,
};

const getDifficultyColor = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case "beginner":
      return "green";
    case "intermediate":
      return "orange";
    case "advanced":
      return "red";
    default:
      return "gray";
  }
};

const formatDifficulty = (difficulty) => {
  return difficulty.toLowerCase() === "intermediate" ? "medium" : difficulty;
};

const truncateName = (name) => {
  const words = name.split(" ");
  return words.length > 4 ? words.slice(0, 3).join(" ") : name;
};

const ExerciseLibrary = () => {
  const [exercises, setExercises] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(
          "https://api.api-ninjas.com/v1/exercises",
          {
            headers: {
              "X-Api-Key": "fm5P+qr07nI12K1hQjQjrw==wKT0AocQPVu4HVgy",
            },
          }
        );
        setExercises(response.data.slice(0, 10)); // Get at least 10 exercises
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/bfit/favorites"
        );
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchExercises();
    fetchFavorites();
  }, []);

  const filteredExercises = exercises.filter(
    (exercise) =>
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !favorites.some((fav) => fav.name === exercise.name)
  );

  const handleAddToFavorites = async (exercise) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/bfit/favorites",
        exercise
      );
      setFavorites((prevFavorites) => [...prevFavorites, response.data]);
      setExercises((prevExercises) =>
        prevExercises.filter((ex) => ex.name !== exercise.name)
      );
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const handleDeleteFromFavorites = async (id) => {
    try {
      const exerciseToRemove = favorites.find(
        (exercise) => exercise._id === id
      );
      await axios.delete(`http://localhost:5000/bfit/favorites/${id}`);
      setFavorites((prevFavorites) =>
        prevFavorites.filter((exercise) => exercise._id !== id)
      );
      setExercises((prevExercises) => [...prevExercises, exerciseToRemove]);
    } catch (error) {
      console.error("Error deleting from favorites:", error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const renderExerciseCard = (exercise, isFavorite = false) => (
    <Grid item xs={12} sm={6} md={4} key={exercise._id || exercise.name}>
      <Card>
        <Box
          sx={{
            position: "relative",
            paddingTop: "56.25%" /* 16:9 aspect ratio */,
          }}
        >
          <CardMedia
            component="img"
            image={imageMap[exercise.name] || "https://via.placeholder.com/150"}
            alt={exercise.name}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              {truncateName(exercise.name)}
            </Typography>
            <IconButton
              color="primary"
              aria-label={
                isFavorite ? "remove from favorites" : "add to favorites"
              }
              onClick={() =>
                isFavorite
                  ? handleDeleteFromFavorites(exercise._id)
                  : handleAddToFavorites(exercise)
              }
              sx={{
                "&:hover": {
                  boxShadow: isFavorite
                    ? "0 0 10px 2px rgba(255, 0, 0, 0.5)" // Red shadow for remove button on hover
                    : "0 0 10px 2px rgba(0, 255, 0, 0.5)", // Green shadow for add button on hover
                },
              }}
            >
              {isFavorite ? <RemoveIcon /> : <AddIcon />}
            </IconButton>
          </Box>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary" noWrap>
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  Type:
                </Typography>{" "}
                {exercise.type}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary" noWrap>
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  Muscle:
                </Typography>{" "}
                {exercise.muscle}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary" noWrap>
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  Equipment:
                </Typography>{" "}
                {exercise.equipment}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary" noWrap>
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  Difficulty:
                </Typography>{" "}
                <span
                  style={{
                    backgroundColor: getDifficultyColor(exercise.difficulty),
                    color: "white",
                    padding: "2px 4px",
                    borderRadius: "4px",
                  }}
                >
                  {formatDifficulty(exercise.difficulty)}
                </span>
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="body2" color="text.secondary" mt={1}>
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              Instructions:
            </Typography>{" "}
            {exercise.instructions.split(". ")[0]}.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Exercise Library
        </Typography>
        <TextField
          label="Search Exercises"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="All Exercises" />
        <Tab label="Favorites" />
      </Tabs>
      <Grid container spacing={4}>
        {tabIndex === 0
          ? filteredExercises.map((exercise) => renderExerciseCard(exercise))
          : favorites.map((exercise) => renderExerciseCard(exercise, true))}
      </Grid>
    </Container>
  );
};

export default ExerciseLibrary;
