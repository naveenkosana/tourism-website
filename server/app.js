//import records from "./routes/record.js";
//mongoDB

const express = require("express");

const fs = require("fs");

const cors = require("cors");

const bcrypt = require("bcrypt");

const bodyParser = require("body-parser");

const app = express();

const jsonParser = bodyParser.json();

app.use(cors());

//mongoDB
// app.use(express.json());
// app.use("/record", records);
//mogodb

//api endpoints for fetching and storing users
// Load user data from a JSON file (replace with a database later)
const usersFile = fs.readFileSync("assets/users.json");
const usersData = JSON.parse(usersFile);

// Function to save user data to a JSON file
function saveUserData() {
  const updatedUsersData = JSON.stringify(usersData);
  fs.writeFileSync("assets/users.json", updatedUsersData);
}

// API endpoint for user registration
app.post("/api/users/register", jsonParser, async (req, res) => {
  const { username, email, password } = req.body;

  // Check if user already exists
  const existingUser = usersData.find(
    (user) => user.username === username || user.email === email
  );
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  // Hash the password for security
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user object
  const newUser = {
    id: usersData.length + 1,
    username,
    email,
    password: hashedPassword,
  };

  // Add the new user to the usersData array
  usersData.push(newUser);

  // Save updated user data
  saveUserData();

  res.status(201).json({ message: "Registration successful" });
});

// API endpoint for user login
app.post("/api/users/login", jsonParser, async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = usersData.find((user) => user.username === username);

  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  // Verify the password using bcrypt
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      error: "Invalid username or password",
    });
  }

  // Successful login (replace with your desired authentication logic)
  res.status(200).json({ message: "Login successful" });
});

//api endpoints for fetching destinations
const destinationsFile = fs.readFileSync("assets/destinations.json");
const destinationsData = JSON.parse(destinationsFile);
app.get("/api/destinations", (req, res) => {
  res.json(destinationsData);
});

app.get("/api/destinations/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const destination = destinationsData.find((d) => d.id === id);
  if (destination) {
    res.json(destination);
  } else {
    res.status(404).json({ error: "Destination not found" });
  }
});

//api endpoints for bookings

// Load hotel data from a JSON file (replace with actual data)
const hotelsFile = fs.readFileSync("assets/hotels.json");
const hotelsData = JSON.parse(hotelsFile);

// Load flight data from a JSON file (replace with actual data)
const flightsFile = fs.readFileSync("assets/flights.json");
const flightsData = JSON.parse(flightsFile);

// Load tour data from a JSON file (replace with actual data)
const toursFile = fs.readFileSync("assets/tours.json");
const toursData = JSON.parse(toursFile);

// API endpoint to retrieve hotels for a destination
app.get("/api/hotels/:destination", (req, res) => {
  const { destination } = req.params;
  const destinationData = destinationsData.find((d) => d.name === destination);
  if (destinationData) {
    const destinationHotels = hotelsData.filter(
      (h) => h.destinationId === destinationData.id
    );
    res.json(destinationHotels);
  } else {
    res.status(404).json({ error: "Destination not found" });
  }
});

// API endpoint to retrieve flights for a destination
app.get("/api/flights/:destination", (req, res) => {
  const { destination } = req.params;
  const destinationData = destinationsData.find((d) => d.name === destination);
  if (destinationData) {
    const destinationFlights = flightsData.filter(
      (f) => f.destinationId === destinationData.id
    );
    res.json(destinationFlights);
  } else {
    res.status(404).json({ error: "Destination not found" });
  }
});

// API endpoint to retrieve tours for a destination
app.get("/api/tours/:destination", (req, res) => {
  const { destination } = req.params;
  const destinationData = destinationsData.find((d) => d.name === destination);
  if (destinationData) {
    const destinationTours = toursData.filter(
      (t) => t.destinationId === destinationData.id
    );
    res.json(destinationTours);
  } else {
    res.status(404).json({ error: "Destination not found" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
