// Get the modal
var deleteModal = document.getElementById("DeleteModal");

// Get the button that opens the modal
var buttons = document.getElementsByClassName("event");
for(const button of buttons)
{
    button.onclick = function() {
        deleteModal.style.display = "block";
    }
}

//Get the <span> element that closes the modal
var deleteSpan = document.getElementById("delete-close");

// When the user clicks on the button, open the modal


// When the user clicks on <deleteSpan> (x), close the modal
deleteSpan.onclick = function() {
    deleteModal.style.display = "none";
}

window.addEventListener("click", (event) => {
    if (event.target == deleteModal) {
        deleteModal.style.display = "none";
    }
})