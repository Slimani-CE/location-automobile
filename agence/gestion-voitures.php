<?php
    include "../connexion.php";
    // session_start();

    $listVoituresCommand = "SELECT codeVoiture,immatriculationVoiture,marqueVoiture,modelVoiture,carburantVoiture,dateCirculaireVoiture,prixParJourVoiture,kilometrageVoiture,imagesVoiture 
    FROM voiture WHERE codeAgence = ".$_SESSION['codeAgence'];

    $listMarque = "SELECT DISTINCT marqueVoiture from voiture WHERE codeAgence = ".$_SESSION['codeAgence'];

    $listMatricule = "SELECT immatriculationVoiture from voiture WHERE codeAgence = ".$_SESSION['codeAgence'];


    $resultListVoitures = mysqli_query($connexion,$listVoituresCommand);
    if(!$resultListVoitures){
        die ("Erreur pendant la selection de la voiture !!!");
    }
    $resultListMarque = mysqli_query($connexion,$listMarque);
    if(!$resultListMarque){
        die ("Erreur pendant la selection des marques !!!");
    }
    $resultListMatricule = mysqli_query($connexion,$listMatricule);
    if(!$resultListMatricule){
        die ("Erreur pendant la selection des matricules !!!");
    }

?>

<div data-id="gest-voitures" class="main-body hidden-service">

    <div class="statisticSectionLayer carGestStatistic hidden">
        <div class="statisticSectionContainer">
            <div class="statisticSectionHeader">   
                <div onclick="closePopUp(this)" class="closeBtn">
                    <i title="Sortir" class="fa-solid fa-arrow-right-from-bracket"></i>
                </div>
                
                <div class="sectionTitle">
                    Les statistiques de votre garage
                </div>
            </div>
            <div class="carStatisticSectionBody">
                <div class="dateTableContainer">
                    <div class="tableSearchContainer">
                        <div class="search-div">
                            <label for="searchByYear">Année</label>
                            <input onkeyup="loadMonthsTable(this.value)" id="searchByYear" placeholder="Année" type="number" name="searchByYear">
                        </div>
                    </div>
                    <div class="tableTitle">This is a table title</div>
                    <table id="carsDateTable">
                        <tr>
                            <th></th>
                            <th>Janvier</th>
                            <th>Février</th>
                            <th>Mars</th>
                            <th>Avril</th>
                            <th>Mai</th>
                            <th>Juin</th>
                            <th>Juillet</th>
                            <th>Août</th>
                            <th>Septembre</th>
                            <th>Octobre</th>
                            <th>Novembre</th>
                            <th>Décembre</th>
                        </tr>
                        <tr>
                            <th>audi rs3</th>
                            <td>2</td>
                            <td>12</td>
                            <td>20</td>
                            <td>10</td>
                            <td>0</td>
                            <td>0</td>
                            <td>2</td>
                            <td>20</td>
                            <td>0</td>
                            <td>2</td>
                            <td>20</td>
                            <td>0</td>

                        </tr>
                        <tr>
                            <th>bmw serie 07</th>
                            <td>09</td>
                            <td>7</td>
                            <td>15</td>
                            <td>12</td>
                            <td>3</td>
                            <td>2</td>
                            <td>20</td>
                            <td>0</td>
                            <td>2</td>
                            <td>2</td>
                            <td>20</td>
                            <td>0</td>
                        </tr>
                    </table>
                </div>

                <div class="charts-container">
                    <div class="chart-body chart-1">
                        <canvas id="monthlyStatistique">
                            
                            

                        </canvas>		
                        <h2 class="graph-title">Durée de location des voiture sur titre d'année</h2>
                    </div>
                    <div class="chart-body chart-2">
                        <canvas id="monthlyBasedOn">
                            

                        </canvas>		
                        <h2 class="graph-title">Durée de location des voitures par rapport aux durée globale </h2>

                    </div>
                </div>
            </div>
        </div>

    </div>

    <div class="CarAddLayer hidden">
        <div class="CarAddSection">
            <div class="CarAddSection-header">
                <div onclick="closePopUp(this)" class="closeBtn">
                    <i class="fa-solid fa-xmark"></i>
                </div>
                
                <div class="login-text id-text">
                    Ajouter les informations de la nouvelle voiture
                </div>
            </div>

            <form action="./ajouteVoiture.php" method="POST" target="newCarSubmitPage" enctype="multipart/form-data">

                <div class="pairs">
                    <div class="search-input">
                        <div class="search-div">
                            <label for="immatriculationVoiture">Matricule</label>
                            <input class="newCarInput" required id="immatriculationVoiture" placeholder="Matricule" name="immatriculationVoiture" type="text">
                        </div>
                    </div>
                    <div class="search-input">
                        <div class="search-div">
                            <label for="marqueVoiture">La marque</label>
                            <input class="newCarInput" required id="marqueVoiture" placeholder="La marque" name="marqueVoiture" type="text">
                        </div>
                    </div>
                </div>
                <div class="pairs">
                    <div class="search-input">
                        <div class="search-div">
                            <label for="modelVoiture">Model</label>
                            <input class="newCarInput" required id="modelVoiture" placeholder="Model" name="modelVoiture" type="text">
                        </div>
                    </div>
                    <div class="search-input">
                        <div class="search-div">
                            <label for="carburantVoiture">Carburant</label>
                            <input class="newCarInput" required id="carburantVoiture" placeholder="Carburant" name="carburantVoiture" type="text">
                        </div>  
                    </div>
                </div>

                <div class="pairs">
                    <div class="search-input">
                        <div class="search-div">
                            <label for="dateCirculaireVoiture">Date circulaire</label>
                            <input class="newCarInput" required id="dateCirculaireVoiture" placeholder="Date circulaire" name="dateCirculaireVoiture" type="date">
                        </div>
                    </div>
                    <div class="search-input">
                        <div class="search-div">
                            <label for="prixParJourVoiture">Prix/Jour</label>
                            <input class="newCarInput" required id="prixParJourVoiture" placeholder="Prix/Jour" name="prixParJourVoiture" type="text">
                        </div>  
                    </div>
                </div>
                <div class="pairs">
                    <div class="search-input">
                        <div class="search-div">
                            <label for="kilometrageVoiture">Kilometrage</label>
                            <input class="newCarInput" required id="kilometrageVoiture" placeholder="Kilometrage" name="kilometrageVoiture" type="text">
                        </div>
                    </div>
                    <div class="search-input">
                        <div class="search-div">
                            <label for="dateVignetteVoiture">Date de vignette</label>
                            <input class="newCarInput" required id="dateVignetteVoiture" placeholder="Date de vignette" name="dateVignetteVoiture" type="date">
                        </div>  
                    </div>
                </div>
                <div class="pairs">
                    <div class="search-input">
                        <div class="search-div">
                            <label for="totalVignetteVoiture">Total de vignette</label>
                            <input class="newCarInput" required id="totalVignetteVoiture" placeholder="Total de vignette" name="totalVignetteVoiture" type="text">
                        </div>
                    </div>
                    <div class="search-input">
                        <div class="search-div">
                            <label for="alertVignetteVoiture">Alert de vignette</label>
                            <input class="newCarInput" required id="alertVignetteVoiture" placeholder="Alert de vignette" name="alertVignetteVoiture" type="number">
                        </div>  
                    </div>
                </div>
                <div class="pairs">
                    <div class="search-input">
                        <div class="search-div">
                            <label for="imagesVoiture">Images</label>
                            <input class="newCarInput" id="imagesVoiture" placeholder="Images" name="imagesVoiture" type="file">
                        </div>  
                    </div>
                </div>
                <div class="uploaded-img">
                    <div class="image-container" id="previewContainer">
                        <img src="" alt="Aperçu des images" class="image-preview__image">
                        <span class="image-preview__default-text">Aperçu d'image</span>
                    </div>
                </div>

                <div class="footer btn-sect">
                    <button class="submit" type="submit" onclick="submitNewCarData(this.parentNode.parentNode)">Enregistrer</button>
                    <button class="reset" id="resetCarInfo" type="reset">Reset</button>
                </div>

            </form>

        </div>
    </div>


    <div class="gest-container gest-voitures-container">
        <div class="header">
            <div class="ajouteVoiture btn-sect">
                <button onclick="openPopUp('CarAddLayer');loadCarImages()">Ajouter une voiture</button>
                <button onclick="chartsWaiter();openPopUp('statisticSectionLayer carGestStatistic')">Statistiques</button>
            </div>
        </div>

        <!-- Gestion de list des voitures -->
        <div class="body consultation-voiture">
            <div onkeyup="carsSearchBarListner()" onclick="carsSearchBarListner()" class="search-bar">
                <div class="search-input">
                    <div class="search-div">
                        <label for="searchByBrand">La marque</label>
                        <input onclick="emptyInput(this)" id="searchByBrand" placeholder="La marque" name="searchByBrand" list=listMarque>
                    </div>
                </div>
                <div class="search-input">
                    <div class="search-div">
                        <label for="searchByRegNum">Matricule</label>
                        <input onclick="emptyInput(this)" id="searchByRegNum" placeholder="Matricule" name="searchByRegNum" list="listMatricule">
                    </div>
                </div>
                <div class="search-input">
                    <div class="search-div">
                        <label>Status</label>
                        <div class="radioInput" onclick="carsSearchBarListner()">
                            <input id="tous"  placeholder="Tous" name="car-status" value="Tous" type="radio" checked>
                            <label for="tous">Tous</label>
                            <input id="libre" placeholder="Libre" name="car-status" value="Libre" type="radio">
                            <label for="libre">Libre</label>
                            <input id="loue"  placeholder="Loué" name="car-status" value="Loué" type="radio">
                            <label for="loue">Loué</label>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="carsTabSection">
                <div class="emptyCarsTable hidden">
                    aucune voiture n'est correspondante aux valeurs entrées
                </div>
                <table id="cars-table">
                        <!--      Affichage de liste des voitures           -->
                </table>
            </div>
        </div>

        <!-- Consultation des voitures -->
        <div class="body consultation-voiture hidden" id="cons-Voiture" data-codeVoiture="">
            <div class="info-header">
                <div onclick="closeConsultation('consultation-voiture')" class="closeBtn closeConsultation">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                </div>
            </div>
            <div style="overflow: auto;" class="info-container">
                <form method="post" action="miseAJourVoiture.php" id="carDataForm" target="carNewDataForm" enctype="multipart/form-data">
                <div class="info-reservation">Consultaion de Voiture</div>
                <div class="res-info">

                    <div class="res-info-child">
                        <div class="input-div search-div">
                            <label for="vo-marque">La marque</label>
                            <input class="vo-input" required id="vo-marque" placeholder="La marque" name="vo-marque" disabled type="text">
                        </div>
                        <div class="input-div search-div">
                            <label for="vo-model">Model</label>
                            <input class="vo-input" required id="vo-model" placeholder="Model" name="vo-model" disabled type="text">
                        </div>
                        <div class="input-div search-div">
                            <label for="vo-dateCirculaire">Date circulare</label>
                            <input class="vo-input" required id="vo-dateCirculaire" placeholder="Date circulare" name="vo-dateCirculaire" disabled type="date">
                        </div>
                        <div class="input-div search-div">
                            <label for="vo-kilometrage">Kilometrage</label>
                            <input class="vo-input" required id="vo-kilometrage" placeholder="Kilometrage" name="vo-kilometrage" disabled type="">
                        </div>
                    </div>
                    
                    <div class="res-status">
                        <div class="input-div search-div">
                            <label for="info-div">Status</label>
                            <input class="info-div" id="vo-status" placeholder="Status" name="vo-status" disabled type="text">
                        </div>
                        <div class="input-div search-div">
                            <label for="vo-carburant">Carburant</label>
                            <input class="vo-input" required id="vo-carburant" placeholder="Carburant" name="vo-carburant" disabled type="text">
                        </div>
                        <div class="input-div search-div">
                            <label for="vo-prixParJour">Prix par jour</label>
                            <input class="vo-input" required id="vo-prixParJour" placeholder="Prix par jour" name="vo-prixParJour" disabled type="text">
                        </div>
                        <div class="input-div search-div">
                            <label for="vo-images">Image de voiture</label>
                            <input class="vo-input" id="vo-images" placeholder="Image de voiture" name="vo-images" disabled type="file">
                        </div>
                        <div class="input-div hidden">
                            <input class="info-div" required id="vo-codeVoiture" value="" name="vo-codeVoiture" type="number">
                        </div>
                        <div class="input-div modDon-div">
                            <div onclick="showConfirmBtn()" class="modDon-btn">Modifier les données</div>                            
                        </div>
                        <button id="sub-vo-btn" style="display:none" type="submit">click</button>
                        <div class="input-div conf-btn hidden">
                            <span>Enregistrer les modifications</span>
                            <div class="resp-div">
                                <label onclick="submitCarData()" class="resp-btn">Oui</label>
                                <div onclick="showConfirmBtn();loadConsVoiture(null)" id="noModBtn" class="resp-btn">Non</div>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
                <div class="vid-cont">
                    <div class="info-reservation">Vidange de voiture</div>
                    <div onclick="openVidForm()" class="resp-btn ajoute-btn">Ajouter un vidange</div>      
                    <div class="nv-vidange hidden">
                        <form class="res-info-child" method="POST" action="ajouteVidange.php" target="newVidDataSubmit" id="newVidForm">
                            <div class="input-div search-div">
                                <!--  dateVidange  dureeVidange	dureeActuelVidange	prixVidange	alertVidange	codeVoiture	 -->
                                <label for="dateVidange">La date de vidange</label>
                                <input required class="vd-input" id="dateVidange" placeholder="La date de vidange" name="dateVidange" type="date">
                                <input required class="vd-input hidden" id="codeVoitureVid" name="codeVoitureVid" type="number">
                            </div>
                            <div class="input-div search-div">
                                <label for="dureeVidange">Type de vidange (Kilometres)</label>
                                <input required class="vd-input" id="dureeVidange" placeholder="Type de vidange" name="dureeVidange" type="number">
                            </div>
                            <div class="input-div search-div">
                                <label for="dureeActuelVidange">Kilometrage actuel</label>
                                <input required class="vd-input" id="dureeActuelVidange" placeholder="Kilometrage actuel" name="dureeActuelVidange" type="number">
                            </div>
                            <div class="input-div search-div">
                                <label for="prixVidange">Prix de vidange</label>
                                <input required class="vd-input" id="prixVidange" placeholder="Prix de vidange" name="prixVidange" type="number">
                            </div>
                            <div class="input-div search-div">
                                <label for="alertVidange">Alert de vidange (kilometres)</label>
                                <input required class="vd-input" id="alertVidange" placeholder="Alert de vidange" name="alertVidange" type="number">
                            </div>
                        </form>
                    </div>
                    <div class="vid-footer hidden">
                        <div onclick="submitVidData()" class="resp-btn eng-btn">Enregistrer</div>
                        <div title="Sortir" class="close-btn eng-btn"><i class="fa-solid fa-angles-up"></i></div>
                    </div>
                    <table class="vid-table">
                        <tr>
                            <th>Date de vidange</th>
                            <th>Type</th>
                            <th>Prix</th>
                            <th>État</th>
                        </tr>
                        <tr style="background-color: tomato;">
                            <td>13/07/2021</td>
                            <td>7000 Km</td>
                            <td>700 DH</td>
                            <td>Terminé</td>
                        </tr>
                        <tr style="background-color: orange;">
                            <td>13/07/2021</td>
                            <td>7000 Km</td>
                            <td>700 DH</td>
                            <td >+500 km</td>
                        </tr>
                        <tr>
                            <td>13/07/2021</td>
                            <td>7000 Km</td>
                            <td>700 DH</td>
                            <td style="color: #70AD47">+400 km</td>
                        </tr>
                    </table>         
                </div>
            </div>

        </div>


    </div>

    
    


    <datalist id="listMarque">
        <?php
            $table = mysqli_fetch_array($resultListMarque);
            if($table){
                echo"<option value=\"Tous\"> Tous </option>";
                while($table){
                        echo"<option value=\"".$table["marqueVoiture"]."\"> ".$table["marqueVoiture"]." </option>";
                        $table = mysqli_fetch_array($resultListMarque);
                }
            }
        ?>
    </datalist>

    <!-- <datalist id="listMatricule">
        <?php
            $table = mysqli_fetch_array($resultListMatricule);
            if($table){
                echo"<option value=\"Tous\"> Tous </option>";
                while($table){
                        echo"<option value=\"".$table["immatriculationVoiture"]."\"> ".$table["immatriculationVoiture"]." </option>";
                        $table = mysqli_fetch_array($resultListMatricule);
                }
            }
        ?>
    </datalist> -->
</div>