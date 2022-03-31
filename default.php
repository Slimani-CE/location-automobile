<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./fontawesome-free-6.1.0-web/css/all.css">
    <link rel="stylesheet" href="./Style/font.css">
    <link rel="stylesheet" href="./Style/all.css">
    <link rel="stylesheet" href="./Style/updates.css">
    <script src="./Script/updates.js"></script>
    <title> Home page </title>
</head>
<body>

    <!-- section des mises -->
    <?php
        echo "<style>";
        include "./style/updates.css";
        echo "</style>";
        include "updates.html";
    ?>
    <!--                   -->


    <div class="container">

        <div class="header">
            <div class="logo">
                Car rental
            </div>
            <div class="menu">
                <div class="item-hover  menu-item active-page"> <a href="">Accueil</a> </div>
                <div class="item-hover  menu-item"> <a href="">À propos de nous</a> </div>
                <div class="item-hover  menu-item"> <a href="">contactez-nous</a> </div>
                <div class="item-hover  menu-item"> <a href="">services</a> </div>
                <div class="menu-item"> 
                    <a href="">
                        <div class="esp-agence-btn"> 
                            <i class="fa-solid fa-bars-progress"></i>
                            <span> Espace agence </span>
                        </div>
                    </a>
                </div>
            </div>
        </div>

        <div class="body">
            <div class="svg-bg">
                <img src="Media/SVG/undraw_financial_data_es63.svg" alt="">
            </div>
            <div class="desc-text">
                <p><span>La meilleure</span> solution pour gérer votre agence de<br>location de voiture</p>
            </div>
        </div>

    </div>
</body>
</html>
