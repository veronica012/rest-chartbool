$(document).ready(function(){
//conversione moment
moment.locale('it');
var url = 'http://157.230.17.132:4005/sales/';
//chiamata ajax
    $.ajax({
        'url': url ,
        'method': 'GET',
        'success': function(array) {
    //chiamo la funzione che gestisce i dati e somma le vendite totali di ogni mese
            var dati_vendite_totali = gestisciDati_mensili(array);
            var chiavi = Object.keys(dati_vendite_totali);
            var valori = Object.values(dati_vendite_totali);
    //chiamo la funzione che disegna il grafico
            disegnaGrafico_vendite_mensili(chiavi, valori);
    //chiamo la funzione che gestisce i dati delle vendite ripartite per venditore
            var dati_vendite_venditori = gestisciDati_venditori(array);
            var nome = Object.keys(dati_vendite_venditori);
            var importo = Object.values(dati_vendite_venditori);
            disegnaGrafico_vendite_venditori(nome, importo);



        },
        'error': function() {
            alert('Impossibile raggiungere il sito')
        }
    });

//FUNZIONI
//funzione che gestisce i dati resituiti dall'api
    function gestisciDati_mensili(data) {
        var totale_vendite_mese = {
            'gennaio' : 0,
            'febbraio' : 0,
            'marzo' : 0,
            'aprile' : 0,
            'maggio' : 0,
            'giugno' : 0,
            'luglio' : 0,
            'agosto' : 0,
            'settembre' : 0,
            'ottobre' : 0,
            'novembre' : 0,
            'dicembre' : 0
        }
        //data contiene l'array, quindi ciclo for su data
        for (var i = 0; i < data.length; i++) {
        // per recupere ogni singolo oggetto contenuto in array
            var oggetto_corrente = data[i];
            console.log(oggetto_corrente);
        //recupero il valore delle vendite
            var vendita_corrente = parseInt(oggetto_corrente.amount);
            console.log(vendita_corrente);
        //recupero data
            var date = (oggetto_corrente.date);
        //recupero il mese
            var mese_corrente = moment(date, "DD/MM/YY");
            date = mese_corrente.format('MMMM');
            console.log(date);
        //eseguo il totale delle vendite di ogni mese, si incrementa ad ogni ciclo
            totale_vendite_mese[date] += vendita_corrente;
            console.log(totale_vendite_mese);
    }
    return totale_vendite_mese
}
//fine funzione

//funzione che crea il grafico

function disegnaGrafico_vendite_mensili (etichette, dati) {

//chart line
    var ctx = $('#myChart-line')[0].getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: etichette,
            datasets: [{
                label: '# totale vendite ripartite per mese',
                data: dati,
                backgroundColor:
                    'rgba(255, 99, 132, 0.2)',

                borderColor:
                    'rgba(255, 99, 132, 1)',

                borderWidth: 1
            }]
        },
        options: {
            title: {
            display: true,
            text: 'Somma delle vendite del mese'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
//fine funzione
//FUNZIONI GRAFICO PIE VENDITE PER VENDITORE
function gestisciDati_venditori(data) {
    var oggetto_venditori = {};
    var importo_totale = 0;
    for (var i = 0; i < data.length; i++) {
    // per recupere ogni singolo oggetto contenuto in array
        var oggetto_corrente = data[i];
        console.log(oggetto_corrente);
        //recupero la vendita corrente
        var vendita_corrente = parseInt(oggetto_corrente.amount);
        console.log(vendita_corrente);
        var salesman = oggetto_corrente.salesman;
        console.log(salesman);
        if (!oggetto_venditori.hasOwnProperty(salesman)){
            oggetto_venditori[salesman] = vendita_corrente;
        } else {
                oggetto_venditori[salesman] += (vendita_corrente);
        }

        importo_totale+=vendita_corrente;
}
//conversione in percentuale
for (var nome_venditore in oggetto_venditori) {
    var totale_per_venditore = (oggetto_venditori[nome_venditore]);
    var percentuale_per_venditore = ((totale_per_venditore * 100) / importo_totale).toFixed(1);
    console.log(percentuale_per_venditore);
    oggetto_venditori[nome_venditore] = percentuale_per_venditore;

}
console.log(importo_totale);
return oggetto_venditori
}

function disegnaGrafico_vendite_venditori(etichette, dati) {
    //chart pie
    var ctx = $('#myChart-pie')[0].getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: etichette,
            datasets: [{
                label: '# of Votes',
                data: dati,
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
            title: {
            display: true,
            text: 'Fatturato di ogni salesman'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}
});
