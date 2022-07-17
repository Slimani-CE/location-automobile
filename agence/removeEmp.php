<?php
    include "../connexion.php";
    $resultMsg = "<span class='correct'> Result message </span>";
    session_start();
    $curCodePersonnel = $_SESSION["codePersonnel"];
    if(isset($_GET["codePersonnel"]) && isset($_GET["codeUtilisateur"])){
        $codePersonnel = $_GET["codePersonnel"] ;
        $codeUtilisateur = $_GET["codeUtilisateur"] ;
        if( $curCodePersonnel != $codePersonnel ){
            $queryPerso = " UPDATE personnel SET isDeletedPersonnel = ".true." WHERE codePersonnel = '$codePersonnel'";
            $resultPerso = mysqli_query($connexion, $queryPerso);
            $queryUt = " UPDATE utilisateur SET isDeletedUtilisateur = ".true." WHERE codeUtilisateur = '$codeUtilisateur'";
            $resultUt = mysqli_query($connexion, $queryUt);
            if( $resultPerso && $resultUt )
                $resultMsg = "<span class='correct'> Employée supprimé avec succès </span>";
            else $resultMsg = "<span class='error'> Erreur durant la suppression d'employée </span>";
        }
        else $resultMsg = "<span class='error'> vous ne pouvez pas vous retirer de la base de données </span>";
    }
    else{
        $resultMsg = "<span class='error'> Erreur durant la suppression d'employée </span>";
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





