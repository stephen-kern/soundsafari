// Import packages
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// set up port
const PORT = process.env.PORT;

// create express app
const app = express();
app.use(express.json());
app.use(cors());

// Listen for requests
app.listen(PORT, () => {
  console.log(`Listening on localhost:${PORT}`);
});
