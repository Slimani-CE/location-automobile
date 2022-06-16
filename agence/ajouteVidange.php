<?php
    $dateVidange = $_GET["dateVidange"];
    $codeVoiture = $_GET["codeVoiture"];
    $dureeVidange = $_GET["dureeVidange"];
    $dureeActuelVidange = $_GET["dureeActuelVidange"];
    $prixVidange = $_GET["prixVidange"];
    $alertVidange = $_GET["alertVidange"];

    // Creation et execution de la requete
    include "../connexion.php";
    $requete = " INSERT INTO vidange(dateVidange,dureeVidange,dureeActuelVidange,prixVidange,alertVidange,codeVoiture)values('$dateVidange','$dureeVidange','$dureeActuelVidange','$prixVidange','$alertVidange','$codeVoiture')";
    // echo $requete;
    $resultats = mysqli_query($connexion,$requete);
    if($resultats){
        echo "<script>window.close()</script>";
    }
    else{
        die("ERREUR: durant l'addition du vidange");
    }
?> 