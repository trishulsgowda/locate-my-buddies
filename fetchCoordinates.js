function haversine(lat1, lon1, lat2, lon2){
    const toRadians = (degree) => (degree * Math.PI) / 180;
  
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
  
    return distance;
  };
  
  function filterCoordinatesWithinRadius(centerLat, centerLon, radiusKm = 5, storedLocations){

    const coordinates = [
        { lat: 13.069154, lng: 77.502401, label: 'Zeal' },
        { lat: 13.075919, lng: 77.502534, label: 'Chikkabanavara Shuttle' },
        { lat: 13.063985, lng: 77.504116, label: 'Ace Arena' },
        { lat: 13.047308, lng: 77.502410, label: 'Accolades' },
        { lat: 13.042793, lng: 77.502002, label: 'Anjanadri' },
        { lat: 13.081337, lng: 77.511018, label: 'Game Point' },
        { lat: 13.046357, lng: 77.512782, label: 'Golden Sports' }
    ];

    return storedLocations.filter(coord => {
      //const [lat, lon] = coord;
      const distance = haversine(centerLat, centerLon, coord.latitude, coord.longitude);
      //console.log(coord.label +" is at a distance of " + distance);
      return distance <= radiusKm;
    });
  };

module.exports = {filterCoordinatesWithinRadius};

  