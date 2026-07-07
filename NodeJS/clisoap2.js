const express = require('express');
const soap = require('soap');
const translate = require('translate-google');
const app = express();

const wsdlUrl = 'https://www.dataaccess.com/webservicesserver/NumberConversion.wso?WSDL';

app.get('/', (req, res) => {
    const numero = parseInt(req.query.numero);
    if (!numero) return res.send("<h1>Agrega ?numero=150 a la URL.</h1>");

    soap.createClient(wsdlUrl, (err, client) => {
        if (err) return res.status(500).send(err);
        
        client.NumberToWords({ ubiNum: numero }, async (err, result) => {
            if (err) return res.status(500).send(err);
            
            const textoIngles = result.NumberToWordsResult.trim();
            
            try {
                // Traducir el texto de inglés a español
                const textoEspanol = await translate(textoIngles, {to: 'es'});
                
                res.send(`
                    <h1>NodeJS - Punto 2: Traducción</h1>
                    <p>Número original: ${numero}</p>
                    <p>Original (Inglés): ${textoIngles}</p>
                    <p>Traducido (Español): ${textoEspanol}</p>
                `);
            } catch (error) {
                res.status(500).send("Error de traducción: " + error);
            }
        });
    });
});

// Este archivo usará el puerto 3002
app.listen(3002, () => console.log('Servidor corriendo en http://localhost:3002'));