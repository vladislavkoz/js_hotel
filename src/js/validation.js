var fields;
var phoneNumber;
var selects;
function validation() {
     let form = document.getElementById("addNewReservation");
     let fields = form.querySelectorAll('.field');
     let phoneNumber = form.querySelector('.phoneNumber');
     let selects = form.querySelectorAll('.sel');
     let startdate = form.querySelector('#checkInDate');
     let endDate = form.querySelector('#checkOutDate');

    if (!validateTextFields(fields)){
        return false;
    }
    if(!validatePhoneNumber(phoneNumber)){
        return false;
    }
    if (!validateSelects(selects)){
        return false;
    }
    return (validateDates(startdate, endDate));
}

function cleanDatesValidation(startDate, endDate) {

}

function validateDates(startdate, endDate){
    if (startdate.value == ""){
        return false;
    }
    if (endDate.value == ""){
        return false;
    }
    let today = new Date();
    if (startdate > endDate){
        return false;
    }
    if (startdate < today){
        return false;
    }
    return true;
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
    return (/^[a-zA-Z-\s]+$/.test(field.value));
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
            setNagativeValidation(selects[i]);
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