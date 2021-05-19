function required (value) {
    if( value === "") {
        return false;
    } else {
        return true;
    }
}

function email(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}