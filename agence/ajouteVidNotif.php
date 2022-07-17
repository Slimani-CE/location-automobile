<?php

    include "../connexion.php";

    if(isset($_GET["listEmp"]) && isset($_GET["listVidange"]) && isset($_GET["listNoNotif"])){
        $listStrEmp = $_GET["listEmp"] ;
        $listStrVidange = $_GET["listVidange"] ;
        $listStrNoVidange = $_GET["listNoNotif"] ;
        $listEmp = explode("-", $listStrEmp);
        $listVidange = explode("-", $listStrVidange);
        $listNoVidange = explode("-", $listStrNoVidange);
        
        for($i = 0; $i < count($listEmp) && strlen($listStrEmp) > 0; $i++)
        {
            $codePersonnel = $listEmp[$i];
            // Add new notif of "Vidange"
            for($j = 0; $j < count($listVidange) && strlen($listStrVidange) > 0; $j++){
                $codeVidange = $listVidange[$j];
                $query = " INSERT INTO notification(descreptionNotification, nomRefTableNotification, codePersonnel, codeRefTableNotification, isReadNotification) values
                ('vidange', 'vidange', '$codePersonnel', '$codeVidange', 0) ";
                // echo $query."<br>";
                $result = mysqli_query($connexion, $query);
                if(!$result){
                    die ("ERROR: durant la mise a jours des notifications");
                }
            }
            // Remove notif of old "Vidange"
            for($j = 0; $j < count($listNoVidange) && strlen($listStrNoVidange) > 0; $j++){
                $codeVidange = $listNoVidange[$j];
                $query = " DELETE FROM notification WHERE nomRefTableNotification = 'vidange' AND codeRefTableNotification = '$codeVidange' AND codePersonnel = '$codePersonnel' ";
                // echo $query."<br>";
                $result = mysqli_query($connexion, $query);
                if(!$result){
                    die ("ERROR: durant la mise a jours des notifications");
                }
            }
        }
    }

?>


