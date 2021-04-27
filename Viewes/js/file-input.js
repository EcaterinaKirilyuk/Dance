var uploadButton = document.getElementById("yourBtn");
var inputButton = document.getElementById("upfile");
var fileNameInput = document.getElementById("file-name");
uploadButton.addEventListener("click", () => {
    inputButton.click();
});
fileNameInput.addEventListener("click", () => {
    inputButton.click();
});

inputButton.addEventListener("change", (event) => {
    var file = event.target.value;
    var fileData = file.split("\\");
    var fileName = fileData[fileData.length - 1];

    if(fileName.length > 52) {
        fileName = fileName.substr(0, 49).concat("...");
    }

    fileNameInput.value = fileName;
});