const { response, urlencoded } = require("express");
const express = require("express");
const https = require("https");

const app = express();
app.use(express.urlencoded({ extended: false }));

const UNITS = "metric";
const APP_ID = "0341a404dfe2ecc284b01d70ba42cddb";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?units=";

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const city = req.body.cityName;
  const url = BASE_URL + UNITS + "&appid=" + APP_ID + "&q=" + city;
  https.get(url, (apiResponse) => {
    apiResponse.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const iconUrl ="http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
      res.write("<h1>The temperature in " + city + " is " + temp + " degrees Celcius</h1>");
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<img src=" + iconUrl + ">");
      res.send();
    });
  });
});

app.listen(3000, (req, res) => {
  console.log("Server has started on port 3000");
});
