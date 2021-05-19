var buttonLogout = document.getElementById("logout");
buttonLogout.addEventListener('click', () => {   
    delete localStorage.token;
    location.reload(); 
});


