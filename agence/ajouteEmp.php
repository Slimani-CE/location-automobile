<?php
    include "../connexion.php";
    $resultMsg = "<span class='correct'> Result message </span>";

    if(isset($_GET["nomPersonnel"]) && isset($_GET["prenomPersonnel"]) && isset($_GET["NCNSSPersonnel"]) && isset($_GET["servicePersonnel"]) && isset($_GET["dateEntrePersonnel"]) && isset($_GET["salairePersonnel"]) && isset($_GET["portablePersonnel"]) && isset($_GET["emailUtilisateur"]) && isset($_GET["motDePasseUtilisateur"]) && isset($_GET["codeAgence"])){
         
        $nomPersonnel = $_GET["nomPersonnel"];
        $prenomPersonnel = $_GET["prenomPersonnel"];
        $NCNSSPersonnel = $_GET["NCNSSPersonnel"];
        $servicePersonnel = $_GET["servicePersonnel"];
        $dateEntrePersonnel = $_GET["dateEntrePersonnel"];
        $salairePersonnel = $_GET["salairePersonnel"];
        $portablePersonnel = $_GET["portablePersonnel"];
        $emailUtilisateur = $_GET["emailUtilisateur"];
        $motDePasseUtilisateur = $_GET["motDePasseUtilisateur"];
        $codeAgence = $_GET["codeAgence"]; 

        // Check if email is unique or not
        $checkEmail = "SELECT * FROM utilisateur WHERE emailUtilisateur = '$emailUtilisateur'";
        $resultEmail = mysqli_query($connexion, $checkEmail);
        if($resultEmail && count(mysqli_fetch_all($resultEmail))!=0 ){
            $resultMsg = "<span class='error'> L'email existe déjà </span>";
        }
        else{
            $queryEmp = " INSERT INTO personnel(nomPersonnel, prenomPersonnel, NCNSSPersonnel, servicePersonnel, dateEntrePersonnel, salairePersonnel, portablePersonnel, codeAgence) values
            ('$nomPersonnel', '$prenomPersonnel', '$NCNSSPersonnel', '$servicePersonnel', '$dateEntrePersonnel', '$salairePersonnel', '$portablePersonnel', '$codeAgence') ";
            $resultEmp = mysqli_query($connexion, $queryEmp);
            $codePersonnel = mysqli_insert_id($connexion);
    
            $queryUt = " INSERT INTO utilisateur(emailUtilisateur, motDePasseUtilisateur, codePersonnel) values
            ('$emailUtilisateur', '$motDePasseUtilisateur', '$codePersonnel') ";
            $resultUt = mysqli_query($connexion, $queryUt);

            if($resultEmp && $resultUt){
                // header("Location: dashboard.php?page=gest-employes");
                $resultMsg = "<span class='correct'> Employée ajouté avec succés </span>";
            }
            else $resultMsg = "<span class='error'> Erreur durant l'ajoute d'employée </span>";
        }
    }
    else{
        $resultMsg = "<span class='error'> Erreur durant l'ajoute d'employée </span>";
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





