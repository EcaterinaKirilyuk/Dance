var loadingLentaData = false;

var formModal = document.querySelector(`form`);
var formInputText = document.querySelectorAll("form input, form textarea");
formInputText.forEach(function(element) {
    element.addEventListener('click', () => {
        removeElement(".required");
    });
})

var modalButton = document.getElementById("save");

modalButton.addEventListener('click', event => {
    event.preventDefault();
    
    removeElement(".required");

    const modalData = new FormData(formModal);
    modalData.set("token", localStorage.token); 

    if(validateModal(modalData) === true) {
        post(modalData, "post", onSuccessPostAdd);
    }
});

document.addEventListener('scroll', () => {
    var lenta = document.querySelector('.lenta');
    var from = lenta.children.length;

    if(getElementPosition(4) < 0 && !loadingLentaData && from % 10 == 0) {
        loadingLentaData = true;
        loadPosts(10, from);
    }
});

function onSuccessPostAdd() {
    var response = JSON.parse(this.response);
    
    if(response.success == true) {
        var modal = document.querySelector("#myModal");
        modal.style.display = "none";
        clearLenta();
        loadPosts(10, 0);
    }
}

function getElementPosition (number) {
    var elements = document.querySelector('.lenta');
    var index=elements.children.length-number-1;
    var indexElem=elements.children[index];
    var positionElem=indexElem.getBoundingClientRect();
    return positionElem.top;
}

function addElementModalInput (name, message) {
    var element = document.createElement("div");
    element.innerText= message;
    element.className = "required";

    var input = document.querySelector(`input[name="${name}"]`);
    input.parentElement.insertBefore(element, input.nextSibling);
}

function addElementModalText (name, message) {
    var element = document.createElement("div");
    element.innerText= message;
    element.className = "required";

    var text = document.querySelector(`textarea[name="${name}"]`);
    text.parentElement.insertBefore(element, text.nextSibling);
}

function removeElement (className) {
    var element = document.querySelector(className);
    if(element != null) {
        element.parentNode.removeChild(element);
    }
}

function validateModal (modalData) {
    if(!required(modalData.get("file"))) {
        return addElementModalInput("file", "Upload your file");
    }

    if(!required(modalData.get("comment"))) {
        return addElementModalText("comment", "Write comment");
    }
    
    if(!lengthStringVerify(modalData.get("comment"), 250)) {
        return addElementModalText("comment", "Invalid length. The maximum length is 250 characters."); 
    }

    return true;
}
