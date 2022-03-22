var express = require("express");
var router = express.Router();
const { default: axios } = require("axios");
router.get("/clima", (req, res) => {
  var pais = req.query.pais;

  axios
    .get(
      `http://api.weatherstack.com/current?access_key=44814076f6406a609cc6e8395f93ebf0&query=${pais}`
    )
    .then((response) => {
      console.log(response);
      res.send(response.data);
    });
});
router.get("/dolar", (req, res) => {
  axios
    .get("https://www.dolarsi.com/api/api.php?type=dolar")
    .then((response) => {
      let cotizaciones = response.data;
      let result = [];
      for (let i = 0; i < cotizaciones.length; i++) {
        let objAux = {
          ...cotizaciones[i].casa,
          id: i
        };
        result.push(objAux);
        console.log(result);
      }
      res.send(result);
    });
});
router.get("/countriesAll", (req, res) => {
  axios.get("https://restcountries.com/v3.1/all").then((response) => {
    console.log(response);
    res.send(response.data);
  });
});

module.exports = router;
