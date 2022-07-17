<?php 

    include "../connexion.php";
    $resultMsg = "<span class='correct'> Result message </span>";

    if(isset($_GET["listEmp"]) && isset($_GET["listReservation"]) && isset($_GET["listNoNotifPay"])){

        $listEmpStr = $_GET["listEmp"];
        $listReservationStr = $_GET["listReservation"];
        $listNoNotifPayStr = $_GET["listNoNotifPay"];
        $listEmp = explode("-",$listEmpStr);
        $listReservation = explode("-",$listReservationStr);
        $listNoNotifPay = explode("-",$listNoNotifPayStr);
        
        for($i = 0; $i < count($listEmp) && strlen($listEmpStr) > 0; $i++)
        {
            $codePersonnel = $listEmp[$i];
            // Add new notif of "non-payed-res"
            for($j = 0; $j < count($listReservation) && strlen($listReservationStr) > 0; $j++){
                $codeReservation = $listReservation[$j];
                $query = " INSERT INTO notification(descreptionNotification, nomRefTableNotification, codePersonnel, codeRefTableNotification, isReadNotification) values
                ('reservation', 'res-non-pay', '$codePersonnel', '$codeReservation', 0) ";
                // echo $query."<br>";
                $result = mysqli_query($connexion, $query);
                if(!$result){
                    die ("ERROR: durant la mise a jours des notifications");
                }else echo "Requete execute ajoute<br>";
            }
            // Remove notif of "payed-res"
            for($j = 0; $j < count($listNoNotifPay) && strlen($listNoNotifPayStr) > 0; $j++){
                $codeReservation = $listNoNotifPay[$j];
                $query = " DELETE FROM notification WHERE nomRefTableNotification = 'res-non-pay' AND codeRefTableNotification = '$codeReservation' AND codePersonnel = '$codePersonnel' ";
                // echo $query."<br>";
                $result = mysqli_query($connexion, $query);
                if(!$result){
                    die ("ERROR: durant la mise a jours des notifications");
                }else echo "Requete execute delete<br>";
            }
        }

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