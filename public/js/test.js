
$("#signup-btn").on("click", function(e){
    e.preventDefault();
    const formEl = $("#formAuthentication");
   if( formEl.is(":valid")  ){
       const username = $(formEl).find("#username").prop("value");
       const email = $(formEl).find("#email").prop("value");
       const password = $(formEl).find("#password").prop("value");
       const user = { username, email, password };
       console.log( user );
       $.ajax({
           type: "POST",
           url: "/registration",
           data: JSON.stringify( { username: username, email: email, password: password} ),
           contentType: "application/json;charset=utf-8",
           dataType:"json",
           success : ( data ) => {
               $(document.body).html("<h1>SUCCESS REGISTER</h1>");
               setTimeout(function(){
                   window.location.href = window.location.origin + "/login.html"
               }, 3000)

           },
           error : ( error ) => {
               $(document.body).html("<h1>FAIL REGISTER</h1>")
               setTimeout(function(){
                   window.location.reload();
               }, 3000)
           }
       })
   }

});

$("#signin-btn").on("click", function(e){
    e.preventDefault();
    const formEl = $("#formAuthentication");
    if( formEl.is(":valid")  ){
        const email = $(formEl).find("#email").prop("value");
        const password = $(formEl).find("#password").prop("value");
        const user = { email, password };
        console.log( user );
        $.ajax({
            type: "POST",
            url: "/login",
            data: JSON.stringify( { email: email, password: password} ),
            contentType: "application/json;charset=utf-8",
            dataType:"json",
            success : ( data ) => {
                window.location.href = window.location.origin + "/success.html"
            },
            error : ( error ) => {
                $(document.body).html("<h1>FAIL LOGIN</h1>")
                setTimeout(function(){
                    window.location.reload();
                }, 3000)
            }
        })
    }

});
