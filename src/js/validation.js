var fields;
var phoneNumber;
var selects;
function validation() {
     form = document.getElementById("addNewReservation");
     fields = form.querySelectorAll('.field');
     phoneNumber = form.querySelector('.phoneNumber');
     selects = form.querySelectorAll('.sel');
    if (!validateTextFields(fields)){
        return false;
    }
    if(!validatePhoneNumber(phoneNumber)){
        return false;
    }
    return validateSelects(selects);
}

function validatePhoneNumber(number) {
    cleanFieldValidation(number);
    if (checkPhoneNumber(number)){
        setPositiveValidation(number)
    }else{
        setNagativeValidation(number);
        return false;
    }
    return true;
}

function checkPhoneNumber(number) {
    return(/^\d[\d\(\)\ -]{4,14}\d$/.test(number.value));
}

function validateTextFields(fields){
    cleanFieldsValidation(fields);
    for (let i = 0; i < fields.length; i++) {
        if (checkTextField(fields[i])){
            setPositiveValidation(fields[i]);
        }else {
            setNagativeValidation(fields[i]);
            return false;
        }
    }
    return true;
}

function cleanFieldValidation(entity) {
    entity.classList.remove("is-valid");
    entity.classList.remove("is-invalid");
}

function cleanFieldsValidation(entity){
    for (let i = 0; i < entity.length; i++) {
        entity[i].classList.remove("is-valid");
        entity[i].classList.remove("is-invalid");
    }
}

function checkTextField(field){
    if (!field.value){
        return false;
    }
    return (/^[a-zA-Z1-9]+$/.test(field.value));
}

function setPositiveValidation(entity){
    entity.classList.add("is-valid");
}

function setNagativeValidation(entity) {
    entity.classList.add("is-invalid");
}

function validateSelects(selects){
    cleanFieldsValidation(selects);
    for (let i = 0; i < selects.length; i++) {
        if (checkSelect(selects[i])){
            setPositiveValidation(selects[i])
        } else{
            setNagativeValidation(selects[i])
            return false;
        }
    }
    return true;
}

function checkSelect(select) {
    return select.value !== "Choose";
}

function removeAllValidation() {
    cleanFieldsValidation(fields);
    cleanFieldsValidation(selects);
    cleanFieldValidation(phoneNumber);
}