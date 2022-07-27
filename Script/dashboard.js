// const { image } = require("html2canvas/dist/types/css/types/image");
// const { text } = require("stream/consumers");

//display & hide account menu
function actionMenu(){
    let menu = document.getElementsByClassName("menu-drop-down")[0];
    if(menu.getAttribute("class") == "menu-drop-down hidden")
        menu.setAttribute("class","menu-drop-down");
    else
    menu.setAttribute("class","menu-drop-down hidden");
}

function actionService(service){
    //change body section to the selected service
    //remove the check from the old service and check the new one
    let serviceSection = document.querySelectorAll(`[data-id="${service}"]`);
    let services = document.getElementsByClassName("main-body");
    let servicesBtn = document.getElementsByClassName("panel-item");
    for( i = 0; i< services.length; i++){
        services[i].setAttribute("class","main-body hidden-service");
        servicesBtn[i].setAttribute("class","panel-item");
    }
    serviceSection[1].setAttribute("class","main-body");
    serviceSection[0].setAttribute("class","panel-item checked-service");
    sessionStorage.setItem("curPage",service);
}

// Section de reservation rapide
function actionDetailSection(sectionHeader){
    let handler = sectionHeader.getAttribute("data-isChecked");
    //if we want to close a section so no need to open the others
    if(handler=="true")
    {
        sectionHeader.parentNode.setAttribute("class","detail-div hidden-div");
        sectionHeader.setAttribute("data-isChecked","false");
    }
    //if we want to open a section we need to make sure to close the outhers
    else
    {
        let sections = document.getElementsByClassName("detail-div");
        for(i = 0; i < sections.length; i++){
            sections[i].setAttribute("class","detail-div hidden-div");
            sections[i].firstElementChild.setAttribute("data-isChecked","false");
        }
        sectionHeader.parentNode.setAttribute("class","detail-div");
        sectionHeader.setAttribute("data-isChecked","true");
    }
}

// filterBy will filter a table of items based on the inputs 
// that will be by hidding non-wanted items 
function filterBy(input,selectedClass,itemsName,filterType){

    //Hidde item which selected class != item's class
    let item = document.getElementsByClassName(selectedClass);
    if(input && input != "Tous"){
        for(let i = 0; i < item.length; i++){
            console.log("Debug : (filterBy) case: "+(i+1)+" | filterType: "+filterType);
            switch( filterType ){
                case "normal" : 
                    if( !item[i].innerHTML.toLowerCase().includes(input.toLowerCase()) )
                        item[i].parentNode.setAttribute("class",itemsName+" hidden");
                    break;
                case "strict" : 
                    if( !(item[i].innerHTML.toLowerCase() == input.toLowerCase()) )
                        item[i].parentNode.setAttribute("class",itemsName+" hidden");
                    break;
                case "date-higher" : 
                    let itemDepartDate = new Date( item[i].innerHTML );
                    let inputDepartDate= new Date( input );
                    itemDepartDate = itemDepartDate.getTime();
                    inputDepartDate= inputDepartDate.getTime();
                    let betweenDepartDate = (itemDepartDate - inputDepartDate)/(1000*3600*24);
                    if( betweenDepartDate < -1 )
                        item[i].parentNode.setAttribute("class",itemsName+" hidden");
                    else console.log("Debug : betweenDepartDate = "+betweenDepartDate);
                    break;
                case "date-lower" : 
                    let itemRetourDate = new Date( item[i].innerHTML );
                    let inputRetourDate= new Date( input );
                    itemRetourDate = itemRetourDate.getTime();
                    inputRetourDate= inputRetourDate.getTime();   
                    let betweenRetourDate = (itemRetourDate - inputRetourDate)/(1000*3600*24);
                    if( betweenRetourDate > 0 )
                        item[i].parentNode.setAttribute("class",itemsName+" hidden");
                    break;
            }
        }
    }
}

function emptyInput(input){
    input.value=null;
}




//Load "les voitures libres" 
function loadFreeCars(){
    let dropDownList = document.getElementById("voitureLoue");
    let dispoList = mainData.agence.voiture.freeCarsList() ;
    dropDownList.innerHTML=`<option value="NaN" selected>Choisir votre voiture</option>`;
    //if there are free cars
    if(dispoList.length != 0){
        for( let i = 0; i < dispoList.length; i++){
            if(dispoList[i] == null)
                continue;
            let value = dispoList[i].marqueVoiture+" | "+dispoList[i].modelVoiture+" | "+dispoList[i].immatriculationVoiture;
            dropDownList.innerHTML = dropDownList.innerHTML + `
                <option onclick="loadCarPreview(${dispoList[i].codeVoiture})" value="${dispoList[i].codeVoiture}" > ${value} </option>
            `;
        }
    }
    else{
        let input = document.getElementById("voitureLoue");
        input.innerHTML= `<option selected value="aucune" >Le garage est vide</option>`;
        input.disabled=true;
    }

    // load car image preview and infos
    document.getElementById("voitureLoue").addEventListener("change",function(){
        let imagePreview = document.getElementById("car-preview__image");
        let textPreview  = document.getElementById("car-preview__default-text");
        imagePreview.style.display="inline";
        textPreview.style.display="none";
        imagePreview.setAttribute("src",mainData.agence.voiture[this.value].imagesVoiture);
        // console.log(mainData.agence.voiture[this.value]);
        // Load infos
        let marqueVoiture = document.getElementById("marqueVoiture").innerHTML = mainData.agence.voiture[this.value].marqueVoiture;
        let modeleVoiture = document.getElementById("modelVoiture").innerHTML = mainData.agence.voiture[this.value].modelVoiture;
        let immatriculeVoiture = document.getElementById("immatriculeVoiture").innerHTML = mainData.agence.voiture[this.value].immatriculationVoiture;
        let prixParJourVoiture = document.getElementById("ppjTabVoiture").innerHTML = mainData.agence.voiture[this.value].prixParJourVoiture+" MAD";

    })
}
function checkReservationData(){
    //Generate the agent name and generate "codePersonnel"
    let prenomPersonnel = document.getElementById("prenomPersonnelRes");
    let codePersonnel = document.getElementById("codePersonnelRes");
    let datePaiementRes = document.getElementById("datePaiementRes");
    prenomPersonnel.value = mainData.personnel.prenomPersonnel;
    codePersonnel.value = mainData.personnel.codePersonnel;
    // check payment date
    datePaiementRes.value = (new Date()).toISOString().split('T')[0];
    //Check and Calculate the difference between two dates
    let dateDepart = document.getElementById("dateDepartReservation");
    let dateRetour = document.getElementById("dateRetourReservation");
    let difference;
    if( dateDepart.value.length==10 && dateRetour.value.length==10 ){
        let dateDepartObj = new Date(dateDepart.value);
        let dateRetourObj = new Date(dateRetour.value);
        difference = (dateRetourObj.getTime() - dateDepartObj.getTime())/(1000*3600*24);
        let nombreJours = document.getElementById("nombreJours");
        if(difference>0){
            nombreJours.value = difference;
        }
        else{
            nombreJours.value = "";
            nombreJours.placeholder = "les dates sont incompatibles";
        }
    }
    //get "codeVoiture" , load "prix par jour" and calculat "total TTC"
    let codeVoiture = document.getElementById("voitureLoue").value;
    let inputPrixParJour = document.getElementById("prixParJourVoitureRes");
    let inputTTC = document.getElementById("totalPaiement");
    // Load cur kilometrage if there is a selected car
    if(!isNaN(codeVoiture))
        document.getElementById("kilometrageReservation").value = mainData.agence.getVoiture(codeVoiture).kilometrageVoiture;
    // check if code is a number or not
    if( !isNaN(codeVoiture) && codeVoiture!=""){
        inputPrixParJour.value = mainData.agence.voiture[codeVoiture].prixParJourVoiture + " MAD";
        //Calculat TTC
        let TTC = (difference>0)? difference*mainData.agence.voiture[codeVoiture].prixParJourVoiture : 0;
        inputTTC.value = TTC + " MAD";
    }else{
        inputPrixParJour.value = "";
        inputPrixParJour.placeholder = "Prix par jour"; 
        inputTTC.value = "";
        inputTTC.placeholder = "total TTC";
    }
}

//Form Falidation
function formValidation(){
    console.log("formValidation");
    return "ajouteReservation.php";
}
function loadClientInfo(){
    // console.log("Debug: loadClientInfo() running");
    let identite = document.getElementById("identiteClient").value;
    let client = mainData.agence.client.getClient(identite);
    let codeClient = document.getElementById("typeClient").value;
    let codeInscrit = document.getElementById("typeClient").options[1];
    let typeIdentiteClient = document.getElementById("typeIdentiteClient");
    let nomClient = document.getElementById("nomClient");
    let prenomClient = document.getElementById("prenomClient");
    let sexeClient = document.getElementById("sexeClient");
    let emailClient = document.getElementById("emailClient");
    let numTelClient = document.getElementById("numTelClient");
    let dateNaissanceClient = document.getElementById("dateNaissanceClient");
    let nationaliteClient = document.getElementById("nationaliteClient");
    let villeClient = document.getElementById("villeClient");
    let regionClient = document.getElementById("regionClient");
    let adresseClient = document.getElementById("adresseClient");
    let numPermisClient = document.getElementById("numPermisClient");
    let exIdentiteClient = document.getElementById("exIdentiteClient");
    let exNumPermisClient = document.getElementById("exNumPermisClient");

    if(codeClient != "null"){
        typeIdentiteClient.disabled = true; 
        nomClient.disabled = true; 
        prenomClient.disabled = true; 
        sexeClient.disabled = true; 
        emailClient.disabled = true; 
        numTelClient.disabled = true; 
        dateNaissanceClient.disabled = true; 
        nationaliteClient.disabled = true; 
        villeClient.disabled = true; 
        regionClient.disabled = true; 
        adresseClient.disabled = true; 
        numPermisClient.disabled = true; 
        exIdentiteClient.disabled = true;
        exNumPermisClient.disabled = true;
        if(client){
            typeIdentiteClient.value = client.typeIdentiteClient;
            nomClient.value = client.nomClient;
            prenomClient.value = client.prenomClient;
            sexeClient.value = client.sexeClient;
            emailClient.value = client.emailClient;
            numTelClient.value = client.numTelClient;
            dateNaissanceClient.value = client.dateNaissanceClient;
            nationaliteClient.value = client.nationaliteClient;
            villeClient.value = client.villeClient;
            regionClient.value = client.regionClient;
            adresseClient.value = client.adresseClient;
            numPermisClient.value = client.numPermisClient;
            codeInscrit.value = client.codeClient;
            exIdentiteClient.value = client.exIdentiteClient;
            exNumPermisClient.value = client.exNumPermisClient;
        }
        else{
            typeIdentiteClient.readOnly = false;
            nomClient.readOnly = false; nomClient.value = null ; 
            prenomClient.readOnly = false; prenomClient.value = null ; 
            sexeClient.readOnly = false; 
            emailClient.readOnly = false; emailClient.value = null ; 
            numTelClient.readOnly = false; numTelClient.value = null ; 
            dateNaissanceClient.readOnly = false; dateNaissanceClient.value = null ; 
            nationaliteClient.readOnly = false; nationaliteClient.value = null ; 
            villeClient.readOnly = false; villeClient.value = null ; 
            regionClient.readOnly = false; regionClient.value = null ; 
            adresseClient.readOnly = false; adresseClient.value = null ; 
            numPermisClient.readOnly = false; numPermisClient.value = null ; 
            exIdentiteClient.readOnly = false; exIdentiteClient.value = null;
            exNumPermisClient.readOnly = false; exNumPermisClient.value = null;
            codeInscrit.value = "-1";
        }
    }
    else{
        exIdentiteClient.disabled = false;
        exNumPermisClient.disabled = false;
        typeIdentiteClient.disabled = false;
        nomClient.disabled = false; 
        prenomClient.disabled = false; 
        sexeClient.disabled = false; 
        emailClient.disabled = false; 
        numTelClient.disabled = false; 
        dateNaissanceClient.disabled = false; 
        nationaliteClient.disabled = false; 
        villeClient.disabled = false; 
        regionClient.disabled = false; 
        adresseClient.disabled = false; 
        numPermisClient.disabled = false; 
        codeInscrit.value = "-1";
    }
}


// Consultation
// open consultation container
function closeConsultation(containerName){
    let body = document.getElementsByClassName(containerName);
    body[1].setAttribute("class","body "+containerName+" hidden");
    body[0].setAttribute("class","body "+containerName);
}

// open consultation container
function openConsultation(containerName){
    let body = document.getElementsByClassName(containerName);
    body[0].setAttribute("class","body "+containerName+" hidden");
    body[1].setAttribute("class","body "+containerName);
}


// Generate "Account" Info
function generateAccountDetails(){
    let servicePersonnel = document.getElementById("servicePersonnelAcc");
    let nomCPersonnel = document.getElementById("nomCPersonnelAcc");
    let prenomPersonnel = document.getElementById("prenomPersonnelAcc");
    let nomPersonnel = document.getElementById("nomPersonnelAcc");
    let NCNSSPersonnel = document.getElementById("NCNSSPersonnelAcc");
    let dateEntrePersonnel = document.getElementById("dateEntrePersonnelAcc");
    let emailUtilisateur = document.getElementById("emailUtilisateurAcc");
    let salairePersonnel = document.getElementById("salairePersonnelAcc");
    let portablePersonnel = document.getElementById("portablePersonnelAcc");
    let codePersonnel = document.getElementById("codePersonnelAcc");
    let nomAgence = document.getElementById("nomAgenceAg");
    let nomCAgence = document.getElementById("nomCAgenceAg");
    let adresseAgence = document.getElementById("adresseAgenceAg");
    let villeAgence = document.getElementById("villeAgenceAg");
    let paysAgence = document.getElementById("paysAgenceAg");
    let teleFixAgence = document.getElementById("teleFixAgenceAg");
    let iceAgence = document.getElementById("iceAgenceAg");
    let codeAgence = document.getElementById("codeAgenceAg");

    // Account informations
    servicePersonnel.innerHTML = (mainData.personnel.servicePersonnel == "administrateur") ? "Admin" : "Agent";
    servicePersonnel.style = (mainData.personnel.servicePersonnel == "administrateur") ? "color: #7DFFA8" : "color: #6339E5";
    nomCPersonnel.innerHTML = mainData.personnel.prenomPersonnel + " " + mainData.personnel.nomPersonnel;
    prenomPersonnel.value = mainData.personnel.prenomPersonnel;
    nomPersonnel.value = mainData.personnel.nomPersonnel;
    NCNSSPersonnel.value = mainData.personnel.NCNSSPersonnel;
    dateEntrePersonnel.value = mainData.personnel.dateEntrePersonnel;
    emailUtilisateur.value = mainData.utilisateur.emailUtilisateur;
    salairePersonnel.value = mainData.personnel.salairePersonnel;
    portablePersonnel.value = mainData.personnel.portablePersonnel;
    codePersonnel.value = mainData.personnel.codePersonnel;
    // Agency informations
    nomAgence.value = mainData.agence.nomAgence;
    nomCAgence.innerHTML = mainData.agence.nomAgence;
    adresseAgence.value = mainData.agence.adresseAgence;
    villeAgence.value = mainData.agence.villeAgence;
    paysAgence.value = mainData.agence.paysAgence;
    teleFixAgence.value = mainData.agence.teleFixAgence;
    iceAgence.value = mainData.agence.iceAgence;
    codeAgence.value = mainData.agence.codeAgence;
}

// Change account info
function editAccDetail(){
    let editAccBtn = document.getElementsByClassName("modDon-btn")[0];
    let saveSect = document.getElementsByClassName("btn-section")[0];
    let noBtn = document.getElementsByClassName("noBtn")[0];
    let yesBtn = document.getElementsByClassName("yesBtn")[0];
    let listInputs = document.querySelectorAll(".acc-input");
    let form = document.getElementById("acc-edit-form");
    let errorStyle = "border-left: 4px solid rgb(202, 86, 65);outline:none;";
    let correctStyle = "border-left: 4px solid #45af69;outline:none;";

    editAccBtn.setAttribute("class","modDon-btn hidden");
    saveSect.setAttribute("class","btn-section");  

    // Define a function that will check validity of the form and submit the data
    let submitAccData = function(){
        // Check if all inputs are not empty
        let checkHandler = true;
        listInputs.forEach( input => {
            if( input.value ) 
                input.style = correctStyle;
            else{
                input.style = errorStyle;
                checkHandler = false;
            }
        } );

        if(checkHandler && form.checkValidity()){
            runIFrame("accEditFormPage", "#", 5);
            form.submit();
            setTimeout(function(){checkMainData();},1000);
            setTimeout(function(){noBtn.click()},2000);
        }
    }

    // Enable inputs
    listInputs.forEach( input => {
        input.disabled = false; 
    } );

    // Reset account data
    noBtn.addEventListener("click",function(){
        yesBtn.removeEventListener("click", submitAccData)
        editAccBtn.setAttribute("class","modDon-btn");
        saveSect.setAttribute("class","btn-section hidden");  
        generateAccountDetails();
        listInputs.forEach( input => {
            input.disabled = true; 
            input.style = null; 
        } );
    });
    
    // Submit data
    yesBtn.addEventListener("click", submitAccData);
}

// Edit agency details
function editAgDetail(){
    let editAgBtn = document.getElementsByClassName("modDon-Ag-btn")[0];
    let saveSect = document.getElementsByClassName("btn-Ag-section")[0];
    let noBtn = document.getElementsByClassName("noAgBtn")[0];
    let yesBtn = document.getElementsByClassName("yesAgBtn")[0];
    let listInputs = document.querySelectorAll(".ag-input");
    let form = document.getElementById("ag-edit-form");
    let errorStyle = "border-left: 4px solid rgb(202, 86, 65);outline:none;";
    let correctStyle = "border-left: 4px solid #45af69;outline:none;";
    editAgBtn.setAttribute("class","modDon-Ag-btn hidden");
    saveSect.setAttribute("class","btn-Ag-section"); 
    
    // Define a function that will check validity of the form and submit the data
    let submitAgData = function(){
        // Check if all inputs are not empty
        let checkHandler = true;
        listInputs.forEach( input => {
            if( input.value || !input.required) 
            input.style = correctStyle;
            else{
                input.style = errorStyle;
                checkHandler = false;
            }
        } );

        if(checkHandler && form.checkValidity()){
            runIFrame("AgEditFormPage", "#", 5);
            form.submit();
            setTimeout(function(){checkMainData();},1000);
            setTimeout(function(){noBtn.click()},2000);
        }
    }
    
    // Enable inputs
    listInputs.forEach( input => {
        input.disabled = false; 
    } );
    
    // Reset Account data
    noBtn.addEventListener("click",function(){
        yesBtn.removeEventListener("click", submitAgData)
        editAgBtn.setAttribute("class","modDon-Ag-btn");
        saveSect.setAttribute("class","btn-Ag-section hidden");   
        generateAccountDetails();
        listInputs.forEach( input => {
            input.disabled = true; 
            input.style = null; 
        } );
    });
    
    // Submit data
    yesBtn.addEventListener("click", submitAgData);

}

function runIFrame(name, url, duration){
    // Check if name exists or not
    if(document.getElementsByName(name).length) return false;
    let frameContainer = document.getElementsByClassName("frame-container")[0];
    frameContainer.innerHTML =  `
    <div class="frame-div ${name}">
        <div class="frame-body">
            <iframe src='${url}' class="frame" name="${name}" frameborder="0"></iframe>
            <div class="cls-frame cls-frame-${name}">
                <i class="fa-solid fa-xmark"></i>
            </div>
        </div>
        <div class="frame-footer"></div>
    </div>
    ` + frameContainer.innerHTML; 
    let frame = document.getElementsByClassName(name)[0];
    frame.getElementsByClassName("frame-footer")[0].style = `animation:  ${duration}s linear iframeAnim;`;
    let clsFrame = document.getElementsByClassName("cls-frame-"+name)[0];
    let settedTime = setTimeout(() => {
        let frame = document.getElementsByClassName(name)[0];
        frame.remove();
    }, duration*1000);
    
    clsFrame.addEventListener("click",function(){
        let frame = document.getElementsByClassName(name)[0];
        clearTimeout(settedTime);
        frame.remove();
    });
    return true;
}

// Notification's methods
function checkNotifTable(){
    let notifBill = document.getElementById("notif-bill");
    if(mainData.personnel.notification.list.length > 0){
        // change bill style
        notifBill.innerHTML = `
        <script src="https://cdn.lordicon.com/xdjxvujz.js"></script>
        <lord-icon
            src="https://cdn.lordicon.com/kjsfgazx.json"
            trigger="loop"
            delay="10000"
            colors="primary:#ffc171"
            style="width:40px;height:40px">
        </lord-icon>
        `;
    }
    else{
        // Change bill style
        notifBill.innerHTML = `
        <script src="https://cdn.lordicon.com/xdjxvujz.js"></script>
        <lord-icon
            src="https://cdn.lordicon.com/ndydpcaq.json"
            trigger=""
            style="width:40px;height:40px">
        </lord-icon>
        `;
    }
}
// load list of notifications
function loadNotifTable(){
    let table = document.getElementsByClassName("table-notif")[0];
    let listNotif = mainData.personnel.notification.list;
    let targetTitle;
    let targetDesc;
    let targetLink;
    // If there are unread notifications
    if(listNotif.length > 0){

        table.innerHTML = "";
        listNotif.forEach( notif => {
            
            let target = notif.nomRefTableNotification;
            switch(target){
                case "vidange" : {
                    let voiture = mainData.agence.voiture.getVoiture("vidange", notif.codeRefTableNotification);
                    let nomVoiture = voiture.marqueVoiture + " " + voiture.modelVoiture + " - " + voiture.immatriculationVoiture;
                    // If the vehicle critically needs oil change
                    if(voiture.getVidDetail().needVid){
                        targetTitle = `<span style="color: tomato">Durée de vidange est épuisé</span>`;
                        targetDesc = `<span>Durée de vidange pour la voiture <strong>${nomVoiture}</strong> est épuisé</span>`;
                    }
                    // otherwise
                    else{
                        targetTitle = `<span style="color: orange">Alert de vidange</span>`;
                        targetDesc = `<span>Alert de vidange pour la voiture <strong>${nomVoiture}</strong></span>`;
                    }
                    targetLink = "../agence/dashboard.php?page=gest-voitures&activeSection=activeVoSection&id=" + voiture.codeVoiture;
                    break;};
                case "res-non-pay" : {
                    let voiture = mainData.agence.voiture.getVoiture("reservation", notif.codeRefTableNotification);
                    let nomVoiture = voiture.marqueVoiture + " " + voiture.modelVoiture + " - " + voiture.immatriculationVoiture;
                    let client = mainData.agence.client[mainData.agence.getReservation(notif.codeRefTableNotification).codeClient];
                    let nomClient = client.prenomClient + ' ' + client.nomClient;
                    targetTitle = `<span style="color: tomato"> Paiement non complété </span>`;
                    targetDesc = `<span>Paiement de la reservation de la voiture <strong>${nomVoiture}</strong> par client: <strong>${nomClient}</strong> est Incomplet</span>`;
                    targetLink = "../agence/dashboard.php?page=gest-reservation&activeSection=activeResSection&id=" + notif.codeRefTableNotification;
                    break;};
                case "res-return" : {
                    let voiture = mainData.agence.voiture.getVoiture("reservation", notif.codeRefTableNotification);
                    let nomVoiture = voiture.marqueVoiture + " " + voiture.modelVoiture + " - " + voiture.immatriculationVoiture;
                    let reservation = mainData.agence.getReservation(notif.codeRefTableNotification);
                    let client = mainData.agence.client[mainData.agence.getReservation(notif.codeRefTableNotification).codeClient];
                    let nomClient = client.prenomClient + ' ' + client.nomClient;
                    targetTitle = `<span style="color: orange"> Alert de retour </span>`;
                    targetDesc = `<span>Alert de retour concernant la voiture <strong>${nomVoiture}</strong> réservé par client: <strong>${nomClient}</strong>. Retour le: <strong>${reservation.dateRetourReservation}</strong></span>`;
                    targetLink = "../agence/dashboard.php?page=gest-reservation&activeSection=activeResSection&id=" + notif.codeRefTableNotification;
                    break;};
            }
            
            table.innerHTML = `
            <div class="notif" data-codeNotification="${notif.codeNotification}">
                <div class="mod-notif hidden">
                    <div onclick="clearOneNotif(parentNode.parentNode)" title="Supprimer" class="cls-One-notif">
                        <i class="fa-solid fa-trash-can"></i>
                    </div>
                    <div class="conf-cls-notif-One hidden">
                        <i class="fa-solid fa-solid-emp fa-check yesClearOneNotif" title="Confirmer"></i>
                        <i class="fa-solid fa-solid-emp fa-xmark fa-xmark-emp noClearOneNotif" title="Annuler"></i>
                    </div>
                </div>
                <span class="notif-title">${targetTitle}</span><br>
                <span class="notif-desc">${targetDesc}</span><br>
                <a href="${targetLink}">Consulter <i class="fa-solid fa-up-right-from-square"></i></a>
            </div>
            ` + table.innerHTML

        } );
    }
    // otherwise
    else{
        // Enter empty table msg
        table.innerHTML = "<div style='width: 80%; font-family: calibri' class='emptyTableMsg'>Aucune notification pour le moment</div>";
    }   
}

// Submit data to notification table
let submitReturnNotif = function (){
    // List of cur reservations that needs notifacations alert
    let listReservation = Array();
    mainData.agence.getAlertRes().forEach( reservation => {
        if(!mainData.personnel.isNotifExists("res-return", reservation.codeReservation))
            listReservation.push(reservation.codeReservation);
    } );
    listReservation = listReservation.join("-");

    // List of employes
    let listEmployes = mainData.agence.personnel.list.map( emp => {
        return emp.codePersonnel;
    } );
    listEmployes = listEmployes.join("-");

    // list of reservations that no longer need notification alert
    let noAlertRes = Array();
    mainData.personnel.notification.list.forEach( notif => {
        if( notif.nomRefTableNotification == "res-return" && mainData.agence.getReservation(notif.codeRefTableNotification).etatReservationAtt() == "Ancien" )
            noAlertRes.push(notif.codeRefTableNotification);
    } );
    noAlertRes = noAlertRes.join("-");
    // Submit info
    let url = `../agence/ajouteReturnAlert.php?listReservation=${listReservation}&listEmployes=${listEmployes}&noAlertRes=${noAlertRes}`;
    // window.open(url, "_blank");
    runIFrame("submitResReturnNotif", url, 2);
    document.getElementsByClassName("submitResReturnNotif")[0].setAttribute("class", "submitResReturnNotif hidden");

    // setTimeout(function(){checkMainData()},2000);    
}
function submitNotifData(){
    // Submit vidange notifications data as car info
    console.log("DEBUG: submitNotifData() running");
    // Create list of "vidange" that should have a notif
    let listVidange = new Array();
    mainData.agence.voiture.list.forEach( voiture => {
        if(voiture.getVidDetail().needAlert && !mainData.personnel.isNotifExists("vidange", voiture.getVidDetail().codeVidange))
            listVidange.push(voiture.getVidDetail().codeVidange);
    } );
    listVidange = listVidange.join("-");

    // Create list of "Vidange"s that no longer need a notif to remove it from db
    // listNoNotif has all notifications about "vidange"
    let listNoNotif = new Array();
    mainData.personnel.notification.list.forEach( notif => {
        if(notif.nomRefTableNotification == 'vidange') listNoNotif.push(notif.codeRefTableNotification);
    } );

    // listAllVid has all "vidange" that should have a notif
    let listAllVid = new Array();
    mainData.agence.voiture.list.forEach( voiture => {
        if(voiture.getVidDetail().needAlert)
        listAllVid.push(voiture.getVidDetail().codeVidange);
    } );

    listAllVid = new Set(listAllVid);
    listNoNotif =  listNoNotif.filter( vid => {return !listAllVid.has(vid)} );
    listNoNotif = listNoNotif.join("-");

    // get id of all employes
    let listEmployes = mainData.agence.personnel.list.map( emp => {
        return emp.codePersonnel;
    } );
    listEmployes = listEmployes.join("-");

    // Get list of all reservation with status "ancien" and not yet payed
    let listReservation = mainData.agence.getNotPayedRes("old").map(res => res.codeReservation);
    // Get list of all notifications about reservations in db that no longer exists in listReservation
    let setReservation = new Set(listReservation);
    let listNoNotifPay = mainData.personnel.notification.list.filter( notif => {
        if( !setReservation.has(notif.codeRefTableNotification) && notif.nomRefTableNotification == "res-non-pay" )
            return true;
        else   
            return false;
    } );
    listReservation = new Array();
    mainData.agence.getNotPayedRes("old").map( res => { return res.codeReservation}).forEach( codeReservation => {
        if( !mainData.personnel.isNotifExists("res-non-pay", codeReservation ))
            listReservation.push(codeReservation);
    } );
    listReservation = listReservation.join("-");
    listNoNotifPay = listNoNotifPay.map( res => { return res.codeRefTableNotification }).join("-");

    // Submit "vidange data"
    let urlVid = `../agence/ajouteVidNotif.php?listEmp=${listEmployes}&listVidange=${listVidange}&listNoNotif=${listNoNotif}`;
    runIFrame("submitVidangeNotifData", urlVid, 2);
    document.getElementsByClassName("submitVidangeNotifData")[0].setAttribute("class", "submitVidangeNotifData hidden");

    // Submit "res-non-pay" data
    let urlNonPay = `../agence/ajouteResNonPayNotif.php?listEmp=${listEmployes}&listReservation=${listReservation}&listNoNotifPay=${listNoNotifPay}`;
    // console.log(urlNonPay);

    // window.open(urlNonPay, "_blank");
    runIFrame("submitNonPayedRes", urlNonPay, 2);
    document.getElementsByClassName("submitNonPayedRes")[0].setAttribute("class", "submitNonPayedRes hidden");



    setTimeout(function(){checkMainData()},1000);
}


// Clear all notifications
function clearAllNotif(){
    let clsNotifDiv = document.getElementsByClassName("cls-all-notif")[0];
    let yesBtn = document.getElementsByClassName("yesClearAllNotif")[0];
    let noBtn = document.getElementsByClassName("noClearAllNotif")[0];
    let confDiv = document.getElementsByClassName("conf-cls-notif-all")[0];

    // define function to submit data
    let submitClearNotif = function(){
        console.log("DEBUG: submitClearNotif() running");
    };


    // Hide clsNotifDiv and display confDiv
    clsNotifDiv.setAttribute("class", "cls-all-notif hidden");
    confDiv.setAttribute("class", "conf-cls-notif-all");
    // verse versa if we click on noBtn
    noBtn.addEventListener("click", function(){
        clsNotifDiv.setAttribute("class", "cls-all-notif");
        confDiv.setAttribute("class", "conf-cls-notif-all hidden");
        yesBtn.removeEventListener("click", submitClearNotif);
    });

    // Submit data if we click on yesBtn
    yesBtn.addEventListener("click", submitClearNotif);
}

// Clear one notification
function clearOneNotif(notifDiv){
    let clsNotifDiv = notifDiv.querySelector(".cls-One-notif");
    let yesBtn = notifDiv.querySelector(".yesClearOneNotif");
    let noBtn = notifDiv.querySelector(".noClearOneNotif");
    let confDiv = notifDiv.querySelector(".conf-cls-notif-One");
    let codeNotification = notifDiv.getAttribute("data-codeNotification");
    // define function to submit data
    let submitClearNotif = function(){
        console.log("DEBUG: submitOneNotif() running codeNotification: "+codeNotification);
    };


    // Hide clsNotifDiv and display confDiv
    clsNotifDiv.setAttribute("class", "cls-One-notif hidden");
    confDiv.setAttribute("class", "conf-cls-notif-One");
    // verse versa if we click on noBtn
    noBtn.addEventListener("click", function(){
        clsNotifDiv.setAttribute("class", "cls-One-notif");
        confDiv.setAttribute("class", "conf-cls-notif-One hidden");
        yesBtn.removeEventListener("click", submitClearNotif);
    });

    // Submit data if we click on yesBtn
    yesBtn.addEventListener("click", submitClearNotif);
}