# Real-Time Flight Visualization with p5.js and AviationStack

This project visualizes live (or regularly updated) flight data using [p5.js](https://p5js.org/) and a WebSocket server. By integrating with the [AviationStack API](https://aviationstack.com/), the application fetches flight information and displays it dynamically in a browser. The server retrieves the data and broadcasts it over WebSockets, allowing the p5.js client to show current flight details without manual refreshing.

**Demo Sketch**:  
[View the p5.js sketch here](https://editor.p5js.org/rmarow/sketches/Bfp2tuaQx)

## Features

- **Real-Time Data Updates:** Uses a Node.js WebSocket server to periodically fetch new flight data and send it to clients instantly.
- **AviationStack API Integration:** Leverages flight data, including departure/arrival airports, flight numbers, and times.
- **Flexible Filtering:** Adjust your server query parameters to narrow down the flights you want to display (e.g., by arrival airport).
- **Dynamic Visualization:** The p5.js sketch updates the canvas based on the latest data, filtering and visualizing flights as they arrive.

## How It Works

1. **AviationStack API:**  
   The server requests flight information from the AviationStack API at regular intervals. You can specify parameters such as `arr_iata=JFK` or `dep_iata=DEN` to filter data by airport, as well as `flight_status` to get currently active flights.

2. **WebSocket Server:**  
   A Node.js WebSocket server (`server.js`) handles incoming data from AviationStack. After fetching the data, it broadcasts it to all connected p5.js clients.

3. **p5.js Client:**  
   The p5.js sketch connects to the WebSocket server and listens for new data. When new flight information arrives, the sketch processes and displays it on the canvas, adjusting visuals in real-time.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed.
- A valid [AviationStack API key](https://aviationstack.com/).

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/rmarow/flight-tracker-server.git
   cd flight-tracker-server

2. **Install Dependencies:**
   ```bash
   npm install
   
3. **Configure Your API Key: Open server.js and add your AviationStack API key. For example:**

```javascript
const API_KEY = 'YOUR_API_KEY'; 
const API_URL = `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&arr_iata=JFK`;
```

Adjust the API_URL as needed to filter flights.

4. **Run the Server:**
   ```bash
   node server.js
   
5. **Open the p5.js Sketch:**
  * Go to the p5.js sketch link.
  * Click the play button (►) to run the sketch.
  * The sketch will connect to the WebSocket server and display the flights it receives.

## Customization

* **Changing Airports:**
  To show a different airport’s arrivals, update the URL in   `server.js` (for example, `&arr_iata=DEN`).

* **Filtering by Time or Status:**
  After confirming the data structure from the API, you can filter flights in `server.js` before broadcasting them. This ensures the client only receives relevant data.

* **Adjusting Refresh Intervals:**
  In server.js, change the setInterval duration to fetch data more or less frequently.

## Troubleshooting  

* **No Data on Screen:**
If the p5.js sketch shows no flights, check the browser console logs. It’s possible that the API is returning no flights matching your filters. Try changing airports or removing filters.

* **Invalid URL or API Key Errors:**
Ensure you have a correct API key and a valid AviationStack endpoint. Test the URL in your browser or Postman.

## Contributing  

Contributions are welcome! Submit pull requests or open issues to suggest improvements or report bugs.

## License
This project is licensed under the MIT License.

