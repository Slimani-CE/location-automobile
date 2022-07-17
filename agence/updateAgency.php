<?php
    include "../connexion.php";
    $resultMsg = "";

    if(isset($_POST["codeAgenceAg"]) && isset($_POST["nomAgenceAg"]) && isset($_POST["adresseAgenceAg"]) && isset($_POST["villeAgenceAg"]) && isset($_POST["paysAgenceAg"]) && isset($_POST["teleFixAgenceAg"]) && isset($_POST["iceAgenceAg"]) ){
        $nomAgence = $_POST["nomAgenceAg"];
        $adresseAgence = $_POST["adresseAgenceAg"];
        $villeAgence = $_POST["villeAgenceAg"];
        $paysAgence = $_POST["paysAgenceAg"];
        $teleFixAgence = $_POST["teleFixAgenceAg"];
        $iceAgence = $_POST["iceAgenceAg"]; 
        $codeAgence = $_POST["codeAgenceAg"]; 

        $query = " UPDATE agence SET nomAgence = '$nomAgence', adresseAgence = '$adresseAgence', villeAgence = '$villeAgence', paysAgence = '$paysAgence', teleFixAgence = '$teleFixAgence', iceAgence = '$iceAgence' WHERE codeAgence = '$codeAgence'";
        // echo $query;
        $result = mysqli_query($connexion, $query);
        if($result){
            if( $_FILES['logoAgenceAg']['size'] != 0 && $_FILES['logoAgenceAg']['error'] == 0 ){
                $pdo = new PDO("mysql:host=localhost;dbname=bdd-location","root","");
                $query = $pdo->prepare("UPDATE agence SET logoAgence = ? WHERE codeAgence = ? ");
                $query->execute(array(file_get_contents($_FILES['logoAgenceAg']["tmp_name"]),$codeAgence));
            }
            $resultMsg = "<span class='correct'> Informations d'agence mises à jour avec succès </span><br>".$resultMsg;
        }
        else 
            $resultMsg = "<span class='error'> ERREUR: durant la mise a jours des informations d'agence </span>";
    }
    else
        $resultMsg = "<span class='error'> ERREUR: durant la mise a jours des informations d'agence </span>";
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


 
