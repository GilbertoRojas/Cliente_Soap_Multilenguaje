const express = require('express');
const soap = require('soap');
const app = express();

const wsdlUrl = 'https://www.dataaccess.com/webservicesserver/NumberConversion.wso?WSDL';

app.get('/', (req, res) => {
    const numero = parseInt(req.query.numero);
    if (!numero) return res.send("<h1>Agrega ?numero=150 a la URL.</h1>");

    soap.createClient(wsdlUrl, (err, client) => {
        if (err) return res.status(500).send("Error SOAP: " + err);
        
        // Pasamos el parámetro 'ubiNum' que pide el WSDL
        client.NumberToWords({ ubiNum: numero }, (err, result) => {
            if (err) return res.status(500).send("Error de servicio: " + err);
            
            res.send(`
                <h1>NodeJS - Punto 1: Consumo Básico</h1>
                <p>Número ingresado: ${numero}</p>
                <p>Resultado SOAP (Inglés): ${result.NumberToWordsResult}</p>
            `);
        });
    });
});

// Este archivo usará el puerto 3001
app.listen(3001, () => console.log('Servidor corriendo en http://localhost:3001'));