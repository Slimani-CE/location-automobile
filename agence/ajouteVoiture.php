<?php
    $immatriculationVoiture = $_POST["immatriculationVoiture"];
    $marqueVoiture = $_POST["marqueVoiture"];
    $modelVoiture = $_POST["modelVoiture"];
    $carburantVoiture = $_POST["carburantVoiture"];
    $dateCirculaireVoiture = $_POST["dateCirculaireVoiture"];
    $prixParJourVoiture = $_POST["prixParJourVoiture"];
    $kilometrageVoiture = $_POST["kilometrageVoiture"];
    $imagesVoiture = file_get_contents($_FILES['imagesVoiture']["tmp_name"]);
    $dateVignetteVoiture = $_POST["dateVignetteVoiture"];
    $totalVignetteVoiture = $_POST["totalVignetteVoiture"];
    $alertVignetteVoiture = $_POST["alertVignetteVoiture"];
    include "../connexion.php";
    session_start();
    $resultMsg = "<span class='correct'> Result message </span>";
    $commandAjoute = "INSERT INTO voiture(immatriculationVoiture,marqueVoiture,modelVoiture,carburantVoiture,dateCirculaireVoiture,prixParJourVoiture,kilometrageVoiture,codeAgence,dateVignetteVoiture,totalVignetteVoiture,alertVignetteVoiture)
    values ('$immatriculationVoiture',
            '$marqueVoiture',
            '$modelVoiture',
            '$carburantVoiture',
            '$dateCirculaireVoiture',
            '$prixParJourVoiture',
            '$kilometrageVoiture',
            ".$_SESSION['codeAgence'].",
            '$dateVignetteVoiture',
            '$totalVignetteVoiture',
            '$alertVignetteVoiture'
            )";

    $resultExecution = mysqli_query($connexion,$commandAjoute);
    $codeVoiture = mysqli_insert_id($connexion);
    
    $pdo = new PDO("mysql:host=localhost;dbname=bdd-location","root","");
    $query = $pdo->prepare("UPDATE voiture SET imagesVoiture = ? WHERE codeVoiture = ? ");
    $query->execute(array($imagesVoiture,$codeVoiture));

    if($resultExecution)
        $resultMsg = "<span class='correct'> Voiture ajoutée avec succès </span>";
    else 
        $resultMsg = "<span class='error'> erreur lors de l'ajout d'une nouvelle voiture </span>";
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





