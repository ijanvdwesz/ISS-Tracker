let map;
let marker;

// Initializes Google Map
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: { lat: 0, lng: 0 }, // Defaults center
  });
  marker = new google.maps.Marker({
    map: map,
  });
}

// Async function that fetches ISS location data
const fetchISSLocation = async () => {
  try {
    const response = await fetch("https://cors-anywhere.herokuapp.com/http://api.open-notify.org/iss-now.json");
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.message === "success") {
      // Extracts data and updates the DOM
      const { latitude, longitude } = data.iss_position;
      const timestamp = new Date(data.timestamp * 1000).toLocaleString(); // Converts UNIX time to readable format
      
      document.getElementById('latitude').textContent = latitude;
      document.getElementById('longitude').textContent = longitude;
      document.getElementById('timestamp').textContent = timestamp;

      // Updates the marker position on the map
      const position = new google.maps.LatLng(latitude, longitude);
      marker.setPosition(position);
      map.setCenter(position);
    } else {
      console.error("Failed to fetch ISS location.");
    }
  } catch (error) {
    console.error("Error fetching ISS location:", error);
  }
};

// Initial fetch when the page loads
fetchISSLocation();

// Adds event listener for the refresh button
document.getElementById('refresh').addEventListener('click', fetchISSLocation);