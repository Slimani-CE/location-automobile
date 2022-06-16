<?php

$nomPersonnel = $_POST["nomPersonnel"];
$prenomPersonnel = $_POST["prenomPersonnel"];
$emailPersonnel = $_POST["emailPersonnel"];
$portablePersonnel = $_POST["portablePersonnel"];
$motDePasseUtilisateur = $_POST["motDePasseUtilisateur"];
$nomAgence = $_POST["nomAgence"];
$adresseAgence = $_POST["adresseAgence"];
$villeAgence = $_POST["villeAgence"];
$paysAgence = $_POST["paysAgence"];

include "connexion.php";


//L'ajoute de l'agence
$ajouterAgence = "INSERT INTO agence(nomAgence,adresseAgence,villeAgence,paysAgence)
values ( '$nomAgence','$adresseAgence','$villeAgence','$paysAgence' )";
$resultAjouterAgence = mysqli_query($connexion,$ajouterAgence);

//L'ajoute de personnel
$ajouterPersonnel = "INSERT INTO personnel(nomPersonnel,prenomPersonnel,servicePersonnel,portablePersonnel,codeAgence)
values ('$nomPersonnel','$prenomPersonnel','administrateur','$portablePersonnel', ".mysqli_insert_id( $connexion )." )";
$resultAjouterPersonnel = mysqli_query($connexion,$ajouterPersonnel);

//L'ajoute d'utilisateur
$ajouterUtilisateur = "INSERT INTO utilisateur(emailUtilisateur,motDePasseUtilisateur,codePersonnel)
values ('$emailPersonnel','$motDePasseUtilisateur',".mysqli_insert_id( $connexion ).")";
$resultAjouterUtilisateur = mysqli_query($connexion,$ajouterUtilisateur);

//Verification de l'ajoute
if( $resultAjouterAgence && $resultAjouterPersonnel && $resultAjouterUtilisateur ){
    include "./popup-message.html";
    session_start();
    $_SESSION["emailUtilisateur"] = $emailPersonnel;
    header('Location: ./agence/dashboard.php?page=reservation');
    exit;
}else{
    echo "Erreur durant L'ajoute des informations !!!";
}

?>
  