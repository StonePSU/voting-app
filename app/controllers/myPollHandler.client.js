'use strict';

(function() {
    
    var populateMyPolls = function populateMyPolls(data) {

        var obj = JSON.parse(data);
        var container = document.querySelector(".flex-container");
        var html=""
        var pn = null;
        
        try {
            pn = obj[0].pollName || null;
        } catch (err) {
            // do nothing
        }
        
        if (pn) {
            obj.forEach(function(item) {
                html += '<div class="flex-item purple-bg" id="' + item.pollName + '">' +
                                '<a href="/poll/' + item.pollName + '/results">' +
                                '<p><strong>Question: </strong><span class="poll-question">' + item.pollDisplayName + '</span></p>' +
                                '<aside>Created By: <span class="poll-created-by">' + item.pollCreatedBy + '</span></aside>' +
                               '</a><button type="button" class="delete-btn" title="Delete Poll"><i class="fa fa-2x fa-trash"></i></button>'+
                            '</div>';
            });
        } else {
            html = '<p>Hmmm...we didn\'t find anything.  What are you waiting for?  Add a new poll!</p>';
        }
        
        container.innerHTML = html;
        
        var buttons = document.querySelectorAll(".delete-btn");
        [].forEach.call(buttons, function(button) {
            button.addEventListener('click', deletePoll, false);
        })

    }
    
    function deletePoll() {
        var pollName = this.parentNode.getAttribute("id");
        ajaxFunctions.ajaxRequest('DELETE', window.location.origin + "/api/poll/" + pollName, function () {
            ajaxFunctions.ajaxRequest('GET', window.location.origin + "/api/user", populateMyPolls)
            });
    }
    
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', window.location.origin + "/api/user", populateMyPolls));


})();