require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const path = require("path"); // Correctly import the path module

const app = express();
let weatherData;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

app.get("/", async(req, res) => {
    const response = await axios.get("https://api.weatherapi.com/v1/forecast.json?key=7931b0d8a0fe4328afc151038241406&q=dharmavaram&aqi=yes&days=7", { timeout: 5000 });
        weatherData = response.data.forecast;
        res.status(200).json({ weather: weatherData });
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Server started on port "+ process.env.PORT);
});
