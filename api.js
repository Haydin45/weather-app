const PORT = 8000;
const express = require("express");
const cors = require("cors");
const axios = require("axios").default;
require("dotenv").config();

const app = express();
app.use(cors());

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

let endpoint, data;
const url = "https://api.openweathermap.org/";

const getData = async (url, endpoint, res) => {
  let response;

  try {
    response = await axios.get(url + endpoint);

    res.send(response.data);
  } catch (error) {
    res.sendStatus(400);
  }
};

app.get("/forecast", async (req, res) => {
  endpoint = `data/2.5/onecall?lat=${req.query.lat}&lon=${req.query.lon}&exclude=${req.query.exclude}&appid=${process.env.REACT_APP_API_KEY}&units=${req.query.units}`;

  getData(url, endpoint, res);
});

app.get("/coordinates", async (req, res) => {
  endpoint = `geo/1.0/direct?q=${req.query.city}&limit=1&appid=${process.env.REACT_APP_API_KEY}`;

  getData(url, endpoint, res);
});
