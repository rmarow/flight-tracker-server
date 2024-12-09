const WebSocket = require('ws');
const axios = require('axios');

// WebSocket Server
const wss = new WebSocket.Server({ port: 8080 });
console.log("WebSocket server is running on ws://localhost:8080");

// API Configuration
const API_BASE_URL = 'http://api.aviationstack.com/v1/flights'; 
// will be changing this after presenting
const API_KEY = '5d41ec81685a3d4c37557e26b00acb74'; 

// Fetch Flight Data Function
async function fetchFlightData() {
  try {
    const apiUrl = `${API_BASE_URL}?access_key=${API_KEY}`;
    console.log("Fetching data from:", apiUrl); // Debugging log
    const response = await axios.get(apiUrl);
    console.log("API response received:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching flight data:', error.message);
    return null;
  }
}

// Broadcast Flight Data to Clients
async function broadcastFlightData() {
  const flightData = await fetchFlightData();
  if (flightData) {
    const message = JSON.stringify(flightData);

    // Send the data to all connected clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}

// Set up interval to fetch and broadcast data every 30 seconds - the api source updates every 30-60 seconds
setInterval(broadcastFlightData, 30000);

// Handle Client Connections
wss.on('connection', (ws) => {
  console.log('New client connected');
  ws.send(JSON.stringify({ message: "Welcome to the Flight Tracker!" }));

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

