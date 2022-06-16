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
    <link rel="stylesheet" href="Style/updates.css">
    <link rel="stylesheet" href="Style/espace-agence.css">
    <script src="Script/updates.js"></script>
    <script src="Script/popups.js"></script>
    <title> Espace Agence </title>
</head>
<body>

    <!-- section des mises -->
    <?php
    header("Pragma: no-cache");
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
                <div onclick="launchSection(this)" class="menu-item"> <a href="index.php#home-id">Accueil</a> </div>
                <div onclick="launchSection(this)" class="menu-item"> <a href="index.php#service-id">services</a> </div>
                <div onclick="launchSection(this)" class="menu-item"> <a href="index.php#apropos-id">À propos de nous</a> </div>
                <div onclick="launchSection(this)" class="menu-item"> <a href="index.php#contact-id">contactez-nous</a> </div>
                <div onclick="launchSection(this)" class="menu-item active-section"> 
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
                    <div onclick="openPopUp('signin-container')" class="signin-btn"> Inscrivez vous </div>
                    <div onclick="openPopUp('login-container')" class="login-btn"> Se connecter </div>
                </div>
            </div>
        </div>
    </div>

    <div class="login-container hidden">
        <div class="login-section">

            <div class="login-header">
                <div onclick="closePopUp(this)" class="closeBtn">
                    <i class="fa-solid fa-xmark"></i>
                </div>
                
                <div class="login-text id-text">
                    Connectez-vous à votre espace agence
                </div>
            </div>

            <div class="login-body">

                <form method="POST" action="login.php" class="login-form">
                    <div class="login-details">

                        <div class="email-div form-item">
                            <label for="emailUtilisateur" >Email</label>            
                            <input required id="emailUtilisateur" name="emailUtilisateur" placeholder="Email" type="email">
                        </div>

                        <div class="pswrd-div form-item">
                            <label for="motDePasseUtilisateur-login" >Mot de passe</label>            
                            <input required id="motDePasseUtilisateur-login" name="motDePasseUtilisateur" placeholder="Mot de passe" type="password">
                        </div>

                        <div class="submit-btn">
                            <button type="submit" name="login">S’identifier</button>
                        </div>
                    </div>
                </form>

                <div class="svg-div">
                    <img src="Media/SVG/Password_Monochromatic (1).svg" alt="">
                </div>

            </div>
        </div>
    </div>

    <div class="signin-container hidden">
        <div class="signin-section">
            <div class="signin-header">
                <div onclick="closePopUp(this)" class="closeBtn">
                    <i class="fa-solid fa-xmark"></i>
                </div>
                
                <div class="login-text id-text">
                    inscrivez-vous pour accéder à votre espace agence
                </div>
            </div>

            <form method="POST" action="signin.php" >
                <div class="signin-body" onclick="">
                    <div class="input-div">
                        <div class="pairs">
                            <!-- nomPersonnel     -->
                            <div class="form-item">
                                <label for="nomPersonnel" >Nom</label>            
                                <input name="nomPersonnel" required id="nomPersonnel" placeholder="Nom" type="text">
                            </div>
                            <!-- prenomPersonnel -->
                            <div class="form-item">
                                <label for="prenomPersonnel" >Prénom</label>            
                                <input name="prenomPersonnel" required id="prenomPersonnel" placeholder="Prénom" type="text">
                            </div>
                        </div>
                        <div class="pairs">
                            <!-- emailPersonnel -->
                            <div class="form-item">
                                <label for="emailPersonnel" >email</label>            
                                <input name="emailPersonnel" required id="emailPersonnel" placeholder="email" type="email">
                            </div>
                            <!-- Mot de passe     -->
                            <div class="form-item">
                                <label for="motDePasseUtilisateur-signin" >Mot de passe</label>            
                                <input name="motDePasseUtilisateur" required id="motDePasseUtilisateur-signin" placeholder="Mot de passe" type="password">
                            </div>
                        </div>
                        <div class="pairs">
                            <!-- N° de portable -->
                            <div class="form-item">
                                <label for="portablePersonnel" >N° de portable</label>            
                                <input name="portablePersonnel" required id="portablePersonnel" placeholder="N° de portable" type="tel">
                            </div>
                            <!-- Nom de l'agence   -->
                            <div class="form-item">
                                <label for="nomAgence" >Nom de l'agence</label>            
                                <input name="nomAgence" required id="nomAgence" placeholder="Nom de l'agence" type="text">
                            </div>
                        </div>
                        <div class="pairs">
                            <!-- Adresse de l'agence -->
                            <div class="form-item">
                                <label for="adresseAgence" >Adresse de l'agence</label>            
                                <input name="adresseAgence" required id="adresseAgence" placeholder="Adresse de l'agence" type="text">
                            </div>
                            <!-- Ville     -->
                            <div class="form-item">
                                <label for="villeAgence" >Ville</label>            
                                <input name="villeAgence" required id="villeAgence" placeholder="Ville" type="text">
                            </div>
                        </div>
                        <div class="pairs">
                               <!-- Pays -->
                            <div class="form-item">
                                <label for="paysAgence" >Pays</label>            
                                <input name="paysAgence" required id="paysAgence" placeholder="Pays" type="text">
                            </div>
                            <!-- Regles     -->
                            <div class="form-item checkbox">
                                <input required id="regles" type="checkbox">
                                <label for="regles">J'ai lu et j'accepte <span>les CGV</span></label>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <div class="signin-footer">
                    <div class="submit-btn">
                        <button>S’inscrire</button>
                    </div>
                </div>
            </form>
            
        </div>
    </div>

</body>
</html>
