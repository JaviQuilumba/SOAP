const express = require('express');
const soapService = require('./src/soapService');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3001;

app.use(cors({
    origin: 'http://localhost:3000'
}));

const wsdl = fs.readFileSync('src/movieService.wsdl', 'utf8');
app.use(express.json());
app.use(express.text({ type: 'application/xml' }));
app.use('/xml', soapService);


app.listen(port, () => {
    console.log(` http://localhost:${port}`);
});