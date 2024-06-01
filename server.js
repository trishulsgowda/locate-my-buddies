const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

/*app.get('/', (req, res) => {
  res.send('<h1>Hello, World!</h1><p>Welcome to my webpage.</p>');
});*/

app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to get coordinates
app.get('/api/coordinates', (req, res) => {
    const coordinates = [
        { lat: 13.069154, lng: 77.502401, label: 'Zeal' },
        { lat: 13.075919, lng: 77.502534, label: 'Chikkabanavara Shuttle' },
        { lat: 13.063985, lng: 77.504116, label: 'Ace Arena' }
    ];
    res.json(coordinates);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});