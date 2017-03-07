(function() {
    
    function getPollName(path) {
        var el = path.split("/");
        var pollName = el[el.length-1];
        return pollName;
    }
    
    var buildPoll = function buildPoll(data) {
        var poll = JSON.parse(data);
            
            var html = '<input type="hidden" name="pollName" value="' + poll.pollName + '">' +
                '<input type="hidden" name="pollDisplayName" value="' + poll.pollDisplayName + '">' + 
                '<input type="hidden" name="pollCreatedBy" value="' + poll.pollCreatedBy + '">' + 
                '<label for="question">' + poll.pollDisplayName + '</label><br>';
            
            poll.choices.forEach(function(item) {
               html +=  '<div class="radio"><input type="radio" name="question" value="' + item.choiceTitle + '">' + item.choiceTitle + '</div>';
            });
                                 
            formGrp.innerHTML = html + "</div>";
            
            var questions = document.getElementsByName("question");
            [].forEach.call(questions, function(question) {
                question.addEventListener("click", enableSubmit, false)
            });
        
    }
    
    var q = getPollName(window.location.pathname);
    var submitBtn = document.getElementById("submit") || null;
    var addAnswerBtn = document.getElementById("add-option") || null;
    var savePollBtn = document.getElementById("save-poll") || null;
    var formGrp = document.querySelector(".form-group");
    
    if (q) {
        var apiURL = window.location.origin + "/api/poll/" + q;
        var flexContainer = document.querySelector(".flex-container");
        
        ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiURL, buildPoll));
            
    }
    
    addAnswerBtn.addEventListener('click', addAnswer, false);
    savePollBtn.addEventListener('click', savePoll, false);
    
    function enableSubmit() {
        submitBtn.disabled = false;
        submitBtn.setAttribute("class", "btn btn-success");
    }
    
    function checkAnswers() {
        var choices = document.getElementsByName("choice");
        var valid = true;
        
        [].forEach.call(choices, function(choice) {
           if (choice.length === 0)  {
               valid = false;
           }
        });
        
        if (valid) {
           savePollBtn.disabled = false;
           savePollBtn.setAttribute("class", "btn btn-danger");
        }
    }
    
    function addAnswer() {
        // don't let a user vote if they have added a new answer
        submitBtn.disabled = true;
        submitBtn.setAttribute("class", "btn btn-disabled");
        // dont't let the user save the poll immediately after they add a new choice
        savePollBtn.disabled = true;
        savePollBtn.setAttribute("class", "btn btn-disabled");
        
        // disable the choices
        var questions = document.getElementsByName("question");
        [].forEach.call(questions, function(question) {
           question.disabled = true; 
        });
        
        var el = document.createElement("input");
        el.setAttribute("class", "form-control");
        el.setAttribute("type", "text");
        el.setAttribute("placeholder", "Add Answer");
        el.setAttribute("name", "choice");
        el.addEventListener("change", checkAnswers, false);
        
        formGrp.appendChild(el);
    }
    
    function savePoll() {
        var pollName = document.getElementsByName("pollName")[0].value;
        var apiURL = window.location.origin + "/api/poll/" + pollName;
        
        var choices = document.getElementsByName("choice");
        var data = [];
        
        [].forEach.call(choices, function(choice) {
           data.push({"choiceTitle": choice.value, "choiceVotes": 0}); 
        });
        
        ajaxFunctions.jsonRequest("PATCH", apiURL, data, function() {
            ajaxFunctions.ajaxRequest('GET', apiURL, buildPoll)
            });
            
        savePollBtn.disabled = true;
        savePollBtn.setAttribute("class", "btn btn-disabled");
    }
    
})();