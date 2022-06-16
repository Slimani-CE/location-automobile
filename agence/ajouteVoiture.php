<?php
    $immatriculationVoiture = $_POST["immatriculationVoiture"];
    $marqueVoiture = $_POST["marqueVoiture"];
    $modelVoiture = $_POST["modelVoiture"];
    $carburantVoiture = $_POST["carburantVoiture"];
    $dateCirculaireVoiture = $_POST["dateCirculaireVoiture"];
    $prixParJourVoiture = $_POST["prixParJourVoiture"];
    $kilometrageVoiture = $_POST["kilometrageVoiture"];
    $imagesVoiture = $_POST["imagesVoiture"];
    $dateVignetteVoiture = $_POST["dateVignetteVoiture"];
    $totalVignetteVoiture = $_POST["totalVignetteVoiture"];
    $alertVignetteVoiture = $_POST["alertVignetteVoiture"];
    $kilometrageVidVoiture = $_POST["kilometrageVidVoiture"];
    include "../connexion.php";
    session_start();
    $commandAjoute = "INSERT INTO voiture(immatriculationVoiture,marqueVoiture,modelVoiture,carburantVoiture,dateCirculaireVoiture,prixParJourVoiture,kilometrageVoiture,imagesVoiture,codeAgence,dateVignetteVoiture,totalVignetteVoiture,alertVignetteVoiture,kilometrageVidVoiture)
    values ('$immatriculationVoiture',
            '$marqueVoiture',
            '$modelVoiture',
            '$carburantVoiture',
            '$dateCirculaireVoiture',
            '$prixParJourVoiture',
            '$kilometrageVoiture',
            '$imagesVoiture',
            ".$_SESSION['codeAgence'].",
            '$dateVignetteVoiture',
            '$totalVignetteVoiture',
            '$alertVignetteVoiture',
            '$kilometrageVidVoiture'
            )";

    $resultExecution = mysqli_query($connexion,$commandAjoute);
    if($resultExecution){
        header('Location: ./dashboard.php?page=gest-voitures');
    }
    else{
        echo "Erreur l'or l'ajoute de la voiture !!!";
    }
?>
