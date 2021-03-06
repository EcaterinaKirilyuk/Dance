function loadHtml(page, loadAfter) {
    var con = document.querySelector('div.content');
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            con.innerHTML = xhr.responseText;
            if(typeof loadAfter === "function") {
                loadAfter();
            }
        }
    }

    xhr.open("GET",`http://${document.location.host}/viewes/${page}.html`, true);
    xhr.setRequestHeader('Content-type', 'text/html');
    xhr.send();
}

function loadJs(fileName) {
    var script = document.createElement("script");
    script.src = `http://${document.location.host}/viewes/js/${fileName}.js`;
    document.head.appendChild(script);
}

/**
 * 
 * @param {string} elementId 
 * @param {function} loadFunction Loads HTML and JS
 */
function loadButton(elementId, loadFunction) {
    const button = document.getElementById(elementId);
    button.addEventListener("click", loadFunction);
}

function loadContacts() {
    loadHtml("contacts");
    // loadJs("contacts");
}

function loadSalsa() {
    loadHtml("salsa");
    loadJs("modal");
    loadJs("file-input");
    loadJs("request");
    loadJs("lenta");
    loadJs("check-user-type");
    loadJs("modal-dance-styles");
    loadJs("validate");
}

function loadKizomba() {
    loadHtml("kizomba");
    loadJs("modal");
    loadJs("file-input");
    loadJs("request");
    loadJs("lenta");
    loadJs("check-user-type");
    loadJs("modal-dance-styles");
    loadJs("validate");
}

function loadBachata() {
    loadHtml("bachata");
    loadJs("modal");
    loadJs("file-input");
    loadJs("request");
    loadJs("lenta");
    loadJs("check-user-type");
    loadJs("modal-dance-styles");
    loadJs("validate");
}

function loadHome() {
    loadHtml("home", connectJsToHome);
}

function connectJsToHome() {
    loadButton("bachata-about-page", loadBachata);
    loadButton("kizomba-about-page", loadKizomba);
    loadButton("salsa-about-page", loadSalsa);
}

function loadCalendar() {
    loadHtml("calendar");
    loadJs("modify-calendar");
    loadJs("delete-modify");
    loadJs("request");
    loadJs("calendar");
    loadJs("check-user-type");
    loadJs("modal-add-calendar");
    loadJs("modal-delete-calendar");
    loadJs("validate");
}

loadHome();
loadButton("home-page-button", loadHome);
loadButton("bachata-page-button", loadBachata);
loadButton("kizomba-page-button", loadKizomba);
loadButton("salsa-page-button", loadSalsa);
loadButton("contacts-page-button", loadContacts);
loadButton("calendar-page-button", loadCalendar);
