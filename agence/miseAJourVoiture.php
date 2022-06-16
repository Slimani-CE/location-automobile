<?php

    $codeVoiture = $_GET["codeVoiture"];
    $marqueVoiture = $_GET["marqueVoiture"];
    $modelVoiture = $_GET["modelVoiture"];
    $dateCirculaireVoiture = $_GET["dateCirculaireVoiture"];
    $kilometrageVoiture = $_GET["kilometrageVoiture"];
    $carburantVoiture = $_GET["carburantVoiture"];
    $prixParJourVoiture = $_GET["prixParJourVoiture"];

    //Creation et execution de la requete
    include "../connexion.php";
    $requete = " UPDATE voiture SET marqueVoiture = '$marqueVoiture' , modelVoiture = '$modelVoiture' , dateCirculaireVoiture = '$dateCirculaireVoiture' , kilometrageVoiture = '$kilometrageVoiture' , carburantVoiture = '$carburantVoiture' , prixParJourVoiture = '$prixParJourVoiture' WHERE codeVoiture = '$codeVoiture' ";
    echo $requete;
    $resultat = mysqli_query($connexion,$requete);
    if($resultat){
        header("Location: dashboard.php?page=gest-voitures&activeSection=activeVoSection&id=".$codeVoiture);
    }
    else{
        echo "Erreur: durant la modification des donnees de voiture";
    }
?>






 