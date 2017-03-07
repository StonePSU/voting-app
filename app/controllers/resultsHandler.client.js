'use strict';

(function() {
    
    var path = window.location.pathname;
    var pollName = "";
    var el = path.split("/");
    if (el.length === 4) {
       pollName = el[2];
    }
    
    if (pollName !== null && pollName !== undefined) {
        var apiURL = window.location.origin + "/api/poll/" + pollName;
        var href = window.location.href
        var pollURL = href.slice(0, href.length-8);
        document.getElementById("pollURL").innerHTML = pollURL;
        
        ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiURL, function(data) {
            
            var labels = [];
            var votes = [];
            var obj = JSON.parse(data);
            var choices = obj.choices;
            
            choices.forEach(function(choice) {
               labels.push(choice.choiceTitle);
               votes.push(choice.choiceVotes);
            });
            
            var ctx = document.getElementById("myChart");
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: '# of Votes',
                        data: votes,
                        backgroundColor: randomColor({
                            count: labels.length,
                            hue: 'green'
                        }),
                        borderColor: [
                            'rgba(255,99,132,1)'
                        ],
                        borderWidth: 1
                    }]
                },
                
                options: {
                    responsive: true, 
                    maintainAspectRatio: false,
                    title: {
                        display: true,
                        text: obj.pollDisplayName,
                        fontSize: 16
                    },
                    legend: {
                        display: false
                    }
                }
            });
        
        }));
    }
})();