(function() {
    
    var apiURL = window.location.origin + "/api/:id";
    var userID = document.querySelector("#userid") || null;
    var signin = document.querySelector("#signin-menu") || null;
    var profileMenu = document.querySelector("#profile-menu") || null;
    var addOption = document.getElementById('add-option') || null;
    var savePoll = document.getElementById('save-poll') || null;
    
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiURL, function(data) {
        var user = JSON.parse(data);
        if (user.displayname) {
            userid.innerHTML = user.displayname+' <span class="caret"></span>';
            profileMenu.style.display="block";
            signin.style.display = "none";
            
            if (addOption) {
                addOption.style.display = "inline";
                savePoll.style.display = "inline";
            }
        } else {
            
            profileMenu.style.display = "none";
            signin.style.display="block";
            
            if (addOption) {
                addOption.style.display = "none";
                savePoll.style.display = "none";
            }
        }
    }));
    
})();