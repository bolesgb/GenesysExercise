$(document).ready(function(){
    $("#logIn").click(function() {
        const userName = $("#userName").val();
        var pass = $("#pass12").val();

        logIn(userName, pass);
    });

    $("#createAccoun").click(function() {
        window.location.replace("/signUp");
    });
});

function logIn(username, password) {
    $.ajax({
        url: `http://sportslookup.csse.rose-hulman.edu:8080/list/logIn/${username}/${password}`,
        type: 'GET',
        dataType: 'text',
        success: (loggedIn) => {
            if(loggedIn === 'true'){
                window.location.href = "http://sportslookup.csse.rose-hulman.edu:8080/home";
            }
        }, 
        error: (res, stat, err) => {
            console.log(res, stat, err);
        }
    })
}








