
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

function generateData(){

    if(mainData)
    {   clearInterval(timedFunction);
        nomPersonnel = document.getElementById("nomPersonnel").value;
        codePaiement = document.getElementById("codePaiement").value;

        paiement = mainData.agence.getPayment(codePaiement);
        reservation = mainData.agence.getReservation(paiement.codeReservation);
        agence = mainData.agence;
        voiture = reservation.getCar();
        client = reservation.getClient();
        contrat = mainData.agence.contrat[reservation.codeContrat];

        // Logo agence
        let logoAgence = (agence.logoAgence.length)? agence.logoAgence:"../media/images/logo.png";
        document.getElementById("logoAgence").setAttribute("src",logoAgence);

        document.getElementById("nomAgence").innerHTML = agence.nomAgence;
        document.getElementById("adresseAgence").innerHTML = agence.adresseAgence;
        document.getElementById("teleAgence").innerHTML = agence.teleFixAgence;
        document.getElementById("paysAgence").innerHTML = agence.villeAgence+" - "+agence.paysAgence;

        document.getElementById("numFacture").innerHTML = paiement.codePaiement;
        document.getElementById("iceAgence").innerHTML = agence.iceAgence;
        document.getElementById("dateReservation").innerHTML = (new Date(reservation.dateDepartReservation)).toLocaleDateString();

        // Informations de client
        document.getElementById("nomClient").innerHTML = client.prenomClient + " " + client.nomClient;
        document.getElementById("addClient").innerHTML = client.adresseClient;
        document.getElementById("birthClient").innerHTML = client.dateNaissanceClient;
        document.getElementById("natClient").innerHTML = client.nationaliteClient;
        document.getElementById("villeClient").innerHTML = client.villeClient;
        // document.getElementById("payClient").innerHTML = client.;
        document.getElementById("teleClient").innerHTML = client.numTelClient;
        document.getElementById("emailClient").innerHTML = client.emailClient;
        document.getElementById("typeIdClient").innerHTML = client.typeIdentiteClient;
        document.getElementById("idClient").innerHTML = client.identiteClient;
        document.getElementById("permisClient").innerHTML = client.numPermisClient;

        // Information de la voiture
        document.getElementById("numContrat").innerHTML = contrat.codeContrat + "/" + (new Date(contrat.dateDepartContrat)).getUTCFullYear();
        document.getElementById("agentCom").innerHTML = nomPersonnel;
        document.getElementById("immVoiture").innerHTML = voiture.immatriculationVoiture;
        document.getElementById("maqrueVoiture").innerHTML = voiture.marqueVoiture;
        document.getElementById("modeleVoiture").innerHTML = voiture.modelVoiture;
        document.getElementById("idVoiture").innerHTML = voiture.marqueVoiture + " " + voiture.modelVoiture + " - " + voiture.immatriculationVoiture;
        document.getElementById("prixParJour").innerHTML = paiement.getPayDetail().prixParJour;
        document.getElementById("nbrJour").innerHTML = paiement.getPayDetail().nombreJour;
        document.getElementById("totalTTC").innerHTML = paiement.getPayDetail().total;
        document.getElementById("totalTTC2").innerHTML = paiement.getPayDetail().total;
        document.getElementById("totalPayed").innerHTML = paiement.getPayDetail().totalPayed;
        document.getElementById("curPayed").innerHTML = paiement.getPayDetail().curPay;
        document.getElementById("totalRest").innerHTML = paiement.getPayDetail().rest;

        // Type de paiement
        let listDiv = document.getElementsByClassName("box");
        for(let i = 0; i < listDiv.length; i++)
            listDiv[i].innerHTML = "";
        switch(paiement.methodePaiement){
            case "Espéce" : listDiv[0].innerHTML = `<i class="fa-solid fa-check"></i>`; break; 
            case "Chéque" : listDiv[1].innerHTML = `<i class="fa-solid fa-check"></i>`; break;
            case "Carte bancaire" : listDiv[2].innerHTML = `<i class="fa-solid fa-check"></i>`; break;
            case "Virement bancaire" : listDiv[3].innerHTML = `<i class="fa-solid fa-check"></i>`; break;
        }
    }

}

let timedFunction=setInterval(generateData,100);