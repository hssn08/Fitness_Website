import React from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import heroImage from "../assets/images/hero.jpg"; // Replace with your actual image path
import workoutImage from "../assets/images/workout.jpeg"; // Replace with your actual image path
import nutritionImage from "../assets/images/lll.jpg"; // Replace with your actual image path
import classesImage from "../assets/images/classes.jpg"; // Replace with your actual image path

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleJoinUsClick = () => {
    navigate("/exerciseLibrary"); // Navigate to ExerciseLibraryPage
  };

  return (
    <Box sx={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff" }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            color: "white",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black overlay
              zIndex: 1,
            }}
          />
          <Box sx={{ position: "relative", zIndex: 2, textAlign: "center" }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to BFit
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Your journey to a healthier life starts here
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleJoinUsClick} // Add onClick handler
            >
              Join Us Today
            </Button>
          </Box>
        </Box>
        <Grid container spacing={4} sx={{ mt: 8 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={workoutImage}
                alt="Workouts"
                sx={{ objectFit: "cover" }} // Ensure the image covers the entire width while maintaining aspect ratio
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Workouts
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Explore a variety of workouts for all fitness levels. Get fit
                  with our expert trainers.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={nutritionImage}
                alt="Nutrition"
                sx={{ objectFit: "cover" }} // Ensure the image covers the entire width while maintaining aspect ratio
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Nutrition
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Discover nutritious meal plans and recipes to fuel your
                  fitness journey.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={classesImage}
                alt="Classes"
                sx={{ objectFit: "cover" }} // Ensure the image covers the entire width while maintaining aspect ratio
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Classes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Join our group fitness classes and stay motivated with others.
                  From yoga to HIIT, we have something for everyone.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Add more cards for other sections like Trainers, etc. */}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
