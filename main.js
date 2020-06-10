$(document).ready(function(){

    $.ajax({

        'url': 'http://157.230.17.132:4005/sales',
        'method': 'GET',
        'success': function(array) {

            var tot_vendite_mese = {};

//data contiene l'array, quindi ciclo for su data per recupere ogni singolo oggetto contenuto in array
            for (var i = 0; i < array.length; i++) {
                var oggetto_corrente = array[i];
                console.log(oggetto_corrente);
//recupero il valore delle vendite
                var vendita_corrente = oggetto_corrente.amount;
                console.log(vendita_corrente);
//recupero data
                var date = (oggetto_corrente.date);

//recupero il mese
                var mese_corrente = moment(date, "DD/MM/YY");
                date = mese_corrente.format('MMMM');
                console.log(date);

//recupero il nome del venditore
                var salesman = oggetto_corrente.salesman;
                console.log(salesman);

                if(!tot_vendite_mese.hasOwnProperty(date)) {
                    tot_vendite_mese[date] = vendita_corrente;
                } else {
                    tot_vendite_mese[date] += vendita_corrente;
                }
            }
            var chiavi = Object.keys(tot_vendite_mese);
            var valori = Object.values(tot_vendite_mese);
            console.log(tot_vendite_mese);

            var ctx = $('#myChart')[0].getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chiavi,
                    datasets: [{
                        label: '# of Votes',
                        data: valori,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
            var ctx = $('#myChart-pie')[0].getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: chiavi,
                    datasets: [{
                        label: '# of Votes',
                        data: valori,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });

        },
        'error': function() {
            alert('Impossibile raggiungere il sito')
        }

    });
});
