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
    <link rel="stylesheet" href="../Style/gestion-emp.css">
    <link rel="stylesheet" href="../Style/pageConsultation.css">
    
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.1/chart.min.js" integrity="sha512-QSkVNOCYLtj73J4hbmVoOV6KVZuMluZlioC+trLpewV8qMjsWqlIQvkn1KGX2StWvPMdWGBqim1xlC8krl1EKQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="../Script/database.js"></script>
    <script src="../Script/updates.js"></script>
    <script src="../Script/dashboard.js"></script>
    <script src="../Script/popups.js"></script>
    <!-- <script src="../Script/popupMessage.js"></script> -->
    <script src="../Script/gestionVoiture.js"></script>
    <script src="../Script/gestionClient.js"></script>
    <script src="../Script/gestionReservation.js"></script>
    <script src="../Script/gestionEmp.js"></script>
    <title> Home page </title>
</head>
<body onload="checkMainData();">
    



    
    <!-- section des mises -->
    <!-- <?php
        echo "<style>";
        include "../style/updates.css";
        echo "</style>";
        include "../updates.html";
    ?> -->
    <!--                   -->

    <div class="bg-layer"></div>

    <div class="pop-up notif-container hidden">
        <div class="notif-body">
            <div class="notif-header">
                <div onclick="closePopUp(this)" class="notif-cls-btn">
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div class="notif-section">
                <div class="notif-text">
                    Notifications
                </div>
                <!-- <div onclick="clearAllNotif()" class="cls-all-notif">
                    Clear all
                </div> -->
                <div class="conf-cls-notif-all hidden">
                    <i class="fa-solid fa-solid-emp fa-check yesClearAllNotif" title="Confirmer"></i>
                    <i class="fa-solid fa-solid-emp fa-xmark fa-xmark-emp noClearAllNotif" title="Annuler"></i>
                </div>
            </div>
            <div class="table-notif">

                <div class="notif" data-codeNotification="10">
                    <div class="mod-notif">
                        <div onclick="clearOneNotif(parentNode.parentNode)" title="Supprimer" class="cls-One-notif">
                            <i class="fa-solid fa-trash-can"></i>
                        </div>
                        <div class="conf-cls-notif-One hidden">
                            <i class="fa-solid fa-solid-emp fa-check yesClearOneNotif" title="Confirmer"></i>
                            <i class="fa-solid fa-solid-emp fa-xmark fa-xmark-emp noClearOneNotif" title="Annuler"></i>
                        </div>
                    </div>
                    <span class="notif-title">Bla bla bla bla</span><br>
                    <span class="notif-desc">Bla bla bla bla blaBla bla bla bla </span><br>
                    <a href="">Consulter <i class="fa-solid fa-up-right-from-square"></i></a>
                </div>

            </div>
            <div class="notif-footer"></div>
        </div>
    </div>

    <!-- La section des iframes pour les mise a jours -->
    <div class="frame-container">
    </div>

    <div class="pop-up account-container hidden">
        <div class="account-body">
            <div class="account-header">
                <div onclick="closePopUp(this)" class="account-cls-btn">
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div class="account-section">
                <div class="acc-name">
                    <div class="avt">
                        <i class="fa-solid fa-user-tie"></i>
                        <span id="servicePersonnelAcc">Service</span>
                    </div>
                    <span id="nomCPersonnelAcc">Mustapha SLIMANI</span>
                </div>
                <form class="acc-detail" action="updateAccount.php" target="accEditFormPage" id="acc-edit-form" method="POST">
                    <div class="acc-info-child">
                        <div class="input-div search-div">
                            <label for="prenomPersonnelAccAcc">Prénom</label>
                            <input class="acc-input perso-input" required id="prenomPersonnelAcc" placeholder="Prénom" name="prenomPersonnelAcc" disabled type="text">
                            <input class="acc-input perso-input hidden" required id="codePersonnelAcc" name="codePersonnelAcc" type="number">
                        </div>
                        <div class="input-div search-div">
                            <label for="NCNSSPersonnelAcc">Numéro CNSS</label>
                            <input class="acc-input perso-input" required id="NCNSSPersonnelAcc" placeholder="Numéro CNSS" name="NCNSSPersonnelAcc" disabled type="text">
                        </div>
                        <div class="input-div search-div">
                            <label for="dateEntrePersonnelAcc">Date d'entré</label>
                            <input class="acc-input perso-input" required id="dateEntrePersonnelAcc" placeholder="Date d'entré" name="dateEntrePersonnelAcc" disabled type="date">
                        </div>
                        <div class="input-div search-div">
                            <label for="emailUtilisateurAcc">Email</label>
                            <input class="acc-input perso-input" required id="emailUtilisateurAcc" placeholder="Email" name="emailUtilisateurAcc" disabled type="mail">
                        </div>
                    </div>
                    <div class="acc-info-child">
                        <div class="input-div search-div">
                            <label for="nomPersonnelAcc">Nom</label>
                            <input class="acc-input perso-input" required id="nomPersonnelAcc" placeholder="Nom" name="nomPersonnelAcc" disabled type="text">
                        </div>
                        <div class="input-div search-div">
                            <label for="salairePersonnelAcc">Salaire</label>
                            <input class="acc-input perso-input" required id="salairePersonnelAcc" placeholder="Salaire" name="salairePersonnelAcc" disabled type="text">
                        </div>
                        <div class="input-div search-div">
                            <label for="portablePersonnelAcc">N° portable</label>
                            <input class="acc-input perso-input" required id="portablePersonnelAcc" placeholder="N° portable" name="portablePersonnelAcc" disabled type="text">
                        </div>
                        <div class="input-div search-div">
                            <div onclick="editAccDetail()" class="modDon-btn">Modifier les données</div>
                            <div class="btn-section hidden">
                                <button type="submit" class="resp-btn yesBtn">Oui</button>
                                <div class="resp-btn noBtn">Non</div>
                            </div>
                        </div>

                    </div>
                </form>
                <div class="acc-name only-admin">
                    <div class="avt">
                        <i class="fa-solid fa-car"></i>
                        <span>Agence</span>
                    </div>
                    <span id="nomCAgenceAg">Votre Agence</span>
                </div>
                <form class="acc-detail only-admin" action="updateAgency.php" method="POST" target="AgEditFormPage" id="ag-edit-form" enctype="multipart/form-data">
                    <div class="acc-info-child">
                        <div class="input-div search-div">
                            <label for="nomAgenceAg">Nom d'agence</label>
                            <input class="perso-input ag-input" required id="nomAgenceAg" placeholder="Nom d'agence" name="nomAgenceAg" disabled type="text">
                            <input class="ag-input perso-input hidden" required id="codeAgenceAg" name="codeAgenceAg" type="number">
                        </div>
                        <div class="input-div search-div">
                            <label for="adresseAgenceAg">Adresse d'agence</label>
                            <input class="ag-input perso-input" required id="adresseAgenceAg" placeholder="Adresse d'agence" name="adresseAgenceAg" disabled type="text">
                        </div>
                        <div class="input-div search-div">
                            <label for="villeAgenceAg">Ville d'agence</label>
                            <input class="ag-input perso-input" required id="villeAgenceAg" placeholder="Date d'entré" name="villeAgenceAg" disabled type="text">
                        </div>
                        <div class="input-div search-div">
                            <label for="paysAgenceAg">Pays</label>
                            <input class="ag-input perso-input" required id="paysAgenceAg" placeholder="Pays" name="paysAgenceAg" disabled type="text">
                        </div>
                    </div>
                    <div class="acc-info-child">
                        <div class="input-div search-div">
                            <label for="teleFixAgenceAg">Fix</label>
                            <input class="ag-input perso-input" required id="teleFixAgenceAg" placeholder="Fix" name="teleFixAgenceAg" disabled type="text">
                        </div>
                        <div class="input-div search-div">
                            <label for="iceAgenceAg">ICE</label>
                            <input class="ag-input perso-input" required id="iceAgenceAg" placeholder="ICE" name="iceAgenceAg" disabled type="text">
                        </div>
                        <div class="input-div search-div">
                            <label for="logoAgenceAg">Logo d'agence</label>
                            <input class="ag-input perso-input" id="logoAgenceAg" placeholder="Logo d'agence" name="logoAgenceAg" disabled type="file">
                        </div>
                        <div class="input-div search-div">
                            <div onclick="editAgDetail()" class="modDon-Ag-btn">Modifier les données</div>
                            <div class="btn-Ag-section hidden">
                                <button type="submit" class="resp-btn yesAgBtn">Oui</button>
                                <div class="resp-btn noAgBtn">Non</div>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    </div>

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

                <a href="dashboard.php?page=gest-employes" class="only-admin">
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
                <div class="alert" id="notif-bill" onclick="openPopUp('pop-up notif-container');loadNotifTable()">
                    <script src="https://cdn.lordicon.com/xdjxvujz.js"></script>
                    <lord-icon
                        src="https://cdn.lordicon.com/ndydpcaq.json"
                        style="width:40px;height:40px"
                        colors= "primary: #ff00ff"
                    ></lord-icon>
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
                        <a onclick="openPopUp('pop-up account-container');actionMenu();generateAccountDetails()">Mon compte</a>
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
            if($_GET["page"] == "gest-employes" && $_SESSION["servicePersonnel"] != "administrateur"){
                echo "<script>window.open('dashboard.php?page=reservation','_self')</script>";
            }
            else
                echo "
                    <script>
                        actionService(\"".$_GET["page"]."\");
                        sessionStorage.setItem('curPage',\"".$_GET["page"]."\");
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
