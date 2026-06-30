<?php
// Recibir número por URL, ej: http://localhost/PHP/clisoap1.php?numero=500
$numero = isset($_GET['numero']) ? (int)$_GET['numero'] : 0;

if ($numero > 0) {
    // 1. Consumir el servicio SOAP
    $wsdl = "https://www.dataaccess.com/webservicesserver/NumberConversion.wso?WSDL";
    $opciones = array('exceptions' => true);
    
    try {
        $cliente = new SoapClient($wsdl, $opciones);
        // El parámetro que pide el WSDL se llama 'ubiNum'
        $resultado = $cliente->NumberToWords(array('ubiNum' => $numero));
        
        echo "<h1>Punto 1: Consumo SOAP Básico</h1>";
        echo "Número ingresado: " . $numero . "<br>";
        echo "Resultado en Inglés: " . $resultado->NumberToWordsResult;
        
    } catch (SoapFault $e) {
        echo "Error SOAP: " . $e->getMessage();
    }
} else {
    echo "Por favor, ingresa un número en la URL. Ejemplo: ?numero=500";
}
?>