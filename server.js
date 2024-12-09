const WebSocket = require('ws');
const axios = require('axios');

// WebSocket Server
const wss = new WebSocket.Server({ port: 8080 });
console.log("WebSocket server is running on ws://localhost:8080");

// API Configuration
const API_URL = 'YOUR_API_ENDPOINT_HERE'; // Replace with your flight API endpoint
const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your API key

// Fetch Flight Data Function
async function fetchFlightData() {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${API_KEY}` // Use the required header format for your API
      }
    });
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

