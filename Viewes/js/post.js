
var formData = new FormData();
formData.set("token", localStorage.token); 
post(formData, "user/type", checkUserType);

function checkUserType () {
    var response = JSON.parse(this.response);
    if(response.success == true) {
        if(response.type == "TRAINER")
        {
            var buttonAddNew = document.querySelector("button.hidden");
            buttonAddNew.classList.remove("hidden");
        }
    }
}