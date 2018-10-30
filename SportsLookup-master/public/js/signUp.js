$(document).ready(function(){

    $("#create").click(function() {
        const passsword1 = $("#pass1").val();
        const password2 = $("#pass2").val();
        const userName = $("#userName").val();
       
        if(userName=='' || passsword1=='' || password2==''){            
            $("#error1").empty();
            $("#error1").append("* No Field Can Be Left Empty!");
            return;
        }
        if(passsword1!=password2){
            $("#error1").empty();
            $("#error1").append(`* Passwords Don't Match`);
            return;
        }
        signUpUser(userName, passsword1);


    });

});





function signUpUser(userName, passWord) {
    $.ajax({
        url: `http://sportslookup.csse.rose-hulman.edu:8080/list/signUp/${userName}/${passWord}`,
        type: 'POST',
        dataType: 'JSON',
        success: () => {

        },
        error: (res, stat, err) => {
            console.log(err);
        }
    })
}







