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
    let voiture;
    for(let i = 0; i < mainData.agence.voiture.list.length; i++)
        if( mainData.agence.voiture.list[i].codeVoiture == codeVoiture )
            voiture = mainData.agence.voiture.list[i];

    let vo_marque = document.getElementById("vo-marque"); vo_marque.value = voiture.marqueVoiture ;
    let vo_model = document.getElementById("vo-model"); vo_model.value = voiture.modelVoiture ;
    let vo_dateCirculaire = document.getElementById("vo-dateCirculaire"); vo_dateCirculaire.value = voiture.dateCirculaireVoiture ;
    let vo_kilometrage = document.getElementById("vo-kilometrage"); vo_kilometrage.value = voiture.kilometrageVoiture ;
    let vo_kilometrageVidVoiture = document.getElementById("vo-kilometrageVidVoiture"); vo_kilometrageVidVoiture.value = voiture.kilometrageVidVoiture ;
    let vo_status = document.getElementById("vo-status"); vo_status.value = voiture.checkReservationState() ;
    let vo_carburant = document.getElementById("vo-carburant"); vo_carburant.value = voiture.carburantVoiture ;
    let vo_prixParJour = document.getElementById("vo-prixParJour"); vo_prixParJour.value = voiture.prixParJourVoiture ;
    let vo_codeVoiture = document.getElementById("vo-codeVoiture"); vo_codeVoiture.value = voiture.codeVoiture ;

}
// Open "vidange" form
function openVidForm(){
    let ajouteBtn = document.getElementsByClassName("ajoute-btn")[0];
    let engBtn = document.getElementsByClassName("vid-footer")[0];
    let nvVidange = document.getElementsByClassName("nv-vidange")[0];
    ajouteBtn.setAttribute("class","ajoute-btn hidden");
    engBtn.setAttribute("class","vid-footer");
    nvVidange.setAttribute("class","nv-vidange");
}
// Open "vidange" form
function closeVidForm(){
    let ajouteBtn = document.getElementsByClassName("ajoute-btn")[0];
    let engBtn = document.getElementsByClassName("vid-footer")[0];
    let nvVidange = document.getElementsByClassName("nv-vidange")[0];
    ajouteBtn.setAttribute("class","resp-btn ajoute-btn");
    engBtn.setAttribute("class","vid-footer hidden");
    nvVidange.setAttribute("class","nv-vidange hidden");
}
// submit "vidange" data to database
function submitVidData(){
    codeVoiture = document.getElementById("vo-codeVoiture").value;
    dateVidange = document.getElementById("dateVidange").value;
    dureeVidange = document.getElementById("dureeVidange").value;
    dureeActuelVidange = document.getElementById("dureeActuelVidange").value;
    prixVidange = document.getElementById("prixVidange").value;
    alertVidange = document.getElementById("alertVidange").value;
    if(codeVoiture && dateVidange && dureeVidange && dureeActuelVidange && prixVidange && alertVidange)
        window.open("../agence/ajouteVidange.php?"+`codeVoiture=${codeVoiture}&dateVidange=${dateVidange}&dureeVidange=${dureeVidange}&dureeActuelVidange=${dureeActuelVidange}&prixVidange=${prixVidange}&alertVidange=${alertVidange}`);

    // loadConsVoiture(vo_codeVoiture.value);
    // showConfirmBtn();
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
        for(let i = 0; i < listInput.length; i++)
            listInput[i].disabled = true;
    }
    // Give user the access to change data
    else{
        btn.setAttribute("class","input-div modDon-div hidden");
        confirm.setAttribute("class","input-div conf-btn");
        for(let i = 0; i < listInput.length; i++)
            listInput[i].disabled = false;
    }
}
// submit new car's data to database
function submitCarData(){
    let btn = document.getElementById("sub-vo-btn");
    btn.click();
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
        let voitureInnerHtml = "<th>"+voiture.marqueVoiture+"</th>";
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