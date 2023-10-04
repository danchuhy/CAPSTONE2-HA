function validateRequiredField(value, idErr, message) {

    if (value.trim() == "") {
        document.querySelector(idErr).innerHTML = message;
        return false;
    } else {
        document.querySelector(idErr).innerHTML = "";
        return true;
    }
}

function validateNumberField(value, idErr, message) {
    const numberPattern = /^[0-9]+$/;

    if (numberPattern.test(value)) {
        document.querySelector(idErr).innerHTML = "";
        return true;
    } else {
        document.querySelector(idErr).innerHTML = message;
        return false;
    }
}

function validateURLField(value, idErr, message) {
    const urlPattern = /^(http|https):\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/;
    if (urlPattern.test(value)) {
        document.querySelector(idErr).innerHTML = "";
        return true;
    } else {
        document.querySelector(idErr).innerHTML = message;
        return false;
    }
}

function validateNameField(value, idErr, message) {
    const namePattern = /[a-zA-Z]/;

    if (namePattern.test(value)) {
        document.querySelector(idErr).innerHTML = "";
        return true;
    } else {
        document.querySelector(idErr).innerHTML = message;
        return false;
    }
}