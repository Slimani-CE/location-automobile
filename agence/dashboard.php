<?php

    //Session contient
    /*
        [table utilisateur]
        emailUtilisateur
        motDePasseUtilisateur
        codePersonnel

        [table personnel]
        nomPersonnel
        prenomPersonnel
        NCNSSPersonnel
        servicePersonnel
        dateEntrePersonnel
        salairePersonnel
        portablePersonnel
        codeAgence

        [table agence]
        codeAgence
        nomAgence
        adresseAgence
        villeAgence
        teleFixAgence
        iceAgence
        paysAgence
    */

    session_start();
    if( !isset($_SESSION["emailUtilisateur"]) ){
        header('Location: ../espace-agence.php');
    }
    else{
        include "../connexion.php";
        $emailUtilisateur = $_SESSION["emailUtilisateur"];
        $requetUtilisateur = " SELECT * FROM utilisateur WHERE emailUtilisateur = '$emailUtilisateur'";

        $donneesUtilisateur = mysqli_query($connexion,$requetUtilisateur);
        if( $donneesUtilisateur ){
            $table = mysqli_fetch_array($donneesUtilisateur);

            $_SESSION["motDePasseUtilisateur"] = $table["motDePasseUtilisateur"];
            $_SESSION["codePersonnel"] = $table["codePersonnel"];

            $requetPersonnel = " SELECT * FROM personnel WHERE codePersonnel = ".$_SESSION["codePersonnel"];

            $donneesPersonnel = mysqli_query($connexion,$requetPersonnel);
            if( $donneesPersonnel ){
                $tabDonnees = mysqli_fetch_array($donneesPersonnel);

                $_SESSION["nomPersonnel"] = $tabDonnees["nomPersonnel"];
                $_SESSION["prenomPersonnel"] = $tabDonnees["prenomPersonnel"];
                $_SESSION["NCNSSPersonnel"] = $tabDonnees["NCNSSPersonnel"];
                $_SESSION["servicePersonnel"] = $tabDonnees["servicePersonnel"];
                $_SESSION["dateEntrePersonnel"] = $tabDonnees["dateEntrePersonnel"];
                $_SESSION["salairePersonnel"] = $tabDonnees["salairePersonnel"];
                $_SESSION["portablePersonnel"] = $tabDonnees["portablePersonnel"];
                $_SESSION["codeAgence"] = $tabDonnees["codeAgence"];

                $requetAgence = " SELECT * FROM agence WHERE codeAgence = ".$_SESSION["codeAgence"];
                $donneesAgence = mysqli_query($connexion,$requetAgence);
                $tabDonnees = mysqli_fetch_array($donneesAgence);
                $_SESSION["nomAgence"] = $tabDonnees["nomAgence"];
                $_SESSION["adresseAgence"] = $tabDonnees["adresseAgence"];
                $_SESSION["villeAgence"] = $tabDonnees["villeAgence"];
                $_SESSION["teleFixAgence"] = $tabDonnees["teleFixAgence"];
                $_SESSION["iceAgence"] = $tabDonnees["iceAgence"];
                $_SESSION["paysAgence"] = $tabDonnees["paysAgence"];

            }
        }
        else{
            echo " Erreur: resultats de selection ";
        }

    }
?>


<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- <link rel="stylesheet" href="../fontawesome-free-6.1.0-web/css/all.css"> -->
    <link rel="shortcut icon" href="../Media/Images/logo.png" type="image/x-icon">
    <link rel="stylesheet" href="../Style/font.css">
    <link rel="stylesheet" href="../Style/updates.css">
    <link rel="stylesheet" href="../Style/dashboard.css">
    <link rel="stylesheet" href="../Style/reservation.css">
    <link rel="stylesheet" href="../Style/gestion-clients.css">
    <link rel="stylesheet" href="../Style/gestion-reservations.css">
    <link rel="stylesheet" href="../Style/gestion-voitures.css">
    <link rel="stylesheet" href="../Style/pageConsultation.css">
    
    <script src="../Script/database.js"></script>
    <script src="../Script/updates.js"></script>
    <script src="../Script/dashboard.js"></script>
    <script src="../Script/popups.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js" integrity="sha512-QSkVNOCYLtj73J4hbmVoOV6KVZuMluZlioC+trLpewV8qMjsWqlIQvkn1KGX2StWvPMdWGBqim1xlC8krl1EKQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <!-- <script src="../Script/popupMessage.js"></script> -->
    <script src="../Script/gestionVoiture.js"></script>
    <script src="../Script/gestionClient.js"></script>
    <script src="../Script/gestionReservation.js"></script>
    <title> Home page </title>
</head>
<body onload="checkMainData();tableWaiter();">
    



    
    <!-- section des mises -->
    <!-- <?php
        echo "<style>";
        include "../style/updates.css";
        echo "</style>";
        include "../updates.html";
    ?> -->
    <!--                   -->

    <div class="bg-layer"></div>

    <div class="container">

        <div class="dashboard-panel">

            <div class="panel-header">
                <span>Dashboard</span>
            </div>

            <div class="panel-body">
                <a href="dashboard.php?page=reservation">
                    <div data-id="reservation" class="panel-item">
                        <span>Réservation rapide</span>
                    </div>
                </a>

                <a href="dashboard.php?page=gest-employes">
                    <div data-id="gest-employes" class="panel-item">
                        <span>Gestion des employés</span>
                    </div>
                </a>

                <a href="dashboard.php?page=gest-clients">
                    <div data-id="gest-clients" class="panel-item">
                        <span>Gestion des clients</span>
                    </div>
                </a>

                <a href="dashboard.php?page=gest-voitures">
                    <div data-id="gest-voitures" class="panel-item">
                        <span>Gestion des voitures</span>
                    </div>
                </a>

                <a href="dashboard.php?page=gest-reservation">
                    <div data-id="gest-reservation" class="panel-item">
                        <span>Gestion de réservation</span>
                    </div>
                </a>

                <a href="dashboard.php?page=newsletter">
                    <div data-id="newsletter" class="panel-item">
                        <span>Newsletter</span>
                    </div>
                </a>

                <a href="dashboard.php?page=offres">
                    <div data-id="offres" class="panel-item">
                        <span>Offres</span>
                    </div>
                </a>

                <a href="dashboard.php?page=formation">
                    <div data-id="formation" class="panel-item">
                        <span>Formation & Support</span>
                    </div>
                </a>


            </div>
        </div>
        <div class="dashboard-body">

            <div class="body-header">
                <div class="alert">
                    <script src="https://cdn.lordicon.com/xdjxvujz.js"></script>
                    <lord-icon
                        src="https://cdn.lordicon.com/kjsfgazx.json"
                        trigger="loop"
                        delay="10000"
                        colors="primary:#ffc171"
                        style="width:40px;height:40px">
                    </lord-icon>
                </div>
                <div class="account-menu">
                    <div class="icon-div">
                        <i onclick="actionMenu()" class="fa-solid fa-bars"></i>
                    </div>
                    <span > 
                        <?php echo $_SESSION["prenomPersonnel"] ?>
                    </span>
                    <i onclick="actionMenu()" class="fa-solid fa-user-tie"></i>
                </div>
                <div class="menu-drop-down hidden">
                    <div class="menu-item">
                        <a href="">Mon compte</a>
                    </div>
                    <div class="menu-item">
                        <a href="../logout.php">Se déconnecter</a>
                    </div>
                    <div class="menu-item">
                        <a href="">Assistant</a>
                    </div>
                </div>
            </div>

            

            <!-- section dynamic pour chaque services -->
            <?php
                // echo "<style>";
                // include "../Style/reservation.css";
                // echo "</style>";
                include "reservation.php";
            ?>

            <?php
                // echo "<style>";
                // include "../Style/gestion-employes.css";
                // echo "</style>";
                include "gestion-employes.html";
            ?>
            
            <?php
                include "gestion-clients.html";
            ?>
            
            <?php
                include "gestion-voitures.php";
            ?>
            
            <?php

                // echo "<script>";
                // include "../Script/dashboard.js";
                // echo "</script>";
                // echo "<style>";
                // include "../Style/gestion-reservation.css";
                // echo "</style>";
                include "gestion-reservation.html";
            ?>
            
            <?php
                // echo "<style>";
                // include "../Style/newsletter.css";
                // echo "</style>";
                include "newsletter.html";
            ?>
            
            <?php
                // echo "<style>";
                // include "../Style/offres.css";
                // echo "</style>";
                include "offres.html";
            ?>
            
            <?php
                // echo "<style>";
                // include "../Style/formation-support.css";
                // echo "</style>";
                include "formation-support.html";
            ?>
            
            <!--                                      -->
            
            
                    
        </div>
    </div>
    
    <?php
        if(isset($_GET["page"])){
            echo "
                <script>
                    actionService(\"".$_GET["page"]."\");
                </script>
            ";
        }
        if(isset($_GET["activeSection"]) && isset($_GET["id"])){
            echo "<script>
                    sessionStorage.setItem(\"".$_GET["activeSection"]."\",".$_GET["id"].");
                    // window.open(\"dashboard.php?page=".$_GET["page"]."\",\"_self\");
                </script>"; 
        }
    ?>
    
    <script src="../Script/charts.js"></script>

</body>
</html>
