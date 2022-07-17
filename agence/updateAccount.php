<?php
    include "../connexion.php";
    $resultMsg = "<span class='correct'> Result message </span>";
    if( isset($_POST["codePersonnelAcc"]) && isset($_POST["prenomPersonnelAcc"]) && isset($_POST["NCNSSPersonnelAcc"]) && isset($_POST["dateEntrePersonnelAcc"]) && isset($_POST["emailUtilisateurAcc"]) && isset($_POST["nomPersonnelAcc"]) && isset($_POST["salairePersonnelAcc"]) && isset($_POST["portablePersonnelAcc"]) ){
        $prenomPersonnel = $_POST["prenomPersonnelAcc"];
        $NCNSSPersonnel = $_POST["NCNSSPersonnelAcc"];
        $dateEntrePersonnel = $_POST["dateEntrePersonnelAcc"];
        $emailUtilisateur = $_POST["emailUtilisateurAcc"];
        $nomPersonnel = $_POST["nomPersonnelAcc"];
        $salairePersonnel = $_POST["salairePersonnelAcc"];
        $portablePersonnel = $_POST["portablePersonnelAcc"];
        $codePersonnel = $_POST["codePersonnelAcc"];
        $persoQuery = " UPDATE personnel SET prenomPersonnel = '$prenomPersonnel', NCNSSPersonnel = '$NCNSSPersonnel', dateEntrePersonnel = '$dateEntrePersonnel', nomPersonnel = '$nomPersonnel', salairePersonnel = '$salairePersonnel', portablePersonnel = '$portablePersonnel' WHERE codePersonnel = '$codePersonnel'";
        $utQuery = " UPDATE utilisateur SET emailUtilisateur = '$emailUtilisateur' WHERE codePersonnel = '$codePersonnel'";
        $resultPerso = mysqli_query($connexion,$persoQuery);
        $resultUt = mysqli_query($connexion,$utQuery);
        if(!$resultPerso || !$resultUt)
            $resultMsg = "<span class='error'> Erreur durant la mise a jours du compte </span>";
        else 
            $resultMsg = "<span class='correct'> Informations de compte mises à jour avec succès </span>";
    }
    else
        $resultMsg = "<span class='error'> Erreur durant la mise a jours du compte </span>";
?>  
<body>
    <style>
        *{
            margin: 0 ;
            padding: 0;
        }
        .result{
            width: 250px;
            height: 42px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: calibri;
            font-size: 15px;
            font-weight: bold;
            padding: 5px;
        }
        .result span{
            text-align: center;
        }
        .correct{
            color: #7DFFA8 ;
        }
        .error{
            color: #ED7D31;
        }
    </style>    

    <div class="result">
        <?php echo $resultMsg ?>
    </div>

</body>













 





     