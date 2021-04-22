function load_html(page) {
    var con = document.getElementById('content');
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            con.innerHTML = xhr.responseText;
        }
    }

    xhr.open("GET",`http://${document.location.host}/Viewes/${page}.html`, true);
    xhr.setRequestHeader('Content-type', 'text/html');
    xhr.send();
}

function load_js(fileName) {
    var script = document.createElement("script");
    script.src = `http://${document.location.host}/Viewes/js/${fileName}.js`;
    document.head.appendChild(script);
}

function load_contacts() {
    load_html("contacts");
    // load_js("contacts");
}