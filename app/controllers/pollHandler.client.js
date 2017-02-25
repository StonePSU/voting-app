'use strict';

(function() {
    
    var populatePollData = function populatePollData(data) {
        var obj = JSON.parse(data);
        var container = document.querySelector(".flex-container");
        var html=""
        
        obj.forEach(function(item) {
            html += '<div class="flex-item red-bg">' +
                            '<a href="poll.html?p=' + item.pollName + '">' +
                            '<p><strong>Question: </strong><span class="poll-question">' + item.pollDisplayName + '</span></p>' +
                            '<aside><strong>Created By: </strong><span class="poll-created-by">' + item.pollCreatedBy + '</span></aside>' +
                           '</a>'+
                        '</div>';
        });
        
        container.innerHTML = html;

    }
    
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', window.location.origin + "/api/poll", populatePollData));

})();