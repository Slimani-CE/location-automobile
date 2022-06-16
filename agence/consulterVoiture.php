<?php 

    session_start();
    if( !isset($_SESSION["emailUtilisateur"]) ){
        header('Location: ../espace-agence.php');
    }
    else{
        echo "Consultation pour la voiture N° ".$_GET["codeVoiture"];
    }
?>