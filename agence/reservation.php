<?php
    include "../connexion.php";
    $requeteListVoiture = " SELECT codeVoiture, CONCAT(marqueVoiture,'-',modelVoiture,'-',immatriculationVoiture) AS nomVoiture FROM voiture WHERE NOT EXISTS ( SELECT * FROM reservation WHERE reservation.codeVoiture = voiture.CodeVoiture AND etatReservation = 'loué'  ) AND codeAgence = ".$_SESSION["codeAgence"];
    $donneesListVoiture = mysqli_query($connexion, $requeteListVoiture);

    if(! $donneesListVoiture){
        die ("Erreur: pendant la selection des voitures & reservations");
    }
?>


<div data-id="reservation" class="main-body hidden-service">
    <form method="POST" action="ajouteReservation.php" class="reservation">
        <div class="res-body">


            <div class="detail-div">
                <div onclick="actionDetailSection(this)" data-isChecked="true" class="detail-header ">
                    <span>Details de client</span>
                    <i class="fa-solid fa-caret-left"></i>
                </div>

                <div class="detail-body">
                    <div class="input-body">

                        <div class="section">
                            
                            <div class="input-div">
                                <label for="typeClient">Client</label>
                                <select required id="typeClient" placeholder="Client" name="typeClient" type="text">
                                    <option value="null">Nouveau client</option>
                                    <option value="-1">Inscrit</option>
                                </select>
                            </div>
                            <div class="input-div">
                                <label for="identiteClient">N° d'identité</label>
                                <input required id="identiteClient" placeholder="N° d'identité" name="identiteClient" type="text">
                            </div>
                            <div class="input-div">
                                <label for="typeIdentiteClient">Type de piece d'identité</label>
                                <select required id="typeIdentiteClient" placeholder="Type de piece d'identité" name="typeIdentiteClient" type="text">
                                    <option value="CIN">Cart d'identité</option>
                                    <option value="Passe port">Passe port</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="section">
                            <div class="input-div">
                                <label for="nomClient">Nom</label>
                                <input required id="nomClient" placeholder="Nom" name="nomClient" type="text">
                            </div>
                            <div class="input-div">
                                <label for="prenomClient">Prénom</label>
                                <input required id="prenomClient" placeholder="Prénom" name="prenomClient" type="text">
                            </div>
                            <div class="input-div">
                                <label for="sexeClient">Sexe</label>
                                <select required id="sexeClient" placeholder="Sexe" name="sexeClient" type="text">
                                    <option value="homme">Homme</option>
                                    <option value="femme">Femme</option>
                                </select>
                            </div>
                            
                        </div>
                        
                        <div class="section">
                            <div class="input-div">
                                <label for="emailClient">Email</label>
                                <input required id="emailClient" placeholder="Email" name="emailClient" type="email">
                            </div>
                            <div class="input-div">
                                <label for="numTelClient">N° de portabe</label>
                                <input required id="numTelClient" placeholder="N° de portabe" name="numTelClient" type="tel">
                            </div>
                            <div class="input-div">
                                <label for="dateNaissanceClient">Date de naissance</label>
                                <input required id="dateNaissanceClient" placeholder="Date de naissance" name="dateNaissanceClient" type="date">
                            </div>
                        </div>
                        
                        <div class="section">
                            <div class="input-div">
                                <label for="nationaliteClient">Nationalité</label>
                                <input required id="nationaliteClient" placeholder="Nationalité" name="nationaliteClient" type="text">
                            </div>
                            <div class="input-div">
                                <label for="villeClient">Ville</label>
                                <input required id="villeClient" placeholder="Ville" name="villeClient" type="text">
                            </div>
                            <div class="input-div">
                                <label for="regionClient">Région</label>
                                <input required id="regionClient" placeholder="Région" name="regionClient" type="text">
                            </div>
                        </div>

                        <div class="section">
                            <div class="input-div">
                                <label for="adresseClient">Adresse</label>
                                <input required id="adresseClient" placeholder="Adresse" name="adresseClient" type="text">
                            </div>
                            <div class="input-div">
                                <label for="numPermisClient">N° de permis</label>
                                <input required id="numPermisClient" placeholder="N° de permis" name="numPermisClient" type="text">
                            </div>
                        </div>

                    </div>
                </div>

            </div>
            <div class="detail-div hidden-div">
                <div onclick="actionDetailSection(this);" data-isChecked="false" class="detail-header">
                    <span>Details de voiture</span>
                    <i class="fa-solid fa-caret-left"></i>
                </div>
                <div class="detail-body">
                    <div class="input-body">

                        <div class="section">

                            <div class="input-div">
                                <label for="voitureLoue">Voiture</label>
                                <select  required id="voitureLoue" onmousedown="loadFreeCars()" placeholder="Voiture" name="codeVoiture">
                                    
                                    <!-- <?php
                                        while($tableListVoiture = mysqli_fetch_array($donneesListVoiture)){
                                            echo "
                                                <option data-codeVoiture='loadCarPreview(\"".$tableListVoiture["codeVoiture"]."\")' value=\"".$tableListVoiture["nomVoiture"]."\" > ".$tableListVoiture["nomVoiture"]." </option>

                                            ";
                                        }
                                    ?> -->
                                </select>
                            </div>
                            <div class="carData">
                                <div class="imagePreview">
                                    <img src="" alt="Aperçu des images" id="car-preview__image">
                                    <span id="car-preview__default-text">Aperçu d'image de voiture</span>
                                </div>
                                <div class="resCarInfo">
                                    <table>
                                        <tr>
                                            <th>Marque</th>
                                            <th>Modele</th>
                                            <th>Immatricule</th>
                                            <th>Prix/jour</th>
                                        </tr>
                                        <tr>
                                            <td id="marqueVoiture">Marque</td>
                                            <td id="modelVoiture">Model</td>
                                            <td id="immatriculeVoiture">Immatricule</td>
                                            <td id="ppjTabVoiture">Prix/jour</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            

                        </div>


                    </div>
                </div>
            </div>

            <div class="detail-div hidden-div">
                <div onclick="actionDetailSection(this);setInterval(checkReservationData,500);" data-isChecked="false" class="detail-header">
                    <span>Details de location</span>
                    <i class="fa-solid fa-caret-left"></i>
                </div>
                <div class="detail-body">
                    <div class="input-body">

                        <div class="section">

                            <div class="input-div">
                                <label for="dateDepartReservation">Date de départ</label>
                                <input required id="dateDepartReservation" placeholder="Date de départ" name="dateDepartReservation" type="date">
                            </div>
                            <div class="input-div">
                                <label for="dateRetourReservation">Date de retour</label>
                                <input required id="dateRetourReservation" placeholder="Date de retour" name="dateRetourReservation" type="date">
                            </div>
                            <div class="input-div">
                                <label for="nombreJours">Nombre de jours</label>
                                <input required id="nombreJours" placeholder="Nombre de jours" name="nombreJours" value="0" readonly type="text">
                            </div>

                        </div>

                        <div class="section">

                            <div class="input-div">
                                <label for="lieuDepartReservation">Lieu de Départ</label>
                                <select required id="lieuDepartReservation" placeholder="Lieu de Départ" name="lieuDepartReservation">
                                    <option value="agence"> agence </option>
                                </select>
                            </div>
                            <div class="input-div">
                                <label for="lieuRetourReservation">Lieu de Retour</label>
                                <select required id="lieuRetourReservation" placeholder="Lieu de Retour" name="lieuRetourReservation">
                                    <option value="agence"> agence </option>
                                </select>
                            </div>
                            <div class="input-div">
                                <label for="prixParJourVoitureRes">Prix par jour</label>
                                <input readonly id="prixParJourVoitureRes" placeholder="Prix par jour" name="prixParJourVoitureRes" type="text">
                            </div>

                        </div>

                        <div class="section">

                            <div class="input-div">
                                <label for="totalPaiement">total TTC</label>
                                <input readonly id="totalPaiement" placeholder="total TTC" name="totalPaiement" type="text">
                            </div>  
                            <div class="input-div">
                                <label for="avancePaiement">Avance</label>
                                <input required id="avancePaiement" placeholder="Avance" name="avancePaiement" type="text">
                            </div>
                            <div class="input-div">
                                <label for="methodePaiement">Methode de paiement</label>
                                <select required id="methodePaiement" placeholder="Methode de paiement" name="methodePaiement">
                                    <option value="Espéce"> Espéce </option>
                                    <option value="Chéque"> Chéque </option>
                                    <option value="Carte bancaire"> Carte bancaire </option>
                                    <option value="Virement bancaire"> Virement bancaire </option>
                                </select>
                            </div>

                        </div>

                        <div class="section">

                            <div class="input-div">
                                <label for="prenomPersonnelRes">L'agent commercial</label>
                                <input required id="prenomPersonnelRes" disabled placeholder="L'agent commercial" type="text">
                                <input class="hidden" id="codePersonnelRes" required placeholder="L'agent commercial" name="codePersonnelRes" value=10 type="text">
                            </div>
                        </div>


                    </div>
                </div>
            </div>



        </div>
                                


        <div class="footer btn-sect">
            <button class="submit" type="submit">Enregistrer</button>
            <button class="reset" type="reset">Reset</button>
        </div>
    </form>
</div>