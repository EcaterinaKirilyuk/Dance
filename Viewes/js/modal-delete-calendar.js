var delForm = document.querySelector(`#DeleteModal form`);

var modalButtonDel = delForm.querySelector('button[type="submit"]');

modalButtonDel.addEventListener('click', event => {
    event.preventDefault();

    const modalData = new FormData(delForm);
    modalData.set("token", localStorage.token); 
    del(modalData, "calendar/training", onSuccessDeleteTraining);

});

function onSuccessDeleteTraining() {
    var response = JSON.parse(this.response);
    
    if(response.success == true) {
        manageTrainings();
        var modal = document.querySelector("#DeleteModal");
        modal.style.display = "none";
    }
}



