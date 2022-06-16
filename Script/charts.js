let monthlyStatistique;
let monthlyBasedOn;
function chartReservationNbr(){
	if(monthlyStatistique)
		monthlyStatistique.destroy();	
	const ctx = document.getElementById("monthlyStatistique").getContext("2d");
	let delayed;
	let labels;
	let year = document.getElementById("stq-garage-year");
	let thisYear = year.innerHTML;
	let lastYear = (parseInt(year.innerHTML)-1).toString();
	labels = mainData.agence.voiture.list.map( function(item){ return item.marqueVoiture } );
	let gradient = ctx.createLinearGradient(0, 0, 0, 400);
	gradient.addColorStop(0, 'rgba(58,123,250,1)');
	gradient.addColorStop(1, 'rgba(0,210,255,0.3)');
    let gradient1 = ctx.createLinearGradient(0, 0, 0, 400);
	gradient1.addColorStop(0, 'rgba(58,10,250,1)');
	gradient1.addColorStop(1, 'rgba(0,100,255,0.3)');
	
	const data = {
		labels,
		datasets: [
			{
				data : mainData.agence.voiture.list.map( voiture => voiture.getResInfoByYear(lastYear).reservationNumber ),
				label: "La durée de location aux titre de l'année "+lastYear,
				fill : true,
				backgroundColor: gradient,
				borderColor: '#fff',
				pointBackgroundColor: '#3c3a4f',
				tension: 0.4,
			},
			{
				data : mainData.agence.voiture.list.map( voiture => voiture.getResInfoByYear(thisYear).reservationNumber ),
				label: "La durée de location aux titre de l'année "+thisYear,
				fill : true,
				backgroundColor: gradient1,
				borderColor: '#fff',
				pointBackgroundColor: '#3c3a4f',
				tension: 0.4,
			},
		],
	};
	let config = {
		type: 'bar',
		data: data,
		options: {
			radius: 5,
			responsive: true,
			animation: {
			onComplete: () => {
				delayed = true;
			},
			delay: (context) => {
				let delay = 0;
				if (context.type === 'data' && context.mode === 'default' && !delayed) {
				delay = context.dataIndex * 100 + context.datasetIndex * 100;
				}
				return delay;
			},
			},
			scales: {
				y: {
					ticks: {
						callback: function (value){
							return value + " jours";
						},
					},
				},
			},
		},
	};
	monthlyStatistique = new Chart(ctx, config);
}

function reservationBasedOn(){
	if(monthlyBasedOn)
		monthlyBasedOn.destroy();
	let year = document.getElementById("stq-garage-year");
	let thisYear = year.innerHTML;
	
	const ctx = document.getElementById("monthlyBasedOn").getContext("2d");
	let delayed;
	let labels;
	Chart.defaults.scale.ticks.beginAtZero = true;
	let gradient = ctx.createLinearGradient(0, 0, 0, 400);
	gradient.addColorStop(0, 'rgba(58,123,250,1)');
	gradient.addColorStop(1, 'rgba(0,210,255,0.3)');
	let colorDeg = 0;
	dateValue = mainData.agence.voiture.list.map( voiture => voiture.getResInfoByYear(thisYear).reservationNumber );
	labels = mainData.agence.voiture.list.map( voiture => voiture.marqueVoiture );

	const data = {
		labels,
		datasets: [
			{
				data : dateValue,
				label: "Prix par jours des voitures",
				fill : true,
				backgroundColor: dateValue.map( item => `hsl(${(colorDeg+=30)%360},75%,75%)` ) ,
				borderColor: '#fff',
				pointBackgroundColor: '#3c3a4f',
				tension: 0.4,
			},
		],
	};
	let config = {
		type: 'pie',
		data: data,
		options: {
			responsive: true,
			animation: {
			onComplete: () => {
				delayed = true;
			},
			delay: (context) => {
				let delay = 0;
				if (context.type === 'data' && context.mode === 'default' && !delayed) {
					delay = context.dataIndex * 20 + context.datasetIndex * 20;
				}
				return delay;
			},
			},
		},
	};
	monthlyBasedOn = new Chart(ctx, config);
}
