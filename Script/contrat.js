
$(document).ready(function($) 
{ 

    $(document).on('click', '#download-btn', function(event) 
    {
        event.preventDefault();
        
        var element = document.getElementById('pdf-content'); 

        //easy
        html2pdf().from(element).save();
        // html2pdf().from(element).output();

        //custom file name
        // html2pdf().set({filename: 'code_with_mark_'+js.AutoCode()+'.pdf'}).from(element).save();


        //more custom settings
        var opt = 
        {
            margin:       1,
            filename:     'pdf-content.pdf',
            image:        { type: 'png', quality: 3 },
            html2canvas:  { scale: 0.9 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // New Promise-based usage:
        // html2pdf().set(opt).from(element).save();     
        // html2pdf().set(opt).from(element).output();     
    });

});

let nomPersonnel;
let codePaiement;
let paiement;
let reservation;
let agence;
let voiture;
let client;
let contrat;

function generateContractData(){

    if(mainData)
    {   clearInterval(timedFunction);

        codeReservation = document.getElementById("codeReservation").value;

        personnel = mainData.agence.getPersonnel("reservation", codeReservation);
        reservation = mainData.agence.getReservation(codeReservation);
        agence = mainData.agence;
        voiture = reservation.getCar();
        client = reservation.getClient();
        contrat = mainData.agence.contrat[reservation.codeContrat];
        retour = (reservation.retour.list.length > 0)? reservation.retour.list[0].kilometrageActuelRetour : "indéfini";
        paiement = reservation.paiement.list[reservation.paiement.list.length - 1].getPayDetail();

        // Logo agence
        let logoAgence = (agence.logoAgence.length)? agence.logoAgence:"../media/images/logo.png";
        document.getElementById("logoAgence").setAttribute("src",logoAgence);

        // Information agence
        let agencyName = document.querySelectorAll(".agencyName").forEach(element => {
            element.innerHTML = agence.nomAgence;
        });
        let addAgency = document.querySelectorAll(".addAgency").forEach(element => {
            element.innerHTML = agence.adresseAgence;
        });
        let numAgency = document.querySelectorAll(".numAgency").forEach(element => {
            element.innerHTML = agence.teleFixAgence;
        });
        let emailAgency = document.querySelectorAll(".emailAgency").forEach(element => {
            element.innerHTML = agence.personnel.list[0].emailUtilisateur;
        });
        document.getElementById("nomCClient").innerHTML = client.prenomClient + " " + client.nomClient;
        document.getElementById("natClient").innerHTML = client.nationaliteClient;
        document.getElementById("passePortClient").innerHTML = client.identiteClient;
        document.getElementById("passeExClient").innerHTML = client.exIdentiteClient;
        document.getElementById("TeleClient").innerHTML = client.numTelClient;
        document.getElementById("dateNaissClient").innerHTML = client.dateNaissanceClient;
        document.getElementById("adresseClient").innerHTML = client.adresseClient;
        document.getElementById("PermisClient").innerHTML = client.numPermisClient;
        document.getElementById("permisExClient").innerHTML = client.exNumPermisClient;

        // Information de la voiture
        document.getElementById("marqueVoiture").innerHTML = voiture.marqueVoiture + " " + voiture.modelVoiture;
        document.getElementById("immatVoiture").innerHTML = voiture.immatriculationVoiture;
        document.getElementById("kiloDebVoiture").innerHTML = reservation.kilometrageReservation;
        document.getElementById("kiloRetVoiture").innerHTML = retour;

        // Type Carburant
        let listBoxes = document.querySelectorAll(".gazVoiture");
        listBoxes.forEach(element => {
            element.innerHTML = null;
        });
        console.log(voiture.carburantVoiture);
        switch(voiture.carburantVoiture){
            case "Essence" : listBoxes[0].innerHTML = `<i class="fa-solid fa-check"></i>`;break;
            case "Diesel" : listBoxes[1].innerHTML = `<i class="fa-solid fa-check"></i>`;break;
            case "Electrique" : listBoxes[2].innerHTML = `<i class="fa-solid fa-check"></i>`;break;
            case "Hybride" : listBoxes[3].innerHTML = `<i class="fa-solid fa-check"></i>`;break;
        }
        // Details location
        document.getElementById("debutRes").innerHTML = reservation.dateDepartReservation;
        document.getElementById("lieuDepRes").innerHTML = reservation.lieuDepartReservation;
        document.getElementById("finRes").innerHTML = reservation.dateRetourReservation;
        document.getElementById("lieuRetRes").innerHTML = reservation.lieuDepartReservation;

        // details paiement
        document.getElementById("prixParJourVoiture").innerHTML = paiement.prixParJour;
        document.getElementById("nombreJourReservation").innerHTML = paiement.nombreJour;
        document.getElementById("totalReservation").innerHTML = paiement.total;
    }

}

let timedFunction=setInterval(generateContractData,100);