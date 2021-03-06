
function loadPosts(rows, from) {
    var lenta = document.querySelector(".lenta");
    var data = new Map();
    data.set("rows", rows);
    data.set("from", from);
    data.set("style", lenta.dataset.style);
    get(data, "post", onSuccessUpdateList);
}

loadPosts(10, 0);

function onSuccessUpdateList() {
    var response = JSON.parse(this.response);
    if (response.success == true) {
        response.list.forEach(function(row){
            if(row.file_type == "IMAGE") {
                var lentaBlock=createImageBlock (row.datetime, row.link, row.comment);
            } else {
                var lentaBlock=createVideoBlock (row.datetime, row.link, row.comment);
            }
            
            var lenta = document.querySelector(".lenta");
            lenta.appendChild(lentaBlock);
        });
    }

    loadingLentaData = false;
}

function createImageBlock (date, link, comment) {
    var lentaBlock = document.createElement("div");
    lentaBlock.className="lenta-block";

    var dateDiv = document.createElement("div");
    dateDiv.className="date";
    var dateP = document.createElement("p");
    dateDiv.appendChild(dateP);
    dateP.innerText=date;

    var photoDiv = document.createElement("div");
    photoDiv.className="photo";
    var photoImg = document.createElement("img");
    photoDiv.appendChild(photoImg);
    photoImg.src=".."+link;

    var commentDiv = document.createElement("div");
    commentDiv.className="comment";
    var commentP = document.createElement("p");
    commentDiv.appendChild(commentP);
    commentP.innerText=comment;

    lentaBlock.appendChild(dateDiv);
    lentaBlock.appendChild(photoDiv);
    lentaBlock.appendChild(commentDiv);

    return lentaBlock;
}

function createVideoBlock (date, link, comment) {
    var lentaBlock = document.createElement("div");
    lentaBlock.className="lenta-block";

    var dateDiv = document.createElement("div");
    dateDiv.className="date";
    var dateP = document.createElement("p");
    dateDiv.appendChild(dateP);
    dateP.innerText=date;

    var videoDiv = document.createElement("div");
    videoDiv.className="video";
    var video = document.createElement("video");
    video.controls = true;
    videoDiv.appendChild(video);
    var source = document.createElement("source");
    source.src=".."+link;
    video.appendChild(source);


    var commentDiv = document.createElement("div");
    commentDiv.className="comment";
    var commentP = document.createElement("p");
    commentDiv.appendChild(commentP);
    commentP.innerText=comment;

    lentaBlock.appendChild(dateDiv);
    lentaBlock.appendChild(videoDiv);
    lentaBlock.appendChild(commentDiv);

    return lentaBlock;
}

function clearLenta () {
    var lenta = document.querySelector(".lenta");
    lenta.innerHTML = '';
}