require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const { filterCoordinatesWithinRadius} = require('./fetchCoordinates');
const { getBadmintonCourts} = require('./badmintonCourtsCache'); 
const bodyParser = require('body-parser');
const { faker } = require('@faker-js/faker');
const fs = require('fs');
const logger = require('./logger');

const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Load the API key from environment variables

let storedLocations = getBadmintonCourts();

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
    logger.info('Received request', { body: req.body });
    const { name, latitude, longitude, locationType } = req.body;

    if (!name || !latitude || !longitude) {
        return res.status(400).send('Name, latitude, and longitude are required');
    }

    const newLocation = { name, latitude, longitude, locationType };
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

app.get('/random-name', (req, res) => {
    const randomName = faker.person.fullName();
    console.log('Name:'+ randomName)
    res.send({ name: randomName });
  });

app.post('/log', (req, res) => {
    const logData = req.body.logs + '\n';

    // Append the log data to a file
    fs.appendFile('logs.txt', logData, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            res.status(500).send('Error writing to file');
        } else {
            res.status(200).send('Log saved');
        }
    });
});  

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${port}`);
});