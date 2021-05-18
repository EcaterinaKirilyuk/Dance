/**
 * querySelector()
 * div              --- tag
 * .class           --- class
 * #id              --- id
 * [type=text]      --- attribute
 */

var form = document.querySelector(`form`);
form.addEventListener('click', () => {
    removeElement(".required");
    removeElement(".error");
});

var buttonReg = document.getElementById("button-reg");
buttonReg.addEventListener('click', event => {
    event.preventDefault();

    const formData = new FormData(form);
    if(validateRegister(formData) === true) {
        post(formData, "register", showOnConsole);
    }
});

/**
 * @this XMLHttpRequest
 */
function showOnConsole() {
    var response = JSON.parse(this.response);
    
    if(response.success == true) {
        window.location.href="http://dance.com/viewes/login.html";
    } else {
        var elementError = document.createElement("div");
        elementError.innerText=response.message;
        elementError.className="error";

        var cardForm = document.querySelector(`.card-form`);
        cardForm.parentElement.insertBefore(elementError, cardForm);
    }
}

function required (value) {
    if( value === "") {
        return false;
    } else {
        return true;
    }
}

function addElement (name, message) {
    var element = document.createElement("div");
    element.innerText= message;
    element.className = "required";
    var input = document.querySelector(`input[name="${name}"]`);
    input.parentElement.insertBefore(element, input.nextSibling);
}

function removeElement (className) {
    var element = document.querySelector(className);
    if(element != null) {
        element.parentNode.removeChild(element);
    }
}

function email(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validateRegister (formData) {

    if(!required(formData.get("fullname"))) {
        return addElement("fullname", "Write fullname");
    }

    if(!required(formData.get("email"))) {
        return addElement("email", "Write email");
    }

    if(!email(formData.get("email"))) {
        return addElement("email", "Incorrect email format"); 
    }

    if(!required(formData.get("password"))) {
        return addElement("password", "Write password");
    }

    if(!required(formData.get("confirm-password"))) {
        return addElement("confirm-password", "Confirm password");
    }

    return true;
}

