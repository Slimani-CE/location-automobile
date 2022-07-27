let mainData;
let isMainDataReady = false;
function chartsWaiter(){
    // chartReservationNbr();
    // reservationBasedOn();
}

// This function will run when mainData is ready
function tableWaiter(){
    console.log("DEBUG: tableWaiter()");
    
    checkNotifTable();
    setTimeout(() => {
        submitReturnNotif();
    }, 5000);
    
    // Prevent agents from entring "Gestion des employes"
    if(mainData.personnel.servicePersonnel != "administrateur"){
        document.querySelectorAll('.only-admin').forEach( el => el.style = "display: none");
    }
    if( sessionStorage.getItem("curPage") == "reservation" ){
        console.log("DEBUG: tableWaiter() running reservation tables");
        setInterval(loadClientInfo,1000);
    }
    if( sessionStorage.getItem("curPage") == "gest-employes" )
    {
        console.log("DEBUG: tableWaiter() running gest-employes tables");
        loadEmpTable();
    }
    if( sessionStorage.getItem("curPage") == "gest-voitures" ){
        console.log("DEBUG: tableWaiter() running gest-voitures tables");
        loadCarsTable();
        loadMonthsTable((new Date()).getUTCFullYear());
        if(sessionStorage.getItem("activeVoSection") && sessionStorage.getItem("activeVoSection")!='null')
        {
            openConsultation('consultation-voiture');
            loadConsVoiture(sessionStorage.getItem("activeVoSection"));
            sessionStorage.setItem("activeVoSection","null");
        }
    }
    if( sessionStorage.getItem("curPage") == "gest-clients" )
    {
        console.log("DEBUG: tableWaiter() running gest-clients tables");
        loadClientsTable();
        if(sessionStorage.getItem("activeClSection") && sessionStorage.getItem("activeClSection")!='null')
        {
            openConsultation('consultation-client');
            loadConsClient(sessionStorage.getItem("activeClSection"));
            sessionStorage.setItem("activeClSection","null");
        }
    }
    if( sessionStorage.getItem("curPage") == "gest-reservation" )
    {
        console.log("DEBUG: tableWaiter() running gest-reservation tables");
        loadReservationsTable();
        if(sessionStorage.getItem("activeResSection") && sessionStorage.getItem("activeResSection")!='null')
        {
            openConsultation('consultation-reservation');
            loadConsReservation(sessionStorage.getItem("activeResSection"));
            sessionStorage.setItem("activeResSection","null");
        }
    }
}
function checkMainData(){
    isMainDataReady = false;
    mainData = null;
    let periodTime = setInterval(function(){
        if(mainData)
        {
            console.log("debug: mainData is ready");
            isMainDataReady = true;
            clearInterval(periodTime);
            tableWaiter();
            return true;
        }
        else{
            console.log("debug: mainData is not ready");
            retrieveData();
        }
    }, 10);
}

let retrieveData = function (){    
    // call ajax
    var ajax = new XMLHttpRequest();
    var method = "GET";
    var url = "retrieveData.php";

    var asynchronous = true;

    ajax.open(method, url, asynchronous);
    // sendding ajax request
    ajax.send();

    // receiving response from test.php
    ajax.onreadystatechange  = function(){
        if(this.readyState == 4 && this.status == 200)
        {
            // Converting JSON back to array
            mainData = JSON.parse(this.responseText);
            addSupllies(mainData);
        }
    }
    return mainData;   
}


//Function that will assign attributs and methods to the mainData objects
function addSupllies(mainData){ 
    let reservationObjectSupllies = {
        checkPayment : function(){
            let output = this.paiement.list[this.paiement.list.length-1].etatPaiement;
            if( output == "payé" )
                return output;
            return output + " MAD";
        },
        getTotalPayment : function(){
            return this.paiement.list[this.paiement.list.length-1].totalPaiement;
        },
        getClient : function(){
            return mainData.agence.client[`${ this.codeClient }`];
        },
        getCar : function(){
            return mainData.agence.voiture[`${ this.codeVoiture }`];
        },
        etatReservationAtt : function(){
            return ( this.etatReservation == "libre" ) ? "Ancien" : "En cours";
        }
    };

    function loadReservationList(){
        let list = new Array();
        mainData.agence.voiture.list.forEach( voiture => {
            voiture.reservation.list.forEach( reservation => {
                Object.assign(reservation,reservationObjectSupllies);
                list.push(reservation);
            } );
        } );
        return list;
    };
    let agenceSupllies = {
        listReservation : loadReservationList(),
        
        // Retourn la voiture
        getVoiture: function(codeVoiture){
            let listVoiture = mainData.agence.voiture.list;
            for(let i = 0; i < listVoiture.length; i++)
                if( listVoiture[i].codeVoiture == codeVoiture )
                    return listVoiture[i];
            return null;
        },

        // Retourn la reservation
        getReservation: function(codeReservation){
            let listVoiture = mainData.agence.voiture.list;
            for(let i = 0; i < listVoiture.length; i++)
                for(let j = 0; j < listVoiture[i].reservation.list.length; j++)
                    if( listVoiture[i].reservation.list[j].codeReservation == codeReservation )
                        return listVoiture[i].reservation.list[j];
            return null;
        },
        
        // Retourn le paiement
        getPayment: function(codePaiement){
            let listVoiture = mainData.agence.voiture.list;
            for(let i = 0; i < listVoiture.length; i++)
                for(let j = 0; j < listVoiture[i].reservation.list.length; j++)
                    for(let k = 0; k < listVoiture[i].reservation.list[j].paiement.list.length; k++)
                        if( listVoiture[i].reservation.list[j].paiement.list[k].codePaiement == codePaiement )
                            return listVoiture[i].reservation.list[j].paiement.list[k];
            return null;
        },

        // Get list of all reservation with status "ancien" and not yet payed
        getNotPayedRes : function(target){
            let output = Array() ;
            switch(target){
                case "old" : {this.listReservation.forEach( res => {
                    if( res.checkPayment() != "payé" && res.etatReservationAtt() == "Ancien" ){
                        output.push( res );
                    }
                });
                break;}

            }
            return output;
        },
        // Return list of reservation with status "En core" and needs alert of return
        getAlertRes : function(){
            let output = Array();
            this.listReservation.forEach( reservation => {
                let dateRetour = (new Date(reservation.dateRetourReservation)).getTime()/(3600*24*1000);
                let toDay = (new Date()).getTime()/(3600*24*1000);
                if(reservation.etatReservationAtt() == "En cours" && (dateRetour - toDay <= reservation.alertReservation))
                    output.push(reservation);
            });
            return output;
        },
        // Return personnel based on a reservation code
        getPersonnel : function(target, codeReservation){
            switch(target){
                case "reservation" : return mainData.agence.personnel[mainData.agence.contrat[mainData.agence.getReservation(codeReservation).codeContrat].codePersonnel];
            }
        }
    };
    Object.assign(mainData.agence,agenceSupllies);
    
    let voitureSupllies = {

        getCarsNbr : function(){
            return this.list.length;
        },
        // getNumberOf() will return the number cars dependng on a target 
        getNumberOf : function(target,value){
            let length = 0;
            for(let i = 0; i < this.list.length; i++)
                if(this.list[i][target] == value)
                    length++;
            return length;
        },
        //sortBy(target,sortType) is a function that can sort the list of cars by a target
        //the target can be "prixParJourVoiture" or any other attribut
        //and sorting can be ascending (sortType = 1) or descending (sortType = -1) 
        sortBy : function(target,sortType){
            this.list.sort( (a, b) => sortType*(a[target].localeCompare(b[target])) );
        },
        //Load car status list
        loadCarsStatus : function(){
            return this.list.map( voiture => voiture.checkReservationState() )
        },
        //Load free cars
        freeCarsList : function(){
            return mainData.agence.voiture.list.map( (voiture) => voiture.checkReservationState()=="libre"? voiture:null )
        },
        // Get corespondant car based on a "vidange"
        getVoiture : function(target, code){
            let output = null;
            switch(target){
                case "reservation" : {
                    output = mainData.agence.getVoiture(mainData.agence.getReservation(code).codeVoiture);
                    break;
                };
                case "vidange" : {
                    this.list.forEach( voiture => {
                        voiture.vidange.list.forEach( vidange => {
                            if( vidange.codeVidange == code )
                                output = voiture;
                        } );
                    } )
                    break;
                };
                default : return null;
            }
            return output;
        }
    };
    Object.assign(mainData.agence.voiture,voitureSupllies);
    
    let reservationSupllies = {
        checkReservationState : function(){
            let reservationState = "libre";
            this.reservation.list.forEach( function(reservation){ if(reservation.etatReservation.toLowerCase() == "loué") reservationState = "loué"; } )
            return reservationState;
        },

        // getResInfoByDate() will return reservation infos based on an interval of dates
        getResInfoByDate : function(date_1,date_2){

            tmp_1 = date_1.split("-");tmp_1[1] = tmp_1[1].length==2? tmp_1[1]:"0"+tmp_1[1];tmp_1[2] = tmp_1[2].length==2? tmp_1[2]:"0"+tmp_1[2];date_1 = tmp_1.join("-");
            tmp_2 = date_2.split("-");tmp_2[1] = tmp_2[1].length==2? tmp_2[1]:"0"+tmp_2[1];tmp_2[2] = tmp_2[2].length==2? tmp_2[2]:"0"+tmp_2[2];date_2 = tmp_2.join("-");
            
            date_1_obj = new Date(date_1);
            date_2_obj = new Date(date_2);
            date_1_obj /= (24*3600*1000);
            date_2_obj /= (24*3600*1000);
            let output = {
                daysNbr : 0,
                revenue : 0,
            }
            this.reservation.list.forEach( reservation => {
                let dateRetourObj = new Date( reservation.dateRetourReservation );
                let dateDepartObj= new Date( reservation.dateDepartReservation );
                dateDepartObj /= (24*3600*1000);
                dateRetourObj /= (24*3600*1000);
                // console.log("Debug : getResNbrByDate() |dateRetourObj : "+dateRetourObj+" |dateDepartObj : "+dateDepartObj+" |date_1_obj : "+date_1_obj+" |date_2_obj : "+date_2_obj+" |");
                // console.log(reservation);
                let totalPaiement = reservation.paiement.list[reservation.paiement.list.length-1].totalPaiement;
                let notYetCalculated = true;
                // console.log("Debug: getResNbrByDate()| date_1: "+date_1+" | date_2: "+date_2+" | debut: "+reservation.dateDepartReservation+" | retour: "+reservation.dateRetourReservation);
                if( date_1_obj >= dateDepartObj && date_2_obj <= dateRetourObj && notYetCalculated )
                {
                    output.daysNbr += (date_2_obj - date_1_obj);
                    // console.log("Debug : getResNbrByDate() case 1 running");
                    notYetCalculated = false;    
                }
                
                if( date_1_obj >= dateDepartObj && date_2_obj >= dateRetourObj && date_1_obj <= dateRetourObj && notYetCalculated )
                {
                    output.daysNbr += (dateRetourObj - date_1_obj);
                    // console.log("Debug : getResNbrByDate() case 2 running");
                    notYetCalculated = false;    
                }
                
                if( date_1_obj <= dateDepartObj && date_2_obj <= dateRetourObj && date_2_obj >= dateDepartObj && notYetCalculated )
                {
                    output.daysNbr += (date_2_obj - dateDepartObj);
                    // console.log("Debug : getResNbrByDate() case 3 running");
                    notYetCalculated = false;    
                }
                
                if( date_1_obj <= dateDepartObj && date_2_obj >= dateRetourObj && notYetCalculated )
                {
                    output.daysNbr += (dateRetourObj - dateDepartObj);
                    // console.log("Debug : getResNbrByDate() case 4 running");
                    notYetCalculated = false;    
                }

            });
            // output.daysNbr += output.daysNbr? 1:0;
            output.revenue += parseFloat( this.prixParJourVoiture )*output.daysNbr;
            return output;
        },
        
        getResInfoByYear : function(year){
            let isNotFirstMonth = 0;
            let yearObj = new Date(year);
            let nextYear= new Date((parseInt(year) + 1).toString());
            let daysNbr = ( nextYear.getTime() - yearObj.getTime() )/(24*3600*1000);
            let output = {
                daysNumber : daysNbr,
                reservationNumber : 0,
                revenue : 0,
                list :  [
                    {month:"Janvier",resNumber:0,revenue:0},
                    {month:"Février",resNumber:0,revenue:0},
                    {month:"Mars",resNumber:0,revenue:0},
                    {month:"Avril",resNumber:0,revenue:0},
                    {month:"Mai",resNumber:0,revenue:0},
                    {month:"Juin",resNumber:0,revenue:0},
                    {month:"Juillet",resNumber:0,revenue:0},
                    {month:"Août",resNumber:0,revenue:0},
                    {month:"Septembre",resNumber:0,revenue:0},
                    {month:"Octobre",resNumber:0,revenue:0},
                    {month:"Novembre",resNumber:0,revenue:0},
                    {month:"Décembre",resNumber:0,revenue:0},
                ]
            }
            for(let i = 1; i < 12; i++){
                let firstDay= new Date(year+"-"+i);
                let lastDay = new Date(year+"-"+(i+1));
                let monthInfo;
                lastDay = lastDay.getTime() - (24*3600*1000);
                lastDay = new Date(lastDay);
                firstDay = firstDay.getFullYear() + "-" + (firstDay.getMonth() + 1) + "-01";
                lastDay = lastDay.getFullYear() + "-" + (lastDay.getMonth() + 1) + "-"  +lastDay.getDate();
                // if(i==6)
                    // console.log("Debug: getResInfoByYear() | firstDAY: "+firstDay+" | lastDAY: "+lastDay);
                monthInfo = this.getResInfoByDate(firstDay,lastDay);
                output.list[i-1].resNumber = monthInfo.daysNbr + (monthInfo.daysNbr? isNotFirstMonth:0);
                output.list[i-1].revenue = monthInfo.revenue + (monthInfo.revenue? isNotFirstMonth*this.prixParJourVoiture:0);
                isNotFirstMonth = (monthInfo.revenue ? 1:0);
                output.reservationNumber += output.list[i-1].resNumber;
                output.revenue += output.list[i-1].revenue;
                // console.log("debug: getResInfoByYear() | isNotFirstMonth: "+isNotFirstMonth);
            }
            let firstDay= new Date(year+"-"+12);
            let lastDay = new Date(((parseInt(year)+1).toString())+"-01");
            lastDay = lastDay.getTime() - (24*3600*1000);
            lastDay = new Date(lastDay);
            firstDay = firstDay.getFullYear() + "-" + (firstDay.getMonth() + 1) + "-01";
            lastDay = lastDay.getFullYear() + "-" + (lastDay.getMonth() + 1) + "-"  +lastDay.getDate();
            // console.log("Debug: getResInfoByYear() | firstDAY: "+firstDay+" | lastDAY: "+lastDay);
            monthInfo = this.getResInfoByDate(firstDay,lastDay);
            output.list[11].resNumber = monthInfo.daysNbr + (monthInfo.daysNbr? isNotFirstMonth:0);
            output.list[11].revenue = monthInfo.revenue + (monthInfo.revenue? isNotFirstMonth*this.prixParJourVoiture:0);
            output.reservationNumber += output.list[11].resNumber;
            output.revenue += output.list[11].revenue;
            return output;
        },
        // Get details about "Vidange"
        getVidDetail : function(){
            let syncVid = ( this.vidange.list.length > 0 )? this.vidange.list[this.vidange.list.length - 1] : 0;
            let duree = parseFloat(syncVid.dureeVidange);
            let kilometrage = parseFloat(this.kilometrageVoiture);
            let dureeActuel = parseFloat(syncVid.dureeActuelVidange);
            let alert = parseFloat(syncVid.alertVidange);
            let output = {
                codeVidange: syncVid.codeVidange,
                typeVid: duree,
                restVid: duree - kilometrage + dureeActuel,
                alertVid: alert,
                travledKilos : kilometrage - dureeActuel,
                needVid : ( kilometrage - dureeActuel >= duree  ),
                needAlert : ( duree - kilometrage + dureeActuel <= alert),
            };
            return output;
        }
    };
    let paymentSupllies = {
        getPayDetail : function(){
            let reservation = mainData.agence.getReservation(this.codeReservation);
            let dateDepart = new Date(reservation.dateDepartReservation);
            let dateRetour = new Date(reservation.dateRetourReservation);
            let nbrJour = (dateRetour.getTime() - dateDepart.getTime())/(24*3600*1000);
            let listPayment = reservation.paiement.list;
            let i;
            let lastPayment;
            for( i = 0; i < listPayment.length; i++){
                if( listPayment[i].codePaiement == this.codePaiement )
                    break;
            }
            
            if(i > 0)
                lastPayment = listPayment[i-1].avancePaiement;
            else lastPayment = 0;
            // console.log("Debug getPayDetail()| lastPayment: "+lastPayment+"| i : "+i);       
            let output = {
                nombreJour: nbrJour,
                total: this.totalPaiement,
                prixParJour: this.totalPaiement/nbrJour,
                totalPayed: this.avancePaiement,
                rest: this.totalPaiement - this.avancePaiement,
                curPay: this.avancePaiement - lastPayment,
            };
            return output;
        }
    }
    mainData.agence.voiture.list.forEach(voiture => {
        Object.assign(voiture,reservationSupllies);
        voiture.reservation.list.forEach( reservation => {
            reservation.paiement.list.forEach( paiement => {
                Object.assign(paiement,paymentSupllies);
            } );
        } );
    });
    

    let clientSupllies = {
        //Return an array of all reservations done by this client
        reservationList : function(){
            list = new Array();
            mainData.agence.voiture.list.forEach(voiture => {
                voiture.reservation.list.forEach( reservation => {
                    if( reservation.codeClient == this.codeClient )
                        list.push( reservation );
                } )
            });
            return list;
        },
        //Return "Active" in case of an actuel reservation or "Inactive"
        etatReservation : function(){
            let etat = "inactive";
            this.reservationList().forEach( reservation => { if(reservation.etatReservation == "loué") etat = "active"; } )
            return etat;
        }
    };
    mainData.agence.client.list.forEach( client => {Object.assign(client,clientSupllies)} );


    let clientObjSupllies = {
        getClient : function(identite){
            for( let i = 0; i < this.list.length; i++)
                if(this.list[i].identiteClient.toLowerCase() == identite.toLowerCase())
                    return this.list[i];
            return null;
        }
    }
    Object.assign(mainData.agence.client,clientObjSupllies);

    let empSupllies = {
        // This function will return true if a notifacation of a specified table "target" with "code" exists
        isNotifExists : function(target, code){
            let listNotif = this.notification.list;
            let output = false;
            listNotif.forEach( notif => {
                if( notif.nomRefTableNotification == target && notif.codeRefTableNotification == code )
                    output = true;
            } );
            return output;
        }
    };
    Object.assign(mainData.personnel, empSupllies);
}
