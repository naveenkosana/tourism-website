const express = require("express");

const fs = require("fs");

const cors = require("cors");

//const bodyParser = require('body-parser');

const app = express();

//const jsonParser = bodyParser.json();

app.use(cors());
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

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
