const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

function getBadmintonCourts(){
 
    let storedLocations = [
        { name: 'Zeal Badminton Academy', latitude: 13.069154, longitude: 77.502401 },
        { name: 'Chikkabanavara Shuttle Academy', latitude: 13.075919, longitude: 77.502534 },
        { name: 'Ace Arena Badminton Academy', latitude: 13.063985, longitude: 77.504116 },
        { name: 'Accolades Badminton Academy', latitude: 13.047308, longitude: 77.502410 },
        { name: 'Anjanadri Badminton Academy', latitude: 13.042793, longitude: 77.502002 },
        { name: 'Game Point', latitude: 13.081337, longitude: 77.511018 },
        { name: 'Golden Sports Badminton', latitude: 13.046357, longitude: 77.512782 }
    ];
    
    const filePath = path.join('C:/Users/Thrishul/Desktop/', 'new_locations.csv');
    
    fs.createReadStream(filePath)
        .pipe(csv(['name', 'latitude', 'longitude']))
        .on('data', (row) => {
            // Convert latitude and longitude to numbers
            row.latitude = parseFloat(row.latitude);
            row.longitude = parseFloat(row.longitude);
    
            storedLocations.push(row);
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            //console.log('Updated storedLocations:', storedLocations);
        })
        .on('error', (err) => {
            console.error('Error reading the CSV file:', err);
        });

    return storedLocations;
}

module.exports={getBadmintonCourts};
