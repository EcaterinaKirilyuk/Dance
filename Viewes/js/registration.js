/**
 * querySelector()
 * div              --- tag
 * .class           --- class
 * #id              --- id
 * [type=text]      --- attribute
 */

var form = document.querySelector(`form`);
var formData = new FormData(form);
var fullname = formData.get("fullname");
var email = formData.get("email");
var password = formData.get("password");
var confirmPassword = formData.get("confirm-password");

function required (value) {
    if( value === "") {
        return false;
    } else {
        return true;
    }
}

function validateRegister (formData) {

    if(formData.get("fullname") === "") {
        // var element=document.createElement("div");
        return "Write your fullname!"
    }

    if(formData.get("email") === "") {
        return "Write your email!"  
    }

    if(formData.get("password") === "") {
        return "Write your password!"
    }

    if(formData.get("confirm-password") === "") {
        return "Confirm your fullname!"
    }

    return formData;

    // if( formData.get("fullname") === "" 
    //     || formData.get("email") === "" 
    //     || formData.get("password") === "" 
    //     || formData.get("confirm-password") === ""
    // ) {
    //     return false;
    // } else {
    //     return true;
    // }
}

function request (formData) {
    var oReq = new XMLHttpRequest();
    oReq.open("POST", "http://dance.com/router/register", true);
    oReq.send(formData);
}

request(formData);
console.log(required(fullname));
console.log(required(email));
console.log(required(password));
console.log(required(confirmPassword));
validateRegister(formData);
