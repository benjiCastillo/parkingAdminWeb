
var eText = document.getElementById("errorText");
var sText = document.getElementById("successText");
 eText.style.display = "none";
 sText.style.display = "none";

function login(){
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    console.log(user+" "+pass)
    if(user == "benji" && pass == "parking"){
        console.log("correcto");
        sText.style.display = "block";
        eText.style.display = "none";
        setTimeout(function() {
            window.location = 'index.html'
        }, 1000);
    }else{
        console.log("error");
        eText.style.display = "block";
        sText.style.display = "none";
    }
}