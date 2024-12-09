const WebSocket = require('ws');
const axios = require('axios');

// WebSocket Server
const wss = new WebSocket.Server({ port: 8080 });
console.log("WebSocket server is running on ws://localhost:8080");

// API Configuration
// will be changing this after presenting
const API_KEY = '5d41ec81685a3d4c37557e26b00acb74'; 
const API_URL = `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&arr_iata=JFK`;
// const API_BASE_URL = 'http://api.aviationstack.com/v1/flights'; 

// Fetch Flight Data Function
async function fetchFilteredFlights() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching filtered flight data:', error.message);
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

// Set up interval to fetch and broadcast data every 30 seconds - the api source updates every 30-60 seconds
setInterval(async () => {
  const flightData = await fetchFilteredFlights();
  if (flightData) {
    broadcastData(flightData);
  }
}, 30000);

wss.on('connection', (ws) => {
  console.log("New client connected");
  ws.send(JSON.stringify({ message: "Welcome to the Flight Tracker!" }));
});
