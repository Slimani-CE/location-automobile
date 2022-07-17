<?php

// Fetching "Employes" table for our agency
function fetchAgencyEmpl($codeAgence){
    include "../connexion.php";
    $requetEmployes = " SELECT * FROM personnel NATURAL JOIN utilisateur WHERE codeAgence = ".$codeAgence;
    $donneesEmployes = mysqli_query($connexion,$requetEmployes);

    $data = array();
    if($donneesEmployes){
        $i = 0;
        $data["list"]=array();
        while($row = mysqli_fetch_assoc($donneesEmployes)){
            $data["list"][$i] = $row;
            $data[$row["codePersonnel"]] = &$data["list"][$i++];
        }
        return $data;
    }
    die(" Erreur: resultats de selection de données des Personnels");
}
// Fetching "Notifications" table for our "personnel"
function fetchEmplNotif($codePersonnel){
    include "../connexion.php";
    $requetNotif = " SELECT * FROM notification WHERE codePersonnel = ".$codePersonnel;
    $donneesNotif = mysqli_query($connexion,$requetNotif);

    $data = array();
    if($donneesNotif){
        $i = 0;
        $data["list"]=array();
        while($row = mysqli_fetch_assoc($donneesNotif)){
            $data["list"][$i] = $row;
            $data[$row["codeNotification"]] = &$data["list"][$i++];
        }
        return $data;
    }
    die(" Erreur: resultats de selection des notifications");
}

// Fetching "voiture" table for our agency
function fetchAgencyCars($codeAgence){
    include "../connexion.php";
    $requetVoiture = " SELECT * FROM voiture WHERE codeAgence = ".$codeAgence;
    $donneesVoiture = mysqli_query($connexion,$requetVoiture);

    $data = array();
    if($donneesVoiture){
        $i = 0;
        $data["list"]=array();

        while($row = mysqli_fetch_assoc($donneesVoiture)){
            $row["imagesVoiture"] = "data:image/*;base64,".base64_encode($row["imagesVoiture"]) ;
            // echo $row["imagesVoiture"] ;
            // $row["imagesVoiture"] = "<img width='300px' src='../media/images/logo.png'>" ;
            // echo "<img width='300px' src='data:image/*;base64,".base64_encode($row["imagesVoiture"])."'>" ;
            $data["list"][$i] = $row;
            // $data["list"][$i]["imagesVoiture"] = base64_encode($row["imagesVoiture"]);
            $data[$row["codeVoiture"]] = &$data["list"][$i];
            $data["list"][$i]["reservation"] = fetchCarReservations($row["codeVoiture"]);
            $data["list"][$i++]["vidange"] = fetchCarVidange($row["codeVoiture"]);
        }
        return $data;
    }
    die(" Erreur: resultats de selection de données des voitures");
}
// Fetching "reservation" table for each car
function fetchCarReservations($codeVoiture){
    include "../connexion.php";
    $requetReservation = " SELECT * FROM reservation WHERE codeVoiture = ".$codeVoiture;
    $donneesReservation = mysqli_query($connexion,$requetReservation);
    $data = array();
    $i = 0;
    if($donneesReservation){
        $data["list"]=array();
        while($row = mysqli_fetch_assoc($donneesReservation)){
            $data["list"][$i] = $row;
            $data[$row["codeReservation"]] = &$data["list"][$i];
            $data["list"][$i++]["paiement"] = fetchReservationPayment($row["codeReservation"]);
        }
        // echo "{length:";
        // echo "<h1 style=\"color:tomato;\">".sizeof($data["list"])."</h1>";
        // echo "}";
        return $data;
    }
    die(" Erreur: resultats de selection de données des voitures");
}
// Fetching "Vidange" table for each car
function fetchCarVidange($codeVoiture){
    include "../connexion.php";
    $requetVidange = " SELECT * FROM vidange WHERE codeVoiture = ".$codeVoiture;
    $donneesVidange = mysqli_query($connexion,$requetVidange);
    $data = array();
    $i = 0;
    if($donneesVidange){
        $data["list"]=array();
        while($row = mysqli_fetch_assoc($donneesVidange)){
            $data["list"][$i] = $row;
            $data[$row["codeVidange"]] = &$data["list"][$i++];
        }
        return $data;
    }
    die(" Erreur: resultats de selection de données des voitures");
}


// Fetching "paiement" table for each "reservation"
function fetchReservationPayment($codeReservation){
    include "../connexion.php";
    $requetPayment = " SELECT * FROM paiement WHERE codeReservation = ".$codeReservation;
    $donneesPayment = mysqli_query($connexion,$requetPayment);
    $data = array();
    $i = 0;
    if($donneesPayment){
        $data["list"]=array();
        while($row = mysqli_fetch_assoc($donneesPayment)){
            $data["list"][$i] = $row;
            $data[$row["codePaiement"]] = &$data["list"][$i++];
        }
        // echo "{length:";
        // echo "<h1 style=\"color:tomato;\">".sizeof($data["list"])."</h1>";
        // echo "}";
        return $data;
    }
    die(" Erreur: resultats de selection de données des voitures");
}
// Fetching "contrat" table for each "reservation"
function fecthAgencyContracts($codeAgence){
    include "../connexion.php";
    $requetContrat = " SELECT * FROM contrat WHERE EXISTS (SELECT * FROM personnel WHERE contrat.codePersonnel = personnel.codePersonnel AND personnel.codeAgence = ".$codeAgence." ) ";
    $donneesContrat = mysqli_query($connexion,$requetContrat);
    $i = 0;
    if($donneesContrat){
        $data["list"]=array();
        while($row = mysqli_fetch_assoc($donneesContrat)){
            $data["list"][$i] = $row;
            $data[$row["codeContrat"]] = &$data["list"][$i++];
        }
        return $data;
    }
    die(" Erreur: resultats de selection de données des voitures");
}
// Fetching "client" table for each "reservation"
function fecthAgencyClients($codeAgence){
    include "../connexion.php";
    $requetClient = " SELECT * FROM client WHERE EXISTS ( SELECT * FROM reservation WHERE client.codeClient = reservation.codeClient AND EXISTS ( SELECT * FROM voiture WHERE reservation.codeVoiture = voiture.codeVoiture AND voiture.codeAgence = ".$codeAgence." ) ) ";
    $donneesClient = mysqli_query($connexion,$requetClient);
    $i = 0;
    if($donneesClient){
        $data["list"]=array();
        while($row = mysqli_fetch_assoc($donneesClient)){
            $data["list"][$i] = $row;
            $data[$row["codeClient"]] = &$data["list"][$i++];
        }
        return $data;
    }
    die(" Erreur: resultats de selection de données des voitures");
}



?>