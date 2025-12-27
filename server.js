const express = require("express");
const https = require("https");
var cors = require("cors");

const app = express();
const nasa_api_key = "hDBqoLGoHv3ONAVjOqFhIUcwDoTmxEPRoG8maWt0";

app.use(cors());

app.get("/apod", (req, res) => {
  const url = "https://api.nasa.gov/planetary/apod?api_key=" + nasa_api_key;
  https
    .get(url, function (response) {
      let data = "";
      response.on("data", function (chunk) {
        data += chunk;
      });
      response.on("end", function () {
        try {
          const json = JSON.parse(data);
          res.json(json);
        } catch (e) {
          res.status(500).json({ error: "Failed to parse APOD response" });
        }
      });
    })
    .on("error", (err) => {
      res.status(500).json({ error: "Error contacting NASA API" });
    });
});

app.get("/known_count", (req, res) => {
  const knownCount = require("./data/known_count.json");
  res.json({ knowncount: knownCount });
});

app.get("/bodies", (req, res) => {
  // Serve the local curated list of solar system bodies
  const bodies = require("./data/bodies.json");
  res.json(bodies);
});

// start the server listening for requests
app.listen(process.env.PORT || 4000, () => console.log("Server is running..."));
