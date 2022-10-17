
let auth0 = null;
const fetchAuthConfig = () => fetch("/config/auth_config.json");
const configureClient = async () => {
    const response = await fetchAuthConfig();
    const config = await response.json();

    auth0 = await createAuth0Client({
        domain: config.domain,
        client_id: config.clientId
    });
};

// NEW
const updateUI = async () => {
    const isAuthenticated = await auth0.isAuthenticated();

    document.getElementById("btn-logout").disabled = !isAuthenticated;
    document.getElementById("btn-login").disabled = isAuthenticated;
};

const login = async (screen_hint) => {
    /*await auth0.loginWithRedirect({
        redirect_uri: "http://localhost:5002/callback", //"https://monthebrice2000.github.io/my-portfolio/",
        //appState : window.location.origin,
        scope: "openid",

    });*/
        window.location.href = "https://dev-nekgqc-w.us.auth0.com/authorize?response_type=code&client_id=fEsbnsodpluz0eOVyWhJ5Cbgg6Rwv3j1&redirect_uri=http://localhost:5002/callback&scope=openid%20name%20email%20profile";
    //console.log( auth0 )
};

const logout = () => {
    auth0.logout({
        redirect_uri: "http://localhost:5002/callback"
    });
};



window.onload = async () => {
    await configureClient();

    //updateUI();

    const isAuthenticated = await auth0.isAuthenticated();
    console.log( isAuthenticated )

    if (isAuthenticated) {
        // show the gated content
        return;
    }

    // NEW - check for the code and state parameters
    const query = window.location.search;
    console.log( query )
    console.log( query.includes("code=") , query.includes("state=") )
    if (query.includes("code=") && query.includes("state=")) {

        // Process the login state
        await auth0.handleRedirectCallback();

        //updateUI();

        // Use replaceState to redirect the user away and remove the querystring parameters
        window.history.replaceState({}, document.title, "/");
    }
}




$("#signup-btn").on("click", function(e){
    e.preventDefault();
    //logout();
    //login("signup");
    /*const formEl = $("#formAuthentication");
   if( formEl.is(":valid")  ){
       const username = $(formEl).find("#username").prop("value");
       const email = $(formEl).find("#email").prop("value");
       const password = $(formEl).find("#password").prop("value");
       const user = { username, email, password };
       console.log( user );
       $.ajax({
           type: "POST",
           url: "/registration",
           headers :{

           },
           data: JSON.stringify( { username: username, email: email, password: password} ),
           contentType: "application/json;charset=utf-8",
           dataType:"json",
           success : ( data ) => {
               $(document.body).html("<h1>SUCCESS REGISTER</h1>");
               setTimeout(function(){
                   window.location.href = window.location.origin + "/login.html"
               }, 300)

           },
           error : ( error ) => {
               $(document.body).html("<h1>FAIL REGISTER</h1>")
               setTimeout(function(){
                   window.location.reload();
               }, 300)
           }
       })
   }*/

});

$("#signin-btn").on("click", function(e){
    e.preventDefault();

    login("login");
   /* const formEl = $("#formAuthentication");
    if( formEl.is(":valid")  ){
        const email = $(formEl).find("#email").prop("value");
        const password = $(formEl).find("#password").prop("value");
        const user = { email, password };
        console.log( user );
        $.ajax({
            type: "POST",
            url: "/registration2",
            data: JSON.stringify( { email: email, password: password} ),
            contentType: "application/json;charset=utf-8",
            dataType:"json",
            success : ( data ) => {
                $(formEl).find("#email").prop("value", "");
                $(formEl).find("#password").prop("value", "");
                window.location.href = window.location.origin + "/success.html"
            },
            error : ( error ) => {
                $(document.body).html("<h1>FAIL LOGIN</h1>")
                setTimeout(function(){
                    //window.location.href="http://localhost:8080/realms/token_test/login-actions/registration?client_id=token_test_client";
                    window.location.reload();
                }, 300)
            }
        })
    }*/

});

$("#reset-btn").on("click", function(e){
    e.preventDefault();
    console.log("reset password");
    //login("reset-password")
    /*const resetObj = new Auth0ChangePassword({
        container:         "change-password-widget-container",                // required
        email:             "{{email | escape}}",                              // DO NOT CHANGE THIS
        csrf_token:        "{{csrf_token}}",                                  // DO NOT CHANGE THIS
        ticket:            "{{ticket}}",                                      // DO NOT CHANGE THIS
        password_policy:   "{{password_policy}}",                             // DO NOT CHANGE THIS
        password_complexity_options:  "{{password_complexity_options}}",        // DO NOT CHANGE THIS
        theme: {
            icon: "//cdn.auth0.com/styleguide/1.0.0/img/badge.png",
            primaryColor: "{{tenant.colors.primary | default: '#ea5323'}}"
        },
        dict: {
            // passwordPlaceholder: "your new password",
            // passwordConfirmationPlaceholder: "confirm your new password",
            // passwordConfirmationMatchError: "Please ensure the password and the confirmation are the same.",
            // passwordStrength: {
            //   containsAtLeast: "Contain at least %d of the following %d types of characters:",
            //   identicalChars: "No more than %d identical characters in a row (e.g., "%s" not allowed)",
            //   nonEmpty: "Non-empty password required",
            //   numbers: "Numbers (i.e. 0-9)",
            //   lengthAtLeast: "At least %d characters in length",
            //   lowerCase: "Lower case letters (a-z)",
            //   shouldContain: "Should contain:",
            //   specialCharacters: "Special characters (e.g. !@#$%^&*)",
            //   upperCase: "Upper case letters (A-Z)"
            // },
            // successMessage: "Your password has been reset successfully.",
            // configurationError: "An error ocurred. There appears to be a misconfiguration in the form.",
            // networkError: "The server cannot be reached, there is a problem with the network.",
            // timeoutError: "The server cannot be reached, please try again.",
            // serverError: "There was an error processing the password reset.",
            // headerText: "Enter a new password for<br />{email}",
            // title: "Change Password",
            // weakPasswordError: "Password is too weak."
            // passwordHistoryError: "Password has previously been used."
        }
    });*/
})
