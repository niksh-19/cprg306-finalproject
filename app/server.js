const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allow requests from React frontend
app.use(express.json());

// OpenWeather API credentials
const API_KEY = 'abba7ef053b873775103d8baf815e0a6';
const API_BASE = 'https://api.openweathermap.org/data/2.5';

// Route to get weather data based on location
app.get('/api/weather', async (req, res) => {
  const { location } = req.query;

  if (!location) {
    return res.status(400).json({ error: 'Location is required' });
  }

  try {
    // Fetch weather data for the given location
    const weatherRes = await fetch(`${API_BASE}/weather?q=${location}&appid=${API_KEY}`);
    
    if (!weatherRes.ok) {
      return res.status(weatherRes.status).json({ error: 'Failed to fetch weather data' });
    }

    const weatherData = await weatherRes.json();
    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
