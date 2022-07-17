<?php

    include "../connexion.php";
    include "fetching.php";
    session_start();
    if( !isset($_SESSION["emailUtilisateur"]) ){
        header('Location: ../espace-agence.php');
    }
    else{
        $data = array();
        $requetUtilisateur = " SELECT * FROM utilisateur WHERE emailUtilisateur = '".$_SESSION["emailUtilisateur"]."' ";
        $donneesUtilisateur = mysqli_query($connexion,$requetUtilisateur);

        $requetPersonnel = " SELECT * FROM personnel WHERE codePersonnel = ".$_SESSION["codePersonnel"];
        $donneesPersonnel = mysqli_query($connexion,$requetPersonnel);

        $requetAgence = " SELECT * FROM agence WHERE codeAgence = ".$_SESSION["codeAgence"];
        $donneesAgence = mysqli_query($connexion,$requetAgence);
        
        if($donneesUtilisateur && $donneesAgence && $donneesPersonnel){

            // Fetching "utilisateur" table
            $data["utilisateur"] = array();
            while($row = mysqli_fetch_assoc($donneesUtilisateur)){
                $data["utilisateur"] = $row;
            }

            // Fetching "personnel" table
            $data["personnel"] = array();
            while($row = mysqli_fetch_assoc($donneesPersonnel)){
                $data["personnel"] = $row;
            }
            
            // Fetching "agence" table
            $data["agence"] = array();
            while($row = mysqli_fetch_assoc($donneesAgence)){
                $data["agence"] = $row;
            }
            // set up agency logo
            $data["agence"]["logoAgence"] = "data:image/*;base64,".base64_encode($data["agence"]["logoAgence"]) ;
            
            // fetch data
            $data["personnel"]["notification"] = fetchEmplNotif($data["personnel"]["codePersonnel"]);
            $data["agence"]["voiture"] = fetchAgencyCars($data["agence"]["codeAgence"]);
            $data["agence"]["contrat"] = fecthAgencyContracts($data["agence"]["codeAgence"]);
            $data["agence"]["client"] = fecthAgencyClients($data["agence"]["codeAgence"]);
            $data["agence"]["personnel"] = fetchAgencyEmpl($data["agence"]["codeAgence"]);
            
        }
        else{
            die(" Erreur: resultats de selection de données Utiliasteur , agence au personnel ");
        }
        echo json_encode($data);
    }
?>