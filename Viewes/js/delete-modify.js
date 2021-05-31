// Get the modal
var deleteModal = document.getElementById("DeleteModal");

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