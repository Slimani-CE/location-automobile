<?php
    $marqueVoiture = $_POST["vo-marque"]; echo $marqueVoiture."<br>";
    $modelVoiture = $_POST["vo-model"]; echo $modelVoiture."<br>";
    $dateCirculaireVoiture = $_POST["vo-dateCirculaire"]; echo $dateCirculaireVoiture."<br>";
    $kilometrageVoiture = $_POST["vo-kilometrage"]; echo $kilometrageVoiture."<br>";
    $kilometrageVidVoiture = $_POST["vo-kilometrageVidVoiture"]; echo $kilometrageVidVoiture."<br>";
    $carburantVoiture = $_POST["vo-carburant"]; echo $carburantVoiture."<br>";
    $prixParJourVoiture = $_POST["vo-prixParJour"]; echo $prixParJourVoiture."<br>";
    $codeVoiture = $_POST["vo-codeVoiture"]; echo $codeVoiture."<br>";
    $imagesVoiture = file_get_contents($_FILES['vo-images']["tmp_name"]); 
    // if(isset($_FILES["vo-images"]))
    // else
    //     $imagesVoiture = " null ";
    // echo '<img width="300px" src="data:image/jpeg;base64,'.base64_encode($imagesVoiture).'">';
    // $imagesVoiture = "null";
    
    //Creation et execution de la requete
    include "../connexion.php";
    $requete = " UPDATE voiture SET marqueVoiture = '$marqueVoiture' , modelVoiture = '$modelVoiture' , dateCirculaireVoiture = '$dateCirculaireVoiture' , kilometrageVidVoiture = '$kilometrageVidVoiture' , kilometrageVoiture = '$kilometrageVoiture' , carburantVoiture = '$carburantVoiture' , prixParJourVoiture = '$prixParJourVoiture' WHERE codeVoiture = '$codeVoiture' ";
    // echo $requete;
    $resultat = mysqli_query($connexion,$requete);
    $pdo = new PDO("mysql:host=localhost;dbname=bdd-location","root","");
    $query = $pdo->prepare("UPDATE voiture SET imagesVoiture = ? WHERE codeVoiture = ? ");
    $query->execute(array(file_get_contents($_FILES['vo-images']["tmp_name"]),$codeVoiture));
    if($resultat){
        header("Location: dashboard.php?page=gest-voitures&activeSection=activeVoSection&id=".$codeVoiture);
    }
    else{
        echo "Erreur: durant la modification des donnees de voiture";
    }
?>



 

 
 