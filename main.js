$(document).ready(function(){
//chiamata ajax
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
                console.log(amount);
//recupero data
                var date = (oggetto_corrente.date);
                console.log(date);
//recupero il mese
                var mese_corrente = moment(date, "DD/MM/YY");
                console.log(mese_corrente.format('MM'));
//recupero il ome del venditore
                var salesman = oggetto_corrente.salesman;
                console.log(salesman);

                if(!tot_vendite_mese.hasOwnProperty(mese_corrente)) {
                    tot_vendite_mese[mese_corrente] = vendita_corrente;
                } else {
                    tot_vendite_mese[mese_corrente] += vendita_corrente;
                }
            }
            var chiavi = Object.keys(tot_vendite_mese);
            var valori = Object.values(tot_vendite_mese);

        },
        'error': function() {
            alert('Impossibile raggiungere il sito')
        }

        var ctx = $('#myChart')[0].getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
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

    });

    });
