<?php
    $resultMsg = "<span class='correct'> Result message </span>";
    $dateVidange = $_POST["dateVidange"];
    $codeVoiture = $_POST["codeVoitureVid"];
    $dureeVidange = $_POST["dureeVidange"];
    $dureeActuelVidange = $_POST["dureeActuelVidange"];
    $prixVidange = $_POST["prixVidange"];
    $alertVidange = $_POST["alertVidange"];

    // Creation et execution de la requette
    include "../connexion.php";
    $queryVid = " INSERT INTO vidange(dateVidange,dureeVidange,dureeActuelVidange,prixVidange,alertVidange,codeVoiture)values('$dateVidange','$dureeVidange','$dureeActuelVidange','$prixVidange','$alertVidange','$codeVoiture')";
    $queryVo  = " UPDATE voiture SET kilometrageVoiture = '$dureeActuelVidange' WHERE codeVoiture = $codeVoiture";

    $resultatsVid = mysqli_query($connexion,$queryVid);
    $resultatsVo = mysqli_query($connexion,$queryVo);
    if($resultatsVid && $resultatsVo)
        $resultMsg = "<span class='correct'> Vidange ajoutée avec succès </span>";
    else
        $resultMsg = "<span class='error'> Erreur durant l'ajoute de vidange </span>";
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

