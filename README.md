# Real-Time Flight Visualization with p5.js and OpenSky Network

This project provides a real-time visualization of airborne aircraft over a specified region (in this case, the continental United States) using the [OpenSky Network API](https://opensky-network.org/) and a [p5.js](https://p5js.org/) client.

**Demo Sketch**:  
[View the p5.js sketch here](https://editor.p5js.org/rmarow/sketches/Bfp2tuaQx)

**Note:** This project previously used the AviationStack API. Due to rate limits and request limits, I’ve switched to the OpenSky Network API, which provides real-time ADS-B data without requiring an API key. The data is less flight-detail oriented (no direct flight numbers or scheduled times) but suitable for visualizing planes currently in the air.

## Features

- **Real-Time ADS-B Data**: Fetches live aircraft states (positions, callsigns, headings) using OpenSky’s free API.
- **WebSocket Data Streaming**: A Node.js server requests data periodically and broadcasts it to all connected clients in real-time.
- **Map-Based Visualization**: The p5.js client displays a map background and plots aircraft as symbols at their current positions.
- **No API Key Required**: The OpenSky Network API endpoint used here doesn’t need an API key, avoiding rate-limit issues from previous APIs.

## How It Works

1. **OpenSky API**  
   The Node.js server queries OpenSky’s `/states/all` endpoint for all aircraft within a specified latitude/longitude bounding box.

2. **WebSocket Server**  
   The server (in `server.js`) runs on `ws://localhost:8080` by default. It periodically fetches data from OpenSky and broadcasts the results to any connected p5.js clients.

3. **p5.js Client**  
   The p5.js sketch connects to the WebSocket server. When new data arrives, it updates the displayed aircraft positions on a map. Each aircraft is represented by a simple icon, and its callsign is shown as a label.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed.

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/rmarow/flight-tracker-server.git
   cd flight-tracker-server

2. **Install Dependencies:**
   ```bash
   npm install
   

3. **Run the Server:**
   ```bash
   node server.js
   
4. **Open the p5.js Sketch:**
  * Go to the p5.js sketch link.
  * Click the play button (►) to run the sketch.
  * The sketch will connect to the WebSocket server and display the flights it receives.

## Customization

* **Changing Region:**
  In `server.js`, adjust the bounding box coordinates in the `API_URL` for OpenSky. By default, it uses a large bounding box that roughly covers the continental US.

* **Differeent Map Image:**
 In `sketch.js`, replace `mapImg` with a map image of your choice. Just update the `loadImage()` URL in `preload()`.


## Troubleshooting  

* **WebSocket Connection Errors:**
Ensure the server is running and that the URL in `sketch.js` matches the server’s URL and port.

* **No Aircraft Shown:**
The OpenSky API might return no data if the chosen bounding box is empty or if there’s a temporary issue. Try adjusting the bounding box or waiting for the next update.

* **Rate Limits/Empty Responses:**
OpenSky has usage limits. If you encounter issues, try increasing the interval between requests in `server.js`.

## Contributing  

Contributions are welcome! Submit pull requests or open issues to suggest improvements or report bugs.

## License
This project is licensed under the MIT License.

