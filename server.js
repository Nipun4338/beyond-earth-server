const express=require("express");
const https=require("https");
//const bodyparser=require("body-parser");
const app=express();
const nasa_api_key="hDBqoLGoHv3ONAVjOqFhIUcwDoTmxEPRoG8maWt0";

app.get("/apod", (req, res) => {
    const url="https://api.nasa.gov/planetary/apod?api_key="+nasa_api_key;
    https.get(url, function(response){
        response.on("data", function(data){
            console.log(data);
            res.send(data);
        })
    });
  });

  app.get("/eonet_events", (req, res) => {
    const url="https://eonet.sci.gsfc.nasa.gov/api/v3/events?days=30";
    https.get(url, function(response){
        response.on("data", function(data){
            console.log(res.json(data));
            res.send(data);
        })
    });
  });

app.listen(port, () => {
    console.log(`listening at${port}`)
})