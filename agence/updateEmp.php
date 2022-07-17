<?php
    include "../connexion.php";
    session_start();
    $curCodePersonnel = $_SESSION["codePersonnel"];
    $resultMsg = "<span class='correct'> Result message </span>";

    if(isset($_GET["codePersonnel"]) && isset($_GET["prenomPersonnel"]) && isset($_GET["nomPersonnel"]) && isset($_GET["NCNSSPersonnel"]) && isset($_GET["servicePersonnel"]) && isset($_GET["portablePersonnel"]) && isset($_GET["dateEntrePersonnel"]) && isset($_GET["salairePersonnel"])){
        $codePersonnel = $_GET["codePersonnel"];
        $prenomPersonnel = $_GET["prenomPersonnel"];
        $nomPersonnel = $_GET["nomPersonnel"];
        $NCNSSPersonnel = $_GET["NCNSSPersonnel"];
        $servicePersonnel = $_GET["servicePersonnel"];
        $portablePersonnel = $_GET["portablePersonnel"];
        $dateEntrePersonnel = $_GET["dateEntrePersonnel"];
        $salairePersonnel = $_GET["salairePersonnel"];
        if($curCodePersonnel != $codePersonnel || ($curCodePersonnel == $codePersonnel && $servicePersonnel=="administrateur") ){
            $query = " UPDATE personnel SET prenomPersonnel = '$prenomPersonnel', nomPersonnel = '$nomPersonnel', NCNSSPersonnel = '$NCNSSPersonnel', servicePersonnel = '$servicePersonnel', portablePersonnel = '$portablePersonnel', dateEntrePersonnel = '$dateEntrePersonnel', salairePersonnel = '$salairePersonnel' WHERE codePersonnel = '$codePersonnel'";
            $result = mysqli_query($connexion, $query);
            if($result){
                // header("Location: dashboard.php?page=gest-employes");
                $resultMsg = "<span class='correct'> Information soumis avec succés </span>";
            }
            else $resultMsg = "<span class='error'> Erreur durant la mise à jours </span>";
        }
        else $resultMsg = "<span class='error'> vous ne pouvez pas diminuer votre service a un agent commercial ! </span>";
    }
    else{
        $resultMsg = "<span class='error'> Erreur durant la mise à jours </span>";
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





