// Car images traitement
function loadCarImages(){
    const inpFile = document.getElementById("imagesVoiture");
    const previewContainer = document.getElementById("previewContainer");
    const previewImage = previewContainer.querySelector(".image-preview__image");
    const defaultText = previewContainer.querySelector(".image-preview__default-text");
    let resetBtn = document.getElementById("resetCarInfo");

    inpFile.addEventListener("change",function(){

        const file = this.files[0];
        if(file){
            const reader = new FileReader();
            console.log(reader);

            defaultText.style.display="none"; 
            previewImage.style.display="block";


            reader.addEventListener("load",function(){
                previewImage.setAttribute("src",this.result);
            });
            
            reader.readAsDataURL(file);
        }
        
    });
    
    // reset preview
    resetBtn.addEventListener("click",function(){
        previewImage.setAttribute("src","");
        defaultText.style.display="block"; 
        previewImage.style.display="none";
    });
}


// loadConsVoiture() will load car info for consultation
function loadConsVoiture(codeVoiture){
    console.log("DEBUG: loadConsVoiture() | codeVoiture: "+codeVoiture);
    if( !codeVoiture )
        codeVoiture = document.getElementById("vo-codeVoiture").value;
    let voiture = mainData.agence.getVoiture(codeVoiture);

    let codeVoitureDiv = document.querySelector("#cons-Voiture"); codeVoitureDiv.setAttribute("data-codeVoiture", codeVoiture)
    let vo_marque = document.getElementById("vo-marque"); vo_marque.value = voiture.marqueVoiture ;
    let vo_model = document.getElementById("vo-model"); vo_model.value = voiture.modelVoiture ;
    let vo_dateCirculaire = document.getElementById("vo-dateCirculaire"); vo_dateCirculaire.value = voiture.dateCirculaireVoiture ;
    let vo_kilometrage = document.getElementById("vo-kilometrage"); vo_kilometrage.value = voiture.kilometrageVoiture ;
    let vo_status = document.getElementById("vo-status"); vo_status.value = voiture.checkReservationState() ;
    let vo_carburant = document.getElementById("vo-carburant"); vo_carburant.value = voiture.carburantVoiture ;
    let vo_prixParJour = document.getElementById("vo-prixParJour"); vo_prixParJour.value = voiture.prixParJourVoiture ;
    let vo_codeVoiture = document.getElementById("vo-codeVoiture"); vo_codeVoiture.value = voiture.codeVoiture ;
    loadVidData();
}
// Open "vidange" form
function openVidForm(){
    let ajouteBtn = document.getElementsByClassName("ajoute-btn")[0];
    let engBtn = document.getElementsByClassName("vid-footer")[0];
    let nvVidange = document.getElementsByClassName("nv-vidange")[0];
    let closeVidBtn = document.getElementsByClassName("close-btn")[0];
    let form = document.getElementById("newVidForm");
    let listInputs = form.querySelectorAll(".vd-input");
    let codeVoiture = document.querySelector("#cons-Voiture").getAttribute("data-codeVoiture");

    ajouteBtn.setAttribute("class","ajoute-btn hidden");
    engBtn.setAttribute("class","vid-footer");
    nvVidange.setAttribute("class","nv-vidange");
    // Set default value of "dureeActuelVidange"
    let kiloActuel = form.querySelector("#dureeActuelVidange").value = mainData.agence.getVoiture(codeVoiture).kilometrageVoiture;
    
    // Close vid form
    closeVidBtn.addEventListener("click", function(){
        ajouteBtn.setAttribute("class","resp-btn ajoute-btn");
        engBtn.setAttribute("class","vid-footer hidden");
        nvVidange.setAttribute("class","nv-vidange hidden");
        // Reset inputs
        listInputs.forEach( input => {
            input.value = null;
            input.style = null;
        });
    });
    
}
// Load "Vidange" data
function loadVidData(){
    let table = document.getElementsByClassName("vid-table")[0];
    let codeVoiture = document.querySelector("#cons-Voiture").getAttribute("data-codeVoiture");
    let voiture = mainData.agence.getVoiture(codeVoiture);
    let detailVid = voiture.getVidDetail();
    table.innerHTML = "";
    if( voiture.vidange.list.length ){
        voiture.vidange.list.forEach( vidange => {
            let styleTr = null;
            if(vidange.codeVidange == detailVid.codeVidange)
                styleTr = `style="background-color: ${(detailVid.needVid? "tomato":(detailVid.needAlert? "orange" : "#70AD47"))}"` ;
            table.innerHTML = `
                <tr ${styleTr} >
                    <td>${vidange.dateVidange}</td>
                    <td>${vidange.dureeVidange} KM</td>
                    <td>${vidange.prixVidange} DH</td>
                    <td>${detailVid.needVid || vidange.codeVidange != detailVid.codeVidange? "Terminé" : "+ "+detailVid.restVid+" KM"}</td>
                </tr>
            ` + table.innerHTML;
        } );
        table.innerHTML = `
        <tr>
            <th>Date de vidange</th>
            <th>Type</th>
            <th>Prix</th>
            <th>État</th>
        </tr>
        ` + table.innerHTML;
    }
    else{
        table.innerHTML = "<div class='emptyTableMsg'>Aucun vidange n'a été fait pour cette voiture</div>";
    }
}


// submit "vidange" data to database
function submitVidData(){
    let form = document.getElementById("newVidForm");
    let listInputs = form.querySelectorAll(".vd-input");
    let codeVoiture = document.querySelector("#cons-Voiture").getAttribute("data-codeVoiture");
    let codeVoitureVid = document.getElementById("codeVoitureVid").value = codeVoiture;
    let checkHandler = true;
    let errorStyle = "border-left: 5px solid rgb(202, 86, 65);outline:none;";
    let correctStyle = "border-left: 5px solid #45af69;outline:none;";

    // check if all inputs are not empty
    listInputs.forEach( input => {
        // If input is not empty or it's not required
        if( input.value || !input.required )
        input.style = correctStyle;
        // Otherwise
        else{
            input.style = errorStyle;
            checkHandler = false;
        }
    } );

    // Check form validity and submit data
    if( form.checkValidity() ){
        runIFrame("newVidDataSubmit", "#", 5);
        form.submit();
        setTimeout(checkMainData,1000);
        setTimeout(function(){loadConsVoiture(codeVoiture);},2000);
        setTimeout(submitNotifData,5000);
        // close vid form
        document.getElementsByClassName("close-btn")[0].click();
    }
}
//hidde modification botton and show confirmation btns
function showConfirmBtn(){
    let btn = document.getElementsByClassName("modDon-div")[0];
    let confirm = document.getElementsByClassName("conf-btn")[0];
    let listInput = document.getElementsByClassName("vo-input");
    // Prevent user from changing data
    if( btn.getAttribute("class") == "input-div modDon-div hidden" ){
        btn.setAttribute("class","input-div modDon-div");
        confirm.setAttribute("class","input-div conf-btn hidden");
        for(let i = 0; i < listInput.length; i++){
            listInput[i].disabled = true;
            listInput[i].style = null;
        }
    }
    // Give user the access to change data
    else{
        btn.setAttribute("class","input-div modDon-div hidden");
        confirm.setAttribute("class","input-div conf-btn");
        for(let i = 0; i < listInput.length; i++)
            listInput[i].disabled = false;
    }
}
// submit car's new data to database
function submitCarData(){
    let form = document.getElementById("carDataForm");
    let listInput = form.querySelectorAll(".vo-input");
    let errorStyle = "border-left: 5px solid rgb(202, 86, 65);outline:none;";
    let correctStyle = "border-left: 5px solid #45af69;outline:none;";

    // Check if all inputs are not empty
    listInput.forEach( input => {
        // If input is not empty or is not required
        if( input.value || !input.required){
            input.style = correctStyle;
        }
        // otherwise
        else{
            input.style = errorStyle;
            checkHandler = false;
        }
    } );

    // Check if form is valide
    if( form.checkValidity() ){
        let noModBtn = document.getElementById("noModBtn");
        runIFrame("carNewDataForm", "#", 5);
        form.submit();
        setTimeout(function(){checkMainData()},1000);
        setTimeout(function(){noModBtn.click()},2000);
        setTimeout(function(){submitNotifData()},5000);
    }
}
// loadCarsTable() will load all cars table
function loadCarsTable(){

    if(mainData.agence.voiture.getCarsNbr != 0){
        let table = document.getElementById("cars-table");
        table.innerHTML = "";
        // console.log(mainData.agence.voiture.list);
        mainData.agence.voiture.list.forEach((voiture, index, list) => {
            table.innerHTML = `
            <tr id="${voiture.codeVoiture}" class="car "  >
                <td class="brand">${voiture.marqueVoiture}</td>
                <td>${voiture.modelVoiture}</td>
                <td class="regNum">${voiture.immatriculationVoiture}</td>
                <td>${voiture.prixParJourVoiture}</td>
                <td class="car-status" style="color: ${voiture.checkReservationState()=="libre"? "#70AD47":"tomato"}; text-align:center">${voiture.checkReservationState()}</td>
                <td> <a onclick="openConsultation('consultation-voiture');loadConsVoiture(${voiture.codeVoiture})" class="consulterBtn"> Consulter </a> </td>
            </tr>` + table.innerHTML;
        });
        table.innerHTML = `
        <tr>
            <th>Marque</th>
            <th>Model</th>
            <th>Matricule</th>
            <th>Prix/Jour</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
    ` + table.innerHTML;
    }
    carsSearchBarListner();
}

function loadMonthsTable(year){
    let table = document.getElementById("carsDateTable");
    let tableTitle = document.getElementsByClassName("tableTitle")[0];
    tableTitle.innerHTML = "Durée de location mensuel aux titre de l'année "+year;
    table.innerHTML = `
    <tr>
        <th id="stq-garage-year">${ year }</th>
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
    `;
    mainData.agence.voiture.list.forEach( voiture =>{
        let voitureInnerHtml = `<th>${voiture.marqueVoiture} <br> ${voiture.immatriculationVoiture}</th>`;
        let data = voiture.getResInfoByYear(year);
        data.list.forEach( item => {
            voitureInnerHtml += `<td style="color: ${ (item.resNumber)?"tomato":"black"}">${item.resNumber}</td>`;
        } );
        voitureInnerHtml = "<tr>"+voitureInnerHtml+"</tr>";
        table.innerHTML +=voitureInnerHtml;
    } );
    reservationBasedOn();
    chartReservationNbr();
}


//Check cars table length and hidden cars number
//so if the garage is empty a message that said "Le garage est vide" will apear
//and if the number of cars after filtering equals to zero a message that said
//"aucune voiture n'est correspondante aux valeurs entrées" will apear
function checkCarsTableLength(){
    let cars = document.getElementsByClassName("car");
    let carsHidden = document.getElementsByClassName("car hidden");
    let table = document.getElementsByClassName("carsTabSection")[0];
    let emptyCarsTable = document.getElementsByClassName("emptyCarsTable")[0];
    table = table.getElementsByTagName("table")[0];
    if(cars.length - carsHidden.length == 0 && cars.length!=0){
        table.setAttribute("class","hidden");
        emptyCarsTable.setAttribute("class","emptyCarsTable");
        emptyCarsTable.innerHTML="aucune voiture n'est correspondante aux valeurs entrées";
    }
    else{
        if(cars.length == 0){
            table.setAttribute("class","hidden");
            emptyCarsTable.setAttribute("class","emptyCarsTable");
            emptyCarsTable.innerHTML="Le garage est vide";
        }else{
            table.setAttribute("class","");
            emptyCarsTable.setAttribute("class","emptyCarsTable hidden");
        }
    }

}

//fonction listner de la bare de recherche
function carsSearchBarListner(){
    let searchByBrand = document.getElementById("searchByBrand");
    let searchByRegNum = document.getElementById("searchByRegNum");
    let status = document.getElementsByName("car-status");
    let checkedStatus;
    for(let i = 0; i < status.length; i++){
        if(status[i].checked){
            checkedStatus = status[i].value;
            break;
        }
    }
    searchByBrand.value = (searchByBrand.value)? searchByBrand.value:null;
    searchByRegNum.value = (searchByRegNum.value)? searchByRegNum.value:null;
    checkedStatus = (checkedStatus)? checkedStatus:null;
    // Display all cars
    let cars = document.getElementsByClassName("car");
    console.log(cars.length);
    for(let i = 0; i < cars.length; i++)
        cars[i].setAttribute("class","car");

    //Filter cars by the 3 inputs
    filterBy(searchByBrand.value,"brand","car","normal");
    filterBy(searchByRegNum.value,"regNum","car","normal");
    filterBy(checkedStatus,"car-status","car","strict");
    // Check table length
    checkCarsTableLength();
}

// Submit new car data
function submitNewCarData(form){
    // Check form validity
    if( form.checkValidity() ){
        runIFrame("newCarSubmitPage", "#", 5);
        setTimeout(function(){checkMainData();submitNotifData();}, 2000);
        closePopUp(form.children[0]);
    }
}