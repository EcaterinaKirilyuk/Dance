var addForm = document.querySelector(`#myModal form`);
var modalElements = document.querySelectorAll("input");
modalElements.forEach(function(element) {
    element.addEventListener('click', () => {
        removeElement(".required");
    });
})

var modalButtonAdd = addForm.querySelector('button[type="submit"]');

modalButtonAdd.addEventListener('click', event => {
    event.preventDefault();
    
    removeElement(".required");

    const modalData = new FormData(addForm);
    modalData.set("token", localStorage.token); 

    if(validateModal(modalData) === true) {
        modalData.set("datetime", modalData.get("date") + " "  + modalData.get("time"));
        modalData.delete("date");
        modalData.delete("time");
        post(modalData, "calendar/training", onSuccessCreateTraining);
    }
});

function onSuccessCreateTraining() {
    var response = JSON.parse(this.response);
    if(response.success == true) {
        manageTrainings();
        var modal = document.querySelector("#myModal");
        modal.style.display = "none";
        modal.querySelector("form").reset();
    }
}

function addElementAfterElement (name, message) {
    var element = document.createElement("div");
    element.innerText= message;
    element.className = "required";

    var input = document.querySelector((`input[name="${name}"]`));
    input.parentElement.insertBefore(element, input.nextSibling);
}

function removeElement (className) {
    var element = document.querySelector(className);
    if(element != null) {
        element.parentNode.removeChild(element);
    }
}

function validateModal (modalData) {
    if(!required(modalData.get("date"))) {
        return addElementAfterElement("date", "Write date");
    }

    if(!required(modalData.get("time"))) {
        return addElementAfterElement("time", "Write time");
    }

    if(!required(modalData.get("style"))) {
        return addElementAfterElement("style", "Write style");
    }

    return true;
}