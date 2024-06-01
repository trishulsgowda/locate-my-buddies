const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const { filterCoordinatesWithinRadius} = require('./fetchCoordinates');

/*app.get('/', (req, res) => {
  res.send('<h1>Hello, World!</h1><p>Welcome to my webpage.</p>');
});*/

app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get coordinates
app.get('/api/coordinates', (req, res) => {

    const { latitude, longitude, radius } = req.query;

    if (!latitude || !longitude || !radius) {
        return res.status(400).json({ error: 'Please provide latitude, longitude, and radius.' });
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const rad = parseFloat(radius);

    const filteredCoordinates = filterCoordinatesWithinRadius(lat,lng,rad);
    res.json(filteredCoordinates);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});