<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- <link rel="stylesheet" href="fontawesome-free-6.1.0-web/css/all.css"> -->
    <link rel="stylesheet" href="Style/font.css">
    <link rel="stylesheet" href="Style/all.css">
    <link rel="stylesheet" href="Style/accueil.css">
    <link rel="stylesheet" href="Style/updates.css">
    <link rel="shortcut icon" href="Media/Images/logo.png" type="image/x-icon">
    <script src="Script/home.js"></script>
    <script src="Script/updates.js"></script>
    <title> Home page </title>
</head>
<body>

    <!-- section des mises -->
    <?php
        echo "<style>";
        include "style/updates.css";
        echo "</style>";
        include "updates.html";
    ?>
    <!--                   -->

    <div class="bg-layer"></div>


    <div class="container">

        <div class="header">
            <a href="index.php">
                <div class="logo">
                    <img src="Media/Images/logo.png" alt="Ma Voiture">
                </div>
            </a>
            <div class="menu">
                <div onclick="launchSection(this)" class="menu-item active-section" id="home-btn"> <a href="#home-id">Accueil</a> </div>
                <div onclick="launchSection(this)" class="menu-item" id="service-btn"> <a href="#service-id">services</a> </div>
                <div onclick="launchSection(this)" class="menu-item" id="apropos-btn"> <a href="#apropos-id">À propos de nous</a> </div>
                <div onclick="launchSection(this)" class="menu-item" id="contact-btn"> <a href="#contact-id">contactez-nous</a> </div>
                <div onclick="launchSection(this)" class="menu-item"> 
                    <a href="espace-agence.php">
                        <div class="esp-agence-btn"> 
                            <i class="fa-solid fa-bars-progress"></i>
                            <span> Espace agence </span>
                        </div>
                    </a>
                </div>
            </div>
        </div>

        <section class="section home" id="home-id">
            <!-- <div class="svg-bg">
                <img src="Media/SVG/undraw_financial_data_es63.svg" alt="">
            </div> -->
            <!-- <div class="desc-text">
                <p><span>La meilleure</span> solution pour gérer votre agence de<br>location de voiture</p>
            </div> -->
            <div class="slide-show-cont">
                <div class="slides">
                    <input type="radio" name="radio-btn" id="radio1">
                    <input type="radio" name="radio-btn" id="radio2">
                    <input type="radio" name="radio-btn" id="radio3">
                    <input type="radio" name="radio-btn" id="radio4">

                    <div class="slide first">
                        <img src="Media/voitures/voiture1.png" alt="">
                        <div class="slide-txt"> Hey! you, I'm a descreption text</div>
                    </div>
                    <div class="slide">
                        <img src="Media/voitures/voiture2.png" alt="">
                        <div class="slide-txt"> Hey! you, I'm a descreption text</div>
                    </div>
                    <div class="slide">
                        <img src="Media/voitures/voiture3.png" alt="">
                        <div class="slide-txt"> Hey! you, I'm a descreption text</div>
                    </div>
                    <div class="slide">
                        <img src="Media/voitures/voiture4.png" alt="">
                        <div class="slide-txt"> Hey! you, I'm a descreption text</div>
                    </div>

                    <div class="navigation-auto">
                        <div class="auto-btn1"></div>
                        <div class="auto-btn2"></div>
                        <div class="auto-btn3"></div>
                        <div class="auto-btn4"></div>
                    </div>
                </div>
                <div class="navigation-manual">
                    <label for="radio1" class="manual-btn radio1"></label>
                    <label for="radio2" class="manual-btn radio2"></label>
                    <label for="radio3" class="manual-btn radio3"></label>
                    <label for="radio4" class="manual-btn radio4"></label>
                </div>
            </div>
            <script>
                var counter = 1;
                setInterval(function(){
                    document.getElementById("radio"+counter).checked = true;
                    counter++;
                    if( counter > 4 )
                        counter = 1;
                },2500);
            </script>
        </section>

        <section class="section service-section" id="service-id">
            <div class="next-header">
                <!-- <img src="Media/Images/section header.png" alt=""> -->
                <i class="fa-solid fa-angles-down"></i>
            </div>
            <div class="sec-body service-body">
                Nous services

            </div>
        </section>
        
        <section class="section apropos-section" id="apropos-id">
            <div class="sec-body apropos-body">
                À propos de nous
                
            </div>
            
        </section>
        
        <section class="section contact-section" id="contact-id">
            <div class="sec-body contact-body">
                Contactez-nous   

            </div>

        </section>
        
        

    </div>
</body>
</html>
