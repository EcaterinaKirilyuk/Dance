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