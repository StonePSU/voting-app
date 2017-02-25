'use strict';

(function() {
    
    function addAnswer() {
        var parent = document.querySelector("#answers");
        var child = document.createElement("input");
        child.setAttribute("type", "text");
        child.setAttribute("name", "choice");
        child.setAttribute("class", "form-control");
        child.setAttribute("value", "");
        child.setAttribute("placeholder", "Answer Choice");
        
        parent.appendChild(child);
    }
    
    document.getElementById("add-option").addEventListener("click", addAnswer, false);
})();