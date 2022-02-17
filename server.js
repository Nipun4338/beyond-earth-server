const express=require("express");
const https=require("https");
var cors = require('cors')
//const bodyparser=require("body-parser");
const app=express();
const nasa_api_key="hDBqoLGoHv3ONAVjOqFhIUcwDoTmxEPRoG8maWt0";

app.use(cors())

app.get("/apod", (req, res) => {
    const url="https://api.nasa.gov/planetary/apod?api_key="+nasa_api_key;
    https.get(url, function(response){
        response.on("data", function(data){
            /*var json=JSON.parse(data);
            console.log(json);
            res.json(json);*/
            res.send(data);
        })
    });
  });

  app.get("/known_count", (req, res) => {
    const url="https://api.le-systeme-solaire.net/rest/knowncount/";
    https.get(url, function(response){
        response.on("data", function(data){
            /*const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
            console.log('Status Code:', res.statusCode);
            console.log('Date in Response header:', headerDate);
            var json=JSON.parse(data);
            console.log(json);
            res.json(json);*/
            res.send(data);
        })
    });
  });

  app.get("/bodies", (req, res) => {
    const url="http://localhost:4000/bodies/";
    https.get(url, function(response){
        response.on("data", function(data){
            /*const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
            console.log('Status Code:', res.statusCode);
            console.log('Date in Response header:', headerDate);
            var json=JSON.parse(data);
            console.log(json);
            res.json(json);*/
            
            res.send(data);
        })
    });
  });

// start the server listening for requests
app.listen(process.env.PORT || 4000, 
	() => console.log("Server is running..."));