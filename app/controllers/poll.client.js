(function() {

    function getQueryParameter(str) {
        var retParm = "";
        var search = window.location.search;
        
        if (search) {
            var s = search.slice(1);
            var arr = s.split("&");
            arr.forEach(function (item) {
                var i = item.split("=");
                if (i[0] === str) {
                    retParm = i[1];
                }
            });
        } 
        
        return retParm;
    }
    
    function submitForm() {
        var selected = false;
        var arrRadio = document.getElementsByName("question");
        for (var i=1; i<arrRadio.length; i++) {
            var item = arrRadio[i];
            if (item.checked) {
                selected = true;
            }
        }
        
        if (!selected) {
            document.getElementById("error-message").innerHTML = "You must make a selection before clicking submit";

        } else {
            var form = document.getElementById("poll-form");
            form.submit();
        }
    }
    
    
    // code to build out the poll question and answers
    var q = getQueryParameter("p");
    
    if (q) {
        var apiURL = window.location.origin + "/api/poll/" + q;
        var flexContainer = document.querySelector(".flex-container");
        
        ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiURL, function(data) {
            var poll = JSON.parse(data);
            var formGrp = document.querySelector(".form-group");
            
            var html = '<input type="hidden" name="pollName" value="' + poll.pollName + '">' +
                '<input type="hidden" name="pollDisplayName" value="' + poll.pollDisplayName + '">' + 
                '<input type="hidden" name="pollCreatedBy" value="' + poll.pollCreatedBy + '">' + 
                '<label for="question">' + poll.pollDisplayName + '</label><br>';
            
            poll.choices.forEach(function(item) {
               html +=  '<input type="radio" name="question" value="' + item.choiceTitle + '">' + item.choiceTitle + '<br>';
            });
                                 
            formGrp.innerHTML = html;
        }));
    }
    
    var form = document.getElementById("poll-form");
    //form.addEventListener("submit", validateForm, false);
    
})();