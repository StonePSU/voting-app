(function() {
    
    var apiURL = window.location.origin + "/api/:id";
    var userID = document.querySelector("#userid") || null;
    var signin = document.querySelector("#signin-menu") || null;
    var profileMenu = document.querySelector("#profile-menu") || null;
    
    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiURL, function(data) {
        var user = JSON.parse(data);
        if (user.displayname) {
            userid.innerHTML = user.displayname+' <span class="caret"></span>';
            profileMenu.style.display="block";
            signin.style.display = "none";
        } else {
            
            profileMenu.style.display = "none";
            signin.style.display="block";
        }
    }));
    
})();