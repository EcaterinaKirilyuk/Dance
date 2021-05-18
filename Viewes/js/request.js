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