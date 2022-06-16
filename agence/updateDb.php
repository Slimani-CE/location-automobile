<?php
    include "../connexion.php";
    $codeReservation = $_GET["codeReservation"];
    $etatReservation = $_GET["etatReservation"];
    // Mise de l'état de reservation
    if( isset($codeReservation) && isset($etatReservation) ){
        $requet = " UPDATE reservation SET etatReservation = '$etatReservation' WHERE codeReservation = '$codeReservation' ";
        echo $requet;
        $result = mysqli_query($connexion,$requet);
        if(!$result){
            die("Erreur: durant la mise a jours des donnees");
        }else{
            header("Location: dashboard.php?page=gest-reservation&activeSection=activeResSection&id=".$codeReservation);
        }
    }
?>