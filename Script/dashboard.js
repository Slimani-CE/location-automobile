const { image } = require("html2canvas/dist/types/css/types/image");
const { text } = require("stream/consumers");

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
        let prixParJourVoiture = document.getElementById("prixParJourVoiture").innerHTML = mainData.agence.voiture[this.value].prixParJourVoiture+" MAD";

    })
}
function checkReservationData(){
    //Generate the agent name and generate "codePersonnel"
    let prenomPersonnel = document.getElementById("prenomPersonnel");
    let codePersonnel = document.getElementById("codePersonnel");
    prenomPersonnel.value = mainData.personnel.prenomPersonnel;
    codePersonnel.value = mainData.personnel.codePersonnel;
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
    let inputPrixParJour = document.getElementById("prixParJourVoiture");
    let inputTTC = document.getElementById("totalPaiement");
    // check if code is a number of not
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
            codeInscrit.value = "-1";
        }
    }
    else{
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
