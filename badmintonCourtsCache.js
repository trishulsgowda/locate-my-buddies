const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

function getBadmintonCourts(){

    let storedLocations = [];
 
    // Resolve the public directory path
    const publicDir = path.resolve(__dirname, 'public');
    const filePath = path.join(publicDir, 'new_locations.csv');
    
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
