require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const { filterCoordinatesWithinRadius} = require('./fetchCoordinates');
const bodyParser = require('body-parser');


const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Load the API key from environment variables

let storedLocations = [
    { name: 'Zeal Badminton Academy', latitude: 13.069154, longitude: 77.502401 },
    { name: 'Chikkabanavara Shuttle Academy', latitude: 13.075919, longitude: 77.502534 },
    { name: 'Ace Arena Badminton Academy', latitude: 13.063985, longitude: 77.504116 },
    { name: 'Accolades Badminton Academy', latitude: 13.047308, longitude: 77.502410 },
    { name: 'Anjanadri Badminton Academy', latitude: 13.042793, longitude: 77.502002 },
    { name: 'Game Point', latitude: 13.081337, longitude: 77.511018 },
    { name: 'Golden Sports Badminton', latitude: 13.046357, longitude: 77.512782 }
];


//app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.get('/locatemybuddies', (req, res) => {
    const fs = require('fs');
    const path = require('path');

    fs.readFile(path.join(__dirname, '/public/index.html'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading HTML file');
            return;
        }
        const htmlWithApiKey = data.replace('<API_KEY>', apiKey);
        res.send(htmlWithApiKey);
    });
});

// Endpoint to receive and store user data
app.post('/api/store-location', (req, res) => {

    console.log('Received request:', req.body);
    const { name, latitude, longitude } = req.body;

    if (!name || !latitude || !longitude) {
        return res.status(400).send('Name, latitude, and longitude are required');
    }

    const newLocation = { name, latitude, longitude };
    storedLocations.push(newLocation);

    res.status(200).send('Location stored successfully');
});

// API endpoint to get coordinates
app.get('/api/coordinates', (req, res) => {

    const { latitude, longitude, radius } = req.query;

    if (!latitude || !longitude || !radius) {
        return res.status(400).json({ error: 'Please provide latitude, longitude, and radius.' });
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const rad = parseFloat(radius);

    const filteredCoordinates = filterCoordinatesWithinRadius(lat,lng,rad, storedLocations);
    res.json(filteredCoordinates);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${port}`);
});