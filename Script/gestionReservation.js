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
                // Add new return 
                yesEngBtn.addEventListener("click",function(){
                    let  etatRetour= document.getElementById("res-etatActuel").value;
                    let dateEntreRetour = document.getElementById("res-dateRetour").value;
                    if(dateEntreRetour && etatRetour)
                    {
                        window.open(`ajouteRetour.php?dateEntreRetour=${dateEntreRetour}&etatRetour=${etatRetour}&codeReservation=${codeReservation}`,"_self");
                        // sessionStorage.setItem("activeResSection",codeReservation);
                        // window.open(`ajouteRetour.php`);
                        // console.log("DEBUG: yesEngBtn.addEventListener()");
                    }
                    // else
                    // {
                        // this.removeEventListener("click");
                    // }
                })
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