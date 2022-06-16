<?php
    $dateEntreRetour = $_GET["dateEntreRetour"];
    $etatRetour = $_GET["etatRetour"];
    $codeReservation = $_GET["codeReservation"];
    $etatReservation = "libre";
    include "../connexion.php";
    // Creation et execution de la requete
    $requete = " INSERT INTO retour(dateEntreRetour,etatRetour,codeReservation) values ('$dateEntreRetour','$etatRetour','$codeReservation') ";
    $resultats = mysqli_query($connexion,$requete);
    if( $resultats ){
        // Mise a jour de la table de voiture
        $requete = " UPDATE reservation SET etatReservation = '$etatReservation' WHERE codeReservation = '$codeReservation' ";
        $resultats = mysqli_query($connexion,$requete);
        if(!$resultats){
            die("Erreur: durant la mise a jours des donnees");
        }else{
            header("Location: dashboard.php?page=gest-reservation&activeSection=activeResSection&id=".$codeReservation);
        }
    }
    else{
        die("ERREUR: durant l'ajoute du retour");
    }
?>