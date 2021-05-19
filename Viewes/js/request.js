/**
 * Executes HTTP request
 * @param {FormData} data 
 * @param {string} uri 
 * @param {string} method 
 * @param {function(this: XMLHttpRequest,ProgressEvent<EventTarget>): void} onSuccess Function executed on load
 */
function request (data, uri, method, onSuccess) {
    var url = `http://dance.com/router/${uri}`;
    var oReq = new XMLHttpRequest();
    oReq.onload = onSuccess;
    oReq.open(method, url, true);
    oReq.send(data);
}

/**
 * Executes POST request to API
 * @param {FormData} data 
 * @param {string} uri 
 * @param {function(this: XMLHttpRequest,ProgressEvent<EventTarget>): void} onSuccess 
 */
function post(data, uri, onSuccess) {
    request(data, uri, "POST", onSuccess);
}

function put(data, uri, onSuccess) {
    request(data, uri, "PUT", onSuccess);
}

/**
 * Executes GET request to API
 * @param {Map<string,string>} data Parameters for GET request in a Map format
 * @param {string} uri uri
 * @param {function(this: XMLHttpRequest,ProgressEvent<EventTarget>): void} onSuccess 
 */
function get(data, uri, onSuccess) {
    uri += mapToQueryParams(data);
    request(null, uri, "GET", onSuccess);
}

function del(data, uri, onSuccess) {
    uri += mapToQueryParams(data);
    request(null, uri, "DELETE", onSuccess);
}

/**
 * Transform Map to query
 * @param {Map<string,string>} data 
 * @returns {string}
 */
function mapToQueryParams(data) {
    var query = "?";
    data.forEach(function(value, key){
        query += key + '=' + value + '&';
    });

    return query;
}
