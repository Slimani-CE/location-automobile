// loadConsReservation() will load reservation info for consultation
function loadConsReservation(codeReservation){
    let resClient = document.getElementById("res-client");
    let resVoiture = document.getElementById("res-voiture");
    let resStatus = document.getElementById("res-status");
    let reservation;
    let noBtn = document.getElementsByClassName("no-btn")[0];
    let yesBtn = document.getElementsByClassName("yes-btn")[0];
    let consReservation = document.getElementById("cons-reservation");
    consReservation.dataset["codeReservation"] = codeReservation;
    for(let i = 0; i < mainData.agence.listReservation.length; i++)
        if(mainData.agence.listReservation[i].codeReservation == codeReservation)
            reservation = mainData.agence.listReservation[i];
    let client = reservation.getClient();
    let voiture = reservation.getCar();
    resClient.innerHTML = `<a target="_blank" href="dashboard.php?page=gest-clients&activeSection=activeClSection&id=${client.codeClient}">${client.prenomClient} ${client.nomClient}</a>`;
    resVoiture.innerHTML = `<a target="_blank" href="dashboard.php?page=gest-voitures&activeSection=activeVoSection&id=${voiture.codeVoiture}">${voiture.marqueVoiture} - ${voiture.modelVoiture} - ${voiture.immatriculationVoiture}</a>`;
    resClient.dataset["codeClient"] = client.codeClient;
    resVoiture.dataset["codeVoiture"] = voiture.codeVoiture;
    resStatus.value = reservation.etatReservationAtt();
    resStatus.addEventListener("click",changeResStatus);
    resStatus.reservation = reservation;
    noBtn.addEventListener("click", function(){
        resStatus.value = reservation.etatReservationAtt();
        let respond = document.getElementsByClassName("responde-div")[0];
        respond.setAttribute("class","input-div responde-div hidden");
    });
    yesBtn.addEventListener("click",function(){
        window.location.href = `./updateDb.php?codeReservation=${reservation.codeReservation}&etatReservation=${((resStatus.value=="Ancien")? "libre":"loué")}`;
        // sessionStorage.setItem("activeResSection",reservation.codeReservation);
    });
    generatePayTable(codeReservation);
}

// change reservation status
function changeResStatus(){
    let respond = document.getElementsByClassName("responde-div")[0];
    let decRetour = document.getElementsByClassName("dec-retour-div")[0];
    let codeReservation = document.getElementById("cons-reservation").dataset["codeReservation"];
    let contRetour = document.getElementsByClassName("cont-retour")[0];
    // If we change the selected option.
    if(this.reservation.etatReservationAtt() != this.value){
        // If the selected option is "Ancien" that means an arrive of the car
        if(this.value == "Ancien")
        {
            let yesBtn = document.getElementsByClassName("yes-dec-btn")[0];
            let noBtn = document.getElementsByClassName("no-dec-btn")[0];
            let yesEngBtn = document.getElementsByClassName("yes-eng-btn")[0];
            let noEngBtn = document.getElementsByClassName("no-eng-btn")[0];
            if(contRetour.getAttribute("class") == "cont-retour hidden")
                decRetour.setAttribute("class","input-div dec-retour-div");
            // Display return section
            yesBtn.addEventListener("click",function(){
                decRetour.setAttribute("class","input-div dec-retour-div hidden");
                contRetour.setAttribute("class","cont-retour");
                noEngBtn.addEventListener("click",function(){
                    contRetour.setAttribute("class","cont-retour hidden");
                    loadConsReservation(codeReservation);
                });
            })
            // Display save option and never display return section
            noBtn.addEventListener("click",function(){
                decRetour.setAttribute("class","input-div dec-retour-div hidden");
                respond.setAttribute("class","input-div responde-div");
            });
        }
        else
        {
            respond.setAttribute("class","input-div responde-div");
        }
    }
    else{
        contRetour.setAttribute("class","cont-retour hidden");
        respond.setAttribute("class","input-div responde-div hidden");
        decRetour.setAttribute("class","input-div dec-retour-div hidden");
    }
    // console.log("Etat actuel: "+this.value+" etat reel: "+this.reservation.etatReservationAtt());
}

// loadReservationsTable() will load reservations list
function loadReservationsTable(){

    if(mainData.agence.listReservation != 0){
        let table = document.getElementById("reservation-table");
        
        table.innerHTML = "";
        // console.log(mainData.agence.voiture.list);
        mainData.agence.listReservation.forEach((reservation) => {
            
            let dateDepartReservation = new Date(reservation.dateDepartReservation);
            let dateRetourReservation = new Date(reservation.dateRetourReservation);
            let client = reservation.getClient().prenomClient + " " + reservation.getClient().nomClient;
            table.innerHTML = `
            <tr id="${reservation.codeReservation}" class="reservation-item "  >
                <td class="depart-reservation">${dateDepartReservation.toDateString()}</td>
                <td class="Retour-reservation">${dateRetourReservation.toDateString()}</td>
                <td style="text-align: center">${reservation.getTotalPayment()} MAD</td>
                <td style="text-align: center">${reservation.checkPayment()}</td>
                <td class="reservation-status" style="color: ${reservation.etatReservationAtt()=="En cours"? "#70AD47":"tomato"}; text-align:center">${reservation.etatReservationAtt()}</td>
                <td>${reservation.getCar().marqueVoiture}</td>
                <td title="${client}">${client}</td>
                <td> <a onclick="openConsultation('consultation-reservation');loadConsReservation(${reservation.codeReservation})" class="consulterBtn"> Consulter </a> </td>
            </tr>` + table.innerHTML;
        });
        table.innerHTML = `
        <tr>
            <th>Date de départ</th>
            <th>Date de retour</th>
            <th>Total de paiement</th>
            <th>État de paiement</th>
            <th>Status</th>
            <th>Voiture</th>
            <th>Client</th>
            <th>Action</th>
        </tr>
    ` + table.innerHTML;
    }
    reservationsSearchBarListner();
}


// Gestion des reservations
//fonction listner de la bare de recherche
function reservationsSearchBarListner(){
    let searchByDepartDate = document.getElementById("searchByDepartDate");
    let searchByReturnDate = document.getElementById("searchByReturnDate");
    let status = document.getElementsByName("reservation-status");
    let checkedStatus;
    for(let i = 0; i < status.length; i++){
        if(status[i].checked){
            checkedStatus = status[i].value;
            break;
        }
    }
    searchByDepartDate.value = (searchByDepartDate.value)? searchByDepartDate.value:null;
    searchByReturnDate.value = (searchByReturnDate.value)? searchByReturnDate.value:null;
    checkedStatus = (checkedStatus)? checkedStatus:null;
    // Display all reservations
    let reservations = document.getElementsByClassName("reservation-item");
    for(let i = 0; i < reservations.length; i++)
        reservations[i].setAttribute("class","reservation-item");

    //Filter reservations by the 3 inputs
    filterBy(searchByDepartDate.value,"depart-reservation","reservation-item","date-higher");
    filterBy(searchByReturnDate.value,"Retour-reservation","reservation-item","date-lower");
    filterBy(checkedStatus,"reservation-status","reservation-item","strict");
    // Check table length
    checkReservationsTableLength();
}
//Check reservations table length and hidden reservations number
//so if the garage is empty a message that said "Aucun reservation pour le moment" will apear
//and if the number of reservations after filtering equals to zero a message that said
//"aucune reservation n'est correspondante aux valeurs entrées" will apear
function checkReservationsTableLength(){
    let reservations = document.getElementsByClassName("reservation-item");
    let reservationsHidden = document.getElementsByClassName("reservation-item hidden");
    let table = document.getElementsByClassName("reservationsTabSection")[0];
    let emptyReservationsTable = document.getElementsByClassName("emptyReservationsTable")[0];
    table = table.getElementsByTagName("table")[0];
    //If the table is empty, we want to display a message and hidde the table header
    console.log("debug: reservation number : "+reservations.length+" | hidded reservations : "+reservationsHidden.length);
    if(reservations.length - reservationsHidden.length == 0 && reservations.length!=0){
        table.setAttribute("class","hidden");
        emptyReservationsTable.setAttribute("class","emptyReservationsTable");
        emptyReservationsTable.innerHTML="aucune reservation n'est correspondante aux valeurs entrées";
    }
    else{
        //If there are no reservations
        if(reservations.length == 0){
            table.setAttribute("class","hidden");
            emptyReservationsTable.setAttribute("class","emptyReservationsTable");
            emptyReservationsTable.innerHTML="Aucun reservation pour le moment";
        }else{
            table.setAttribute("class","");
            emptyReservationsTable.setAttribute("class","emptyReservationsTable hidden");
        }
    }
}

// Generate payment table
function generatePayTable(codeReservation){
    let table = document.getElementsByClassName("pay-table")[0];
    let reservation = mainData.agence.getReservation(codeReservation);
    let listPay = reservation.paiement.list;
    let personnel = mainData.agence.personnel[mainData.agence.contrat[reservation.codeContrat].codePersonnel];
    table.innerHTML = "";
    listPay.forEach( payment => {
        table.innerHTML = `
        <tr id="pay-${payment.codePaiement}">
            <td>${(new Date(payment.datePaiement)).toDateString()}</td>
            <td>${payment.getPayDetail().total} MAD</td>
            <td>${payment.getPayDetail().totalPayed} MAD</td>
            <td>${payment.getPayDetail().curPay} MAD</td>
            <td>${payment.getPayDetail().rest} MAD</td>
            <td class="payConst">
                <div class="payFact">
                    <i class="fa-solid fa-file-lines" onclick="window.open('facture.php?personnel=${personnel.prenomPersonnel+" "+personnel.nomPersonnel}&code=${payment.codePaiement}','_blank')" title="Consulter la facture"></i>
                </div>
                <div class="payMod">
                    <i class="fa-solid fa-pen-to-square" title="Modifier"></i>
                </div>
                <div class="payRemove">
                    <i class="fa-solid fa-trash-can" title="Deleter"></i>
                </div>
            </td>
        </tr>
        ` + table.innerHTML;
    } );
    table.innerHTML = `
    <tr>
        <th>Date de paiement</th>
        <th>Total à payer</th>
        <th>Total payé</th>
        <th>Montant facturé</th>
        <th>Rest</th>
        <th>Facture</th>
    </tr>
    ` + table.innerHTML;
}


// Payment methods. This function will run when we click on "Ajouter un paiement"
function submitPay(payDiv){
    let resPay = payDiv.getElementsByClassName("res-pay")[0];
    let noConPay = payDiv.getElementsByClassName("noConPay")[0];
    let yesConPay = payDiv.getElementsByClassName("yesConPay")[0];
    let payInputList = payDiv.querySelectorAll(".pay-input");
    let codeReservation = document.getElementById("cons-reservation").getAttribute("data-code-reservation");
    let errorStyle = "border-left: 5px solid rgb(202, 86, 65);outline:none;box-shadow:none";
    let correctStyle = "border-left: 5px solid #45af69;outline:none;box-shadow:none";
    let totalPaiement = payDiv.querySelector("#pay-totalPaiement");
    let avancePaiement = payDiv.querySelector("#pay-avancePaiement");
    let etatPaiement = payDiv.querySelector("#pay-etatPaiement");
    let methodePaiement = payDiv.querySelector("#pay-methodePaiement");
    let datePaiement = payDiv.querySelector("#pay-datePaiement");
    let reservation = mainData.agence.getReservation(codeReservation);
    
    let submitFunction = function(){
        let checkHandler = true;
        payInputList.forEach(input => {
            if( !input.value ){
                input.style = errorStyle;
                checkHandler = false
            }
            else input.style = correctStyle;
        });
        
        if(checkHandler){
            let subTotalPaiement = totalPaiement.value.split("MAD")[0];
            let subAvancePaiement = avancePaiement.value.split("MAD")[0];
            let url = `../agence/ajoutePaiement.php?codeReservation=${codeReservation}&totalPaiement=${subTotalPaiement}&avancePaiement=${subAvancePaiement}&etatPaiement=${etatPaiement.value}&methodePaiement=${methodePaiement.value}&datePaiement=${datePaiement.value}`;
            runIFrame("submitNewPayDataPage", url, 5);
            setTimeout(checkMainData,1000);
            setTimeout(function(){generatePayTable(codeReservation)},2000);
            setTimeout(submitNotifData,5000);    
        }
    }

    // Calculate values for auto generated inputs using a periodic functional
    let settedFunction = setInterval(function(){
        let facturePaiement = (( payDiv.querySelector("#pay-facturePaiement").value != "" )? parseFloat(payDiv.querySelector("#pay-facturePaiement").value):0);
        // Get last payment
        let lastPayment = reservation.paiement.list[reservation.paiement.list.length - 1].getPayDetail();
        let diffTotal = facturePaiement - lastPayment.rest;
        totalPaiement.value = lastPayment.total + " MAD";
        avancePaiement.value = parseFloat(lastPayment.totalPayed) + facturePaiement + " MAD";
        etatPaiement.value = ((diffTotal == 0)? "payé" : ( (diffTotal > 0)? "+"+diffTotal+" MAD" : diffTotal+" MAD" ));

    },100);

    // Display payment input div
    resPay.setAttribute("class","res-info res-pay");
    
    // Hidde payment input div and stop periodic function
    noConPay.addEventListener("click",function(){
        yesConPay.removeEventListener("click", submitFunction);
        resPay.setAttribute("class","res-info res-pay hidden");
        clearTimeout(settedFunction);
    });

    // check if inputs are not empty and Submit data
    yesConPay.addEventListener("click",submitFunction);
}


// methods de retour
function submitRetour(){
    let form = document.getElementById("retourDataForm");
    let codeReservation = parseInt(document.getElementById("cons-reservation").getAttribute("data-code-reservation"));
    let listInput = form.querySelectorAll(".ret-input");
    let yesSubmit = form.querySelector(".yes-eng-btn");
    let noSubmit = form.querySelector(".no-eng-btn");
    let errorStyle = "border-left: 5px solid rgb(202, 86, 65);outline:none;";
    let correctStyle = "border-left: 5px solid #45af69;outline:none;";
    let reservationInput = form.querySelector("#res-codeReservation").value = codeReservation;
    let voiture = mainData.agence.voiture.getVoiture("reservation", codeReservation);
    let reservation = mainData.agence.getReservation(codeReservation);
    let voitureInput = form.querySelector("#res-codeVoiture").value = voiture.codeVoiture;
    let KiloActuel = form.querySelector("#KiloActuel").innerHTML = voiture.kilometrageVoiture;
    let KiloActuelInput = form.querySelector("#res-kilometrageActuel");
    
    // Define function that will check validity of form and submit data
    let submitFunction = function(){
        let checkHandler = true;
        listInput.forEach( input => {
            if( input.value || !input.required )
                input.style = correctStyle;
                else{
                    checkHandler = false
                    input.style = errorStyle;
            }
        } );

        if( checkHandler && form.checkValidity() ){
            runIFrame("retourDataSubmitPage", "#", 5);
            setTimeout(checkMainData,1000);
            setTimeout(function(){loadConsReservation(codeReservation);submitReturnNotif();},2000);
            setTimeout(submitNotifData,5000);

            form.submit();
        }
    };

    // Change autogenerated inputs
    let changeAutoGenerated = setInterval(function(){
        let kiloParcourue = form.querySelector("#res-kilometrageParcourue");
        if( isNaN(KiloActuelInput.value) )
            kiloParcourue.value = null;
        else
            kiloParcourue.value = parseFloat(KiloActuelInput.value) - parseFloat(voiture.kilometrageVoiture)

        let resEtatPaiement = form.querySelector("#res-etatPaiement").value = reservation.checkPayment();
    }, 1000);

    // Reset inputs and style and remove Event listener from yesSubmit
    noSubmit.addEventListener("click", function(){
        reservationInput.value = null;
        voitureInput.value = null;
        KiloActuel.innerHTML = null;
        clearInterval(changeAutoGenerated);
        yesSubmit.removeEventListener("click", submitFunction)
        listInput.forEach( input => {
            input.style = null;
        } );
    });

    yesSubmit.addEventListener("click", submitFunction);

}