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

function lengthStringVerify(text, length) {
    if(text.length > length) {
        return false;
    }
    else {
        return true;
    }
}