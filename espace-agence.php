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
    <link rel="stylesheet" href="./Style/espace-agence.css">
    <script src="./Script/updates.js"></script>
    <script src="./Script/identification.js"></script>
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
                <div class="item-hover  menu-item"> <a href="./index.php">Accueil</a> </div>
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
            <div class="desc-div">
                <h2>Espace d’agence</h2>
                <ul class="list">
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing</li>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing</li>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing</li>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing</li>
                </ul>
            </div>

            <div class="connexion-div">
                <div class="con-text"> Crée un compte pour votre agence </div>
                <div class="con-btns">
                    <div onclick="openSignin()" class="signin-btn"> Inscrivez vous </div>
                    <div onclick="openLogin()" class="login-btn"> Se connecter </div>
                </div>
            </div>
        </div>
    </div>

    <div class="login-container">
        <div class="login-section">
            <div class="login-header">
                <div onclick="closeContainer(this)" class="closeBtn">
                    <i class="fa-solid fa-xmark"></i>
                </div>
                
                <div class="login-text id-text">
                    Connectez-vous à votre espace agence
                </div>
            </div>
            <div class="login-body">
                <form action="alert('Pas encore développé')">
                    <div class="login-details">
                        
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="signin-container">
        <div class="signin-section">
            <div class="signin-header">
                <div onclick="closeContainer(this)" class="closeBtn">
                    <i class="fa-solid fa-xmark"></i>
                </div>
                
                <div class="login-text id-text">
                    inscrivez-vous pour accéder à votre espace agence
                </div>
            </div>
            
        </div>
    </div>

</body>
</html>
