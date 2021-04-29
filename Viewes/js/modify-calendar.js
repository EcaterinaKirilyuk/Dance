// Get the modal
var addModal = document.getElementById("myModal");

// Get the button that opens the addModal
var button = document.getElementById("modify-calendar");

// Get the <addSpan> element that closes the addModal
var addSpan = document.getElementById("add-close");

// When the user clicks on the button, open the addModal
button.onclick = function() {
    addModal.style.display = "block";
}

// When the user clicks on <addSpan> (x), close the addModal
addSpan.onclick = function() {
    addModal.style.display = "none";
}

window.addEventListener("click", (event) => {
    if (event.target == addModal) {
        addModal.style.display = "none";
    }
})