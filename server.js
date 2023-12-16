const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const app = express();
var DOMParser = require('xmldom').DOMParser;

const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/register', (req, res) => {
    const { fname, lname, tckimlik, birthYear } = req.body;

    console.log(fname, lname, tckimlik, birthYear);
    
    const xmlBody = `<?xml version="1.0" encoding="utf-8"?>
  <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
    <soap12:Body>
      <TCKimlikNoDogrula xmlns="http://tckimlik.nvi.gov.tr/WS">
        <TCKimlikNo>${tckimlik}</TCKimlikNo>
        <Ad>${fname}</Ad>
        <Soyad>${lname}</Soyad>
        <DogumYili>${birthYear}</DogumYili>
      </TCKimlikNoDogrula>
    </soap12:Body>
  </soap12:Envelope>
`;

axios.post('https://tckimlik.nvi.gov.tr/Service/KPSPublic.asmx', xmlBody, {
  headers: {
    'Content-Type': 'application/soap+xml; charset=utf-8',
  },
})
  .then(response => {
    var xmlString = response.data;
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlString, 'text/xml');

    var resultNode = xmlDoc.getElementsByTagName('TCKimlikNoDogrulaResult')[0];
    var result = resultNode.textContent;

    console.log(result);
    
  })
    
})


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});