<?php
require_once 'vendor/autoload.php';
use Stichoza\GoogleTranslate\GoogleTranslate;

$numero = isset($_GET['numero']) ? (int)$_GET['numero'] : 0;

if ($numero > 0) {
    $wsdl = "https://www.dataaccess.com/webservicesserver/NumberConversion.wso?WSDL";
    
    try {
        $cliente = new SoapClient($wsdl);
        $resultado = $cliente->NumberToWords(array('ubiNum' => $numero));
        $textoIngles = $resultado->NumberToWordsResult;
        
        // 2. Traducir el resultado
        $traductor = new GoogleTranslate('es', 'en'); // Traducir a Español, desde Inglés
        $textoEspanol = $traductor->translate($textoIngles);
        
        echo "<h1>Punto 2: Consumo SOAP + Traducción</h1>";
        echo "Número: " . $numero . "<br>";
        echo "Original (Inglés): " . $textoIngles . "<br>";
        echo "Traducido (Español): " . $textoEspanol;
        
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    }
} else {
    echo "Agrega ?numero=500 a la URL.";
}
?>