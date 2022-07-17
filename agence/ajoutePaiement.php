<?php
    include "../connexion.php";
    $resultMsg = "<span class='correct'> Result message </span>";
    if(isset($_GET["codeReservation"]) && isset($_GET["totalPaiement"]) && isset($_GET["avancePaiement"]) && isset($_GET["etatPaiement"]) && isset($_GET["methodePaiement"]) && isset($_GET["datePaiement"])){
        $codeReservation = $_GET["codeReservation"];
        $totalPaiement = $_GET["totalPaiement"];
        $avancePaiement = $_GET["avancePaiement"];
        $etatPaiement = $_GET["etatPaiement"];
        $methodePaiement = $_GET["methodePaiement"];
        $datePaiement = $_GET["datePaiement"];

        $query = "INSERT INTO paiement(totalPaiement, avancePaiement, etatPaiement, methodePaiement, codeReservation) values
         ('$totalPaiement','$avancePaiement','$etatPaiement','$methodePaiement', '$codeReservation') ";

        $result = mysqli_query($connexion, $query);
        if($result)
            $resultMsg = "<span class='correct'> Paiement ajouté avec succès </span>";
        else
            $resultMsg = "<span class='error'> Erreur durant l'ajoute de paiement </span>";
    }
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

