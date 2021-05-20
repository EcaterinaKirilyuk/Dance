if(localStorage.token != null) {
    var buttonLogin = document.querySelector(`#button-log`);
    var buttonRegister = document.querySelector(`#button-reg`);
    buttonLogin.className = "buttons-layout";
    buttonRegister.className = "buttons-layout";
}
else {
    var buttonLogout = document.querySelector(`#logout`);
    var buttonCalendar = document.querySelector(`#calendar-page-button`);
    buttonLogout.className = "buttons-layout";
    buttonCalendar.className = "buttons-layout";
}


var buttonMenu = document.querySelector("#home-page-button");
buttonMenu.classList.add("active");
buttonMenu.addEventListener('click', () => {
    var activeButton = document.querySelector(".active");
    activeButton.classList.remove("active");
    buttonMenu.classList.add("active");
});
var buttonsMenu = document.querySelectorAll(".nav-menu li");
buttonsMenu.forEach(function(element) {
    element.addEventListener('click', () => {
        var activeButton = document.querySelector(".active");
        activeButton.classList.remove("active");
        element.className = "active";
    });
});
