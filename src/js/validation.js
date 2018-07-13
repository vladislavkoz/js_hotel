let fields;
let phoneNumber;
let selects;
let startDate;
let endDate;

function validation() {
    let form = document.getElementById("addNewReservation");
    fields = form.querySelectorAll('.field');
    phoneNumber = form.querySelector('.phoneNumber');
    selects = form.querySelectorAll('.sel');
    startDate = form.querySelector('#checkInDate');
    endDate = form.querySelector('#checkOutDate');

    if (!validateTextFields(fields)) {
        return false;
    }
    if (!validatePhoneNumber(phoneNumber)) {
        return false;
    }
    if (!validateSelects(selects)) {
        return false;
    }
    if (!validateDates(startDate, endDate)) {
        return false;
    } else {
        cleanAllValidation();
        return true;
    }
}

function cleanDatesValidation(startDateField, endDateField) {
    let dates = [startDateField, endDateField];
    for (let i = 0; i < dates.length; i++) {
        dates[i].classList.remove('is-valid');
        dates[i].classList.remove('is-invalid');
    }
}

function validateDates(startDate, endDate) {
    cleanDatesValidation(startDate, endDate);
    if (startDate.value === "") {
        setNagativeValidation(startDate);
        return false;
    }
    let today = getTodayDate();
    let checkInDate = new Date(startDate.value);
    if (checkInDate < today) {
        setNagativeValidation(startDate);
        return false;
    }
    if (endDate.value === "") {
        setNagativeValidation(endDate);
        return false;
    }
    let checkOutDate = new Date(endDate.value);
    if (checkInDate > checkOutDate) {
        setNagativeValidation(startDate);
        setNagativeValidation(endDate);
        return false;
    }
    return true;
}

function getTodayDate() {
    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return today;
}

function validatePhoneNumber(number) {
    cleanFieldValidation(number);
    if (checkPhoneNumber(number)) {
        setPositiveValidation(number)
    } else {
        setNagativeValidation(number);
        return false;
    }
    return true;
}

function checkPhoneNumber(number) {
    return (/^\d[\d\(\)\ -]{4,14}\d$/.test(number.value));
}

function validateTextFields(fields) {
    cleanFieldsValidation(fields);
    for (let i = 0; i < fields.length; i++) {
        if (checkTextField(fields[i])) {
            setPositiveValidation(fields[i]);
        } else {
            setNagativeValidation(fields[i]);
            return false;
        }
    }
    return true;
}

function cleanFieldValidation(field) {
    field.classList.remove("is-valid");
    field.classList.remove("is-invalid");
}

function cleanFieldsValidation(fields) {
    for (let i = 0; i < fields.length; i++) {
        fields[i].classList.remove("is-valid");
        fields[i].classList.remove("is-invalid");
    }
}

function checkTextField(field) {
    if (!field.value) {
        return false;
    }
    return (/^[a-zA-Z-\s]+$/.test(field.value));
}

function setPositiveValidation(field) {
    field.classList.add("is-valid");
}

function setNagativeValidation(field) {
    field.classList.add("is-invalid");
}

function validateSelects(selects) {
    cleanFieldsValidation(selects);
    for (let i = 0; i < selects.length; i++) {
        if (checkSelect(selects[i])) {
            setPositiveValidation(selects[i])
        } else {
            setNagativeValidation(selects[i]);
            return false;
        }
    }
    return true;
}

function checkSelect(select) {
    return select.value !== "Choose";
}

function cleanAllValidation() {
    cleanFieldsValidation(fields);
    cleanFieldsValidation(selects);
    cleanFieldValidation(phoneNumber);
    cleanDatesValidation(startDate, endDate);
}