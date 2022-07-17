<?php
 
    $resultMsg = "<span class='correct'> Result message </span>";

    $marqueVoiture = $_POST["vo-marque"]; 
    $modelVoiture = $_POST["vo-model"]; 
    $dateCirculaireVoiture = $_POST["vo-dateCirculaire"]; 
    $kilometrageVoiture = $_POST["vo-kilometrage"]; 
    $carburantVoiture = $_POST["vo-carburant"]; 
    $prixParJourVoiture = $_POST["vo-prixParJour"]; 
    $codeVoiture = $_POST["vo-codeVoiture"]; 
    // if(isset($_FILES["vo-images"]))
    // else
    //     $imagesVoiture = " null ";
    // echo '<img width="300px" src="data:image/jpeg;base64,'.base64_encode($imagesVoiture).'">';
    // $imagesVoiture = "null";
    
    //Creation et execution de la requete
    include "../connexion.php";
    $requete = " UPDATE voiture SET marqueVoiture = '$marqueVoiture' , modelVoiture = '$modelVoiture' , dateCirculaireVoiture = '$dateCirculaireVoiture' , kilometrageVoiture = '$kilometrageVoiture' , carburantVoiture = '$carburantVoiture' , prixParJourVoiture = '$prixParJourVoiture' WHERE codeVoiture = '$codeVoiture' ";
    // echo $requete;
    $resultat = mysqli_query($connexion,$requete);
    if( $_FILES['vo-images']['size'] != 0 && $_FILES['vo-images']['error'] == 0 ){
        $pdo = new PDO("mysql:host=localhost;dbname=bdd-location","root","");
        $query = $pdo->prepare("UPDATE voiture SET imagesVoiture = ? WHERE codeVoiture = ? ");
        $query->execute(array(file_get_contents($_FILES['vo-images']["tmp_name"]),$codeVoiture));
    }
    if($resultat)
        $resultMsg = "<span class='correct'> Informations mises à jour avec succès </span>";
    else
        $resultMsg = "<span class='error'> Erreur: durant la modification des donnees de voiture </span>";
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





 

 
 