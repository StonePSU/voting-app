'use strict';

(function() {
    var submitBtn = document.getElementById("submit");
    
    function checkForm() {
        var question = document.getElementById("pollQuestion");
        var choices = document.getElementsByName("choice");
        var validated = true;

        if (question.value !== null) {
            [].forEach.call(choices, function(choice) {

               if (choice.value.length === 0) {
                   validated = false;
               }
            });
        } else {
            validated = false;
        }
        
        if(validated) {
            submitBtn.setAttribute("class", "btn btn-success");
            submitBtn.disabled = false;
        } else {
            submitBtn.setAttribute("class", "btn btn-disabled");
            submitBtn.disabled = true;
        }
    }
    
    function addAnswer() {
        var parent = document.querySelector("#answers");
        var child = document.createElement("input");
        child.setAttribute("type", "text");
        child.setAttribute("name", "choice");
        child.setAttribute("class", "form-control");
        child.setAttribute("value", "");
        child.setAttribute("placeholder", "Answer Choice");
        
        parent.appendChild(child);
        
        child.addEventListener("change", checkForm, false);
        
        submitBtn.setAttribute("class", "btn btn-disabled");
    }
    
    document.getElementById("add-option").addEventListener("click", addAnswer, false);
    var inputs = document.getElementsByTagName("input");
    
    [].forEach.call(inputs, function(input){
        input.addEventListener("change", checkForm, false);
    })
})();