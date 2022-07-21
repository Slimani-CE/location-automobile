<?php

    include "../connexion.php";
    
    $dateDepartReservation = $_POST["dateDepartReservation"];
    $dateRetourReservation = $_POST["dateRetourReservation"];
    $nombreJours = $_POST["nombreJours"];
    $lieuDepartReservation = $_POST["lieuDepartReservation"];
    $lieuRetourReservation = $_POST["lieuRetourReservation"];
    $alertReservation = $_POST["alertReservation"];
    $etatVehicule = $_POST["etatVehicule"];
    $prixParJourVoiture = $_POST["prixParJourVoitureRes"];
    $totalPaiement = $_POST["totalPaiement"];
    $methodePaiement = $_POST["methodePaiement"];
    $avancePaiement = $_POST["avancePaiement"];
    $codePersonnel = $_POST["codePersonnelRes"];
    $codeVoiture = $_POST["codeVoiture"];
    $dateDepartContrat = $dateDepartReservation;
    $dateRetourContrat = $dateRetourReservation;
    $typeClient = $_POST["typeClient"];
    //Changes on some values
    //Remove " MAD" in "totalPaiement"
    $totalPaiement = str_replace(" MAD","",$totalPaiement);
    // If client exists we don't need to axecute ajouteClient.php
    if($typeClient=="null"){
        //Add "client" inforamtions
        include "./ajouteClient.php";
    }
    else{
        $codeClient = $typeClient;
    }
    //Remove foreighn key check
    mysqli_query($connexion,"SET FOREIGN_KEY_CHECKS=0");

    //Add "contrat" informations
    $contratRequest = "INSERT INTO contrat(dateDepartContrat,dateRetourContrat,codePersonnel) 
    values ('$dateDepartContrat','$dateRetourContrat','$codePersonnel')";
    $resultContratRequest = mysqli_query($connexion,$contratRequest);
    $codeContrat = mysqli_insert_id($connexion);

    //Add "reservation" inforamtions
    $reservationRequest = "INSERT INTO reservation(dateDepartReservation,dateRetourReservation,etatReservation,codeClient,codeVoiture,alertReservation,codeContrat) 
    values ('$dateDepartReservation','$dateRetourReservation','loué','$codeClient','$codeVoiture','$alertReservation','$codeContrat')";
    $resultReservationRequest = mysqli_query($connexion,$reservationRequest);
    $codeReservation = mysqli_insert_id($connexion);


    //Add "paiement" inforamtions
    $totalFloat = floatval( $totalPaiement );
    $avanceFloat = floatval( $avancePaiement );
    $etatPaiement = ( $totalFloat - $avanceFloat == 0 )? 'payé' : ( $totalFloat - $avanceFloat < 0 ? "+" : "-" ).abs($totalFloat - $avanceFloat);
    $paiementRequest = "INSERT INTO paiement(totalPaiement,avancePaiement,etatPaiement,methodePaiement,codeReservation) 
    values ('$totalPaiement','$avancePaiement','$etatPaiement','$methodePaiement','$codeReservation')";
    $resultPaiementRequest = mysqli_query($connexion,$paiementRequest);

    if( $resultContratRequest && $resultPaiementRequest && $resultReservationRequest ){
        header('Location: ./dashboard.php?page=reservation');
    }else{
        die("Erreur : erreur durant l'addition des informations de reservation");
    }

?>
