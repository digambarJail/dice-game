const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const diceRoutes = require("./routes/diceRoutes")
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", diceRoutes);
app.get("/health", (req, res) => {
    res.send("Server is running!");
});
  

module.exports = app;
