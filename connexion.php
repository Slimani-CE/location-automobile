<?php

$connexion = mysqli_connect("localhost","root","") or die("Error: can't connect to server");
$db = mysqli_select_db($connexion,"bdd-location") or die("Error: can't connect to db");

?>

