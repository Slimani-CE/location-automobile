<?php


$emailClient = $_POST["emailClient"];
$regionClient = $_POST["regionClient"];
$villeClient = $_POST["villeClient"];

$nomClient = $_POST["nomClient"];
$prenomClient = $_POST["prenomClient"];
$dateNaissanceClient = $_POST["dateNaissanceClient"];
$lieuNaissanceClient = "Pas encore definis";
$identiteClient = $_POST["identiteClient"];
$nationaliteClient = $_POST["nationaliteClient"];
$adresseClient = $_POST["adresseClient"];
$numTelClient = $_POST["numTelClient"];
$numPermisClient = $_POST["numPermisClient"];
$typeIdentiteClient = $_POST["typeIdentiteClient"];
$sexeClient = $_POST["sexeClient"];



$ajouteCommand = "INSERT INTO client(nomClient,prenomClient,dateNaissanceClient,lieuNaissanceClient,identiteClient,nationaliteClient,adresseClient,numTelClient,typeIdentiteClient,numPermisClient,emailClient,regionClient,villeClient,sexeClient) 
values ('$nomClient','$prenomClient','$dateNaissanceClient','$lieuNaissanceClient','$identiteClient','$nationaliteClient','$adresseClient','$numTelClient','$typeIdentiteClient','$numPermisClient','$emailClient','$regionClient','$villeClient','$sexeClient')";
echo $ajouteCommand;
$result = mysqli_query($connexion,$ajouteCommand); 
$codeClient = mysqli_insert_id($connexion);
if( !$result ){
    die (" <body>erreur durant l'addition des informations de client</body> ");
}


?>