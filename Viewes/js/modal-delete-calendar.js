var delForm = document.querySelector(`#DeleteModal form`);

var modalButton = document.getElementById("save");

modalButton.addEventListener('click', event => {
    event.preventDefault();
    
    removeElement(".required");

    const modalData = new FormData(delForm);
    modalData.set("token", localStorage.token); 

    if(validateModal(modalData) === true) {
        modalData.set("datetime", modalData.get("date") + " "  + modalData.get("time"));
        modalData.delete("date");
        modalData.delete("time");
        del(modalData, "calendar/training", onSuccessDeleteTraining);
    }
});

function onSuccessDeleteTraining() {
    var response = JSON.parse(this.response);
    
    if(response.success == true) {
        var modal = document.querySelector("#DeleteModal");
        modal.style.display = "none";
    }
}



