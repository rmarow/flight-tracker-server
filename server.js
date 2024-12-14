const WebSocket = require('ws');
const axios = require('axios');

// Create a WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });
console.log("WebSocket server running on ws://localhost:8080");

// Continental US bounding box (adjust if needed)
const lamin = 24.7433195;   // min latitude
const lamax = 49.3457868;   // max latitude
const lomin = -124.7844079; // min longitude
const lomax = -66.9513812;  // max longitude

// OpenSky API URL with bounding box parameters
const API_URL = `https://opensky-network.org/api/states/all?lamin=${lamin}&lomin=${lomin}&lamax=${lamax}&lomax=${lomax}`;

async function fetchFlightData() {
  try {
    const response = await axios.get(API_URL);
    return response.data; // { time: <number>, states: [ ... ] }
  } catch (error) {
    console.error('Error fetching flight data:', error.message);
    return null;
  }
}

function broadcastData(data) {
  const message = JSON.stringify(data);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// Fetch data every 30 seconds
setInterval(async () => {
  const flightData = await fetchFlightData();
  if (flightData && flightData.states) {
    // flightData.states is an array of arrays representing each flight
    // Each state array element: [icao24, callsign, origin_country, time_position, last_contact, longitude, latitude, ...]
    // We'll map these into a simpler flight object for the client
    const flights = flightData.states.map(state => {
      return {
        icao24: state[0],
        callsign: state[1]?.trim() || "N/A",
        origin_country: state[2],
        longitude: state[5],
        latitude: state[6],
        on_ground: state[8],
        velocity: state[9],
        heading: state[10],
        vertical_rate: state[11]
      };
    });
    broadcastData({ flights });
  }
}, 30000);

wss.on('connection', (ws) => {
  console.log("New client connected");
  ws.send(JSON.stringify({ message: "Welcome to the Flight Tracker!" }));
});

