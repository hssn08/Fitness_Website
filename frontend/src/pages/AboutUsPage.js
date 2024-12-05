import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import teamImage from "../assets/images/team.jpg"; // Replace with your actual image path
import missionImage from "../assets/images/mission.jpg"; // Replace with your actual image path
import founderImage from "../assets/images/founder.jpeg"; // Replace with your actual image path

const AboutUsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          About Us
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Learn more about our journey, mission, and the team behind BFit.
        </Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={missionImage}
              alt="Our Mission"
              sx={{ objectFit: "cover" }}
            />
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body1" color="text.secondary">
                At BFit, our mission is to empower individuals to achieve their
                fitness goals through personalized training programs, expert
                guidance, and a supportive community. We believe in the
                transformative power of fitness and are dedicated to helping you
                become the best version of yourself.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={teamImage}
              alt="Our Team"
              sx={{ objectFit: "cover" }}
            />
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Our Team
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Our team of experienced trainers, nutritionists, and wellness
                experts are passionate about helping you achieve your fitness
                goals. We are committed to providing personalized support and
                guidance to ensure you have the best possible experience on your
                fitness journey.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Meet Our Founder
        </Typography>
        <Avatar
          alt="Founder"
          src={founderImage}
          sx={{ width: 150, height: 150, mx: "auto", mb: 2 }}
        />
        <Typography variant="h6" component="div">
          Phunsukh Wangdu
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Phunsukh Wangdu founded BFit with a vision to create a fitness
          community that empowers individuals to achieve their best selves. With
          over 20 years of experience in the fitness industry, Wangdu is dedicated
          to providing expert guidance and support to help you reach your
          fitness goals.
        </Typography>
      </Box>
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center">
          Our Values
        </Typography>
        <List>
          <ListItem>
            <Typography variant="body1" sx={{ mr: 2 }}>
              -
            </Typography>
            <ListItemText
              primary="Passion"
              secondary="We are passionate about fitness and dedicated to helping you achieve your goals."
            />
          </ListItem>
          <ListItem>
            <Typography variant="body1" sx={{ mr: 2 }}>
              -
            </Typography>
            <ListItemText
              primary="Community"
              secondary="We believe in the power of community and strive to create a supportive environment for all our members."
            />
          </ListItem>
          <ListItem>
            <Typography variant="body1" sx={{ mr: 2 }}>
              -
            </Typography>
            <ListItemText
              primary="Excellence"
              secondary="We are committed to excellence in everything we do, from our training programs to our customer service."
            />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
};

export default AboutUsPage;
