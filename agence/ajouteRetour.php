<?php

    $resultMsg = "<span class='correct'> Informations ajouté avec succés </span>";
    include "../connexion.php";

    if( isset($_POST["res-codeVoiture"]) && isset($_POST["res-dateRetour"]) && isset($_POST["res-kilometrageActuel"]) && isset($_POST["res-etatActuel"]) && isset($_POST["res-etatVoiture"]) && isset($_POST["res-kilometrageParcourue"]) && isset($_POST["res-codeReservation"]) ){
        $dateEntreRetour = $_POST["res-dateRetour"]; 
        $kilometrageActuelRetour = $_POST["res-kilometrageActuel"]; 
        $etatRetour = $_POST["res-etatActuel"]; 
        $etatVoiture = $_POST["res-etatVoiture"]; 
        $kilometrageParcourueRetour = $_POST["res-kilometrageParcourue"]; 
        $codeReservation = $_POST["res-codeReservation"]; 
        $codeVoiture = $_POST["res-codeVoiture"]; 
        $etatReservation = "libre"; 
        

        // Creation et execution de la requete
        $requeteRet = " INSERT INTO retour(dateEntreRetour, etatRetour, codeReservation, kilometrageActuelRetour, kilometrageParcourueRetour)
        values ('$dateEntreRetour','$etatRetour','$codeReservation', $kilometrageActuelRetour, $kilometrageParcourueRetour) ";
        $resultatsRet = mysqli_query($connexion, $requeteRet);
        if( $resultatsRet ){
            // Mise a jour de la table de voiture
            $requeteRes = " UPDATE reservation SET etatReservation = '$etatReservation' WHERE codeReservation = '$codeReservation' ";
            $resultatsRes = mysqli_query($connexion,$requeteRes);
            $requeteVo = " UPDATE voiture SET kilometrageVoiture = '$kilometrageActuelRetour', etatVoiture = '$etatVoiture' WHERE codeVoiture = '$codeVoiture' ";
            $resultatsVo = mysqli_query($connexion,$requeteVo);
            if(!$resultatsVo)
                $resultMsg = "<span class='error'> ERREUR: durant l'ajoute des informations </span>";
        }
        else
            $resultMsg = "<span class='error'> ERREUR: durant l'ajoute des informations </span>";
    }
    else 
        $resultMsg = "<span class='error'> ERREUR: durant l'ajoute des informations </span>";

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


 
