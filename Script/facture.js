
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
// Retourn le paiement
function getPayment(codePaiement){
    let listVoiture = mainData.agence.voiture.list;
    for(let i = 0; i < listVoiture.length; i++)
        for(let j = 0; j < listVoiture[i].reservation.list.length; j++)
            for(let k = 0; k < listVoiture[i].reservation.list[j].paiement.list.length; k++)
                if( listVoiture[i].reservation.list[j].paiement.list[k].codePaiement = codePaiement )
                    return listVoiture[i].reservation.list[j].paiement.list[k];
    return null;

}

// Retourn la reservation
function getReservation(codeReservation){
    let listVoiture = mainData.agence.voiture.list;
    for(let i = 0; i < listVoiture.length; i++)
        for(let j = 0; j < listVoiture[i].reservation.list.length; j++)
            if( listVoiture[i].reservation.list[j].codeReservation = codeReservation )
                return listVoiture[i].reservation.list[j];
    return null;
}


function generateData(){

    if(mainData)
    {   clearInterval(timedFunction);
        let nomPersonnel = document.getElementById("nomPersonnel").value;
        let codePaiement = document.getElementById("codePaiement").value;

        let paiement = getPayment(codePaiement);
        let reservation = getReservation(paiement.codeReservation);
        let agence = mainData.agence;
        let voiture = reservation.getCar();
        let client = reservation.getClient();
        
        let nomAgence = document.getElementById("nomAgence").innerHTML = agence.nomAgence;
        let adresseAgence = document.getElementById("adresseAgence").innerHTML = agence.adresseAgence;
        let teleAgence = document.getElementById("teleAgence").innerHTML = agence.teleAgence;
        let paysAgence = document.getElementById("paysAgence").innerHTML = agence.villeAgence+" - "+agence.paysAgence;

        let numFacture = document.getElementById("numFacture").innerHTML = paiement.codePaiement;
        let iceAgence = document.getElementById("iceAgence").innerHTML = agence.iceAgence;
        let dateReservation = document.getElementById("dateReservation").innerHTML = (new Date(reservation.dateDepartReservation)).toLocaleDateString();
    }

}

let timedFunction=setInterval(generateData,100);