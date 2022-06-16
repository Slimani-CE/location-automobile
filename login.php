<?php

use LDAP\Result;

    $emailUtilisateur = $_POST["emailUtilisateur"];
    $motDePasseUtilisateur = $_POST["motDePasseUtilisateur"];

    include "./connexion.php";

    $login = "SELECT * FROM utilisateur WHERE motDePasseUtilisateur = '$motDePasseUtilisateur' AND emailUtilisateur = '$emailUtilisateur'" ;

    $result =  mysqli_query( $connexion , $login );
    $count  = mysqli_num_rows($result);
    if( $count == 1 ){

        session_start();
        $_SESSION["emailUtilisateur"] = $emailUtilisateur;
        header('Location: ./agence/dashboard.php?page=reservation');
    }
    else echo "Please Try Again";
?>