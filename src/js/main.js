window.onload = init;
var reservationsUrl = 'http://localhost:3000/reservations';
var apartmentsUrl = 'http://localhost:3000/apartments';

function init() {
    showStartPage();
    let reservationForm = document.getElementById("addNewReservation");
    reservationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validation()){
            addNewReservation();
            resetReservationForm();
        }
    })
}

function showStartPage(){
    document.getElementById('startPage').appendChild(getReservationForm());

}

function getReservationForm(){
    let template = document.getElementById('template-reservationForm');
    let reservationForm = template.content.getElementById('reservationForm');
    let reservationFormClone = reservationForm.cloneNode(true);
    return reservationFormClone;
}

function loadReservations(){
    return fetch(reservationsUrl).then(response => response.json());
}

function renderReservations(reservations){
    let reservationElement = document.getElementById('template-reservation');
    let templateContent = reservationElement.content.getElementById('reservationCard');
    let reservationsDiv = document.getElementById('reservations');
    let reservationsList = reservationsDiv.querySelector('#reservationsList');
    reservationsList.innerHTML = '';
    for (let res of reservations) {
        let reservationClone = templateContent.cloneNode(true);
        updateReservationElement(reservationClone, res);
        reservationsList.appendChild(reservationClone);
    }
}

function addNewReservation(){
    let clName = document.getElementById("clientName").value;
    let clPhone = document.getElementById("clientPhone").value;
    let apAccommodation = document.getElementById("apartmentAccommodation").value;
    let apComfortType = document.getElementById("apartmentComfortType").value;
    let checkInDate = document.getElementById("checkInDate").value;
    let checkOutDate = document.getElementById("checkOutDate").value;
        return fetch(reservationsUrl, {
        method: "POST",
        body: JSON.stringify({
            clientName: clName,
            clientTelephone: clPhone,
            apartmentAccommodation: apAccommodation,
            apartmentComfortType: apComfortType,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate
        }),
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
}

function addReservationFormToModalWindow() {
    document.getElementById('modalBody').appendChild(getReservationForm());
    document.getElementById('reservationButton').innerText = 'Confirm';
}

function resetReservationForm() {
    var reservationForm = document.getElementById("addNewReservation");
    reservationForm.reset();
}

function updateReservationElement(element, res) {
    element.id = res.id;
    element.querySelector('#name').innerText = res.clientName;
    element.querySelector('#telephone').innerText = res.clientTelephone;
    element.querySelector('#comfort').innerText = res.apartmentComfortType;
    element.querySelector('#accommodation').innerText = res.apartmentAccommodation;
    element.querySelector('#checkIn').innerText = res.checkInDate;
    element.querySelector('#checkOut').innerText = res.checkOutDate;
}

function removeReservation(element){
    fetch(reservationsUrl + '/' + element.id,{
        method: 'delete'
    })
        .then(response => response.json());
    element.remove();
}

function showReservationBook(){
    cleanPage();
    addReservationFormToModalWindow();
    addUpdatingEventListener()
    loadReservations().then(renderReservations);
}

function addUpdatingEventListener() {
    document.getElementById('reservationButton').addEventListener('click', (event) => {
        event.preventDefault();
        if (validation()){
            updateReservation();
        }
    })
}

function cleanPage() {
    cleanReservationPage();
    cleanReservationsBookPage();
    cleanApartmentsPage();
    removeReservationFormFromModalWindow();
}

function removeReservationFormFromModalWindow() {
    document.getElementById('modalBody').innerHTML = '';
}

function cleanReservationPage() {
    let reservationPage = document.getElementById('container').querySelector('#startPage');
    clean(reservationPage);
}

function cleanApartmentsPage() {
    let apartmentsPage = document.getElementById('apartments');
    let apartmentsContent = apartmentsPage.querySelector('#apartmentsList');
    clean(apartmentsContent);
}

function cleanReservationsBookPage() {
    let reservationsBookPage = document.getElementById('reservations');
    let reservationsList = reservationsBookPage.querySelector('#reservationsList');
    clean(reservationsList);
}

function clean(page) {
    page.innerHTML = '';
}

function showApartments(){
    cleanPage();
    addReservationFormToModalWindow();
    loadApartments().then(renderApartments);
}

function addReservationsFromCurrentApartment(element) {
    fillApartmentsDataInReservationForm(element);
    openModalWindow();
    setConfirmReservationEventListener();
}
function  setConfirmReservationEventListener(){
    document.getElementById('reservationButton').addEventListener('click', (event) => {
        event.preventDefault();
        if (validation()){
            addNewReservation()
                .then(closeModalWindow);
        }
    })
}

function fillApartmentsDataInReservationForm(apartment) {
    let accommodationType = apartment.querySelector('#accommodationType').innerHTML;
    let comfortType = apartment.querySelector('#comfortType').innerHTML;
    let updatingForm = document.getElementById('reservationForm');
    updatingForm.querySelector('#apartmentAccommodation').value = accommodationType;
    updatingForm.querySelector('#apartmentComfortType').value = comfortType;
}

function loadApartments(){
    return fetch(apartmentsUrl).then(response => response.json());
}

function renderApartments(apartments){
    let apartmentElement = document.getElementById('template-apartment');
    let templateContent = apartmentElement.content.getElementById('apartmentCard');
    let apartmentsList = document.getElementById('apartmentsList');
    for (let aps of apartments) {
        let apartmentClone = templateContent.cloneNode(true);
        updateApartmentElement(apartmentClone, aps);
        apartmentsList.appendChild(apartmentClone);
    }
}

function updateApartmentElement(apartmentElement,aps){
    apartmentElement.querySelector('#id').innerText = aps.id;
    apartmentElement.querySelector('#accommodationType').innerText = aps.accommodationType;
    apartmentElement.querySelector('#comfortType').innerText = aps.comfortType;
}

function fillDataInReservationForm(element) {
    openModalWindow();
    let updatingForm = document.getElementById('reservationForm');
    let name = element.querySelector('#name');
    let telephone = element.querySelector('#telephone');
    let accommodation = element.querySelector('#accommodation');
    let comfort = element.querySelector('#comfort');
    let checkIn = element.querySelector('#checkIn');
    let checkOut = element.querySelector('#checkOut');
    updatingForm.querySelector('#clientName').value = name.innerHTML;
    updatingForm.querySelector('#clientPhone').value = telephone.innerHTML;
    updatingForm.querySelector('#apartmentAccommodation').value = accommodation.innerHTML;
    updatingForm.querySelector('#apartmentComfortType').value = comfort.innerHTML;
    updatingForm.querySelector('#checkInDate').value = checkIn.innerHTML;
    updatingForm.querySelector('#checkOutDate').value = checkOut.innerHTML;
    updatingForm.querySelector('#reservationId').innerHTML = element.id;
}

function updateReservation() {
   let updatingForm = document.getElementById('reservationForm');
    fetch(reservationsUrl + '/' + updatingForm.querySelector('#reservationId').innerHTML,{
        method: 'PATCH',
        body: JSON.stringify({
            clientName: updatingForm.querySelector('#clientName').value,
            clientTelephone: updatingForm.querySelector('#clientPhone').value,
            apartmentAccommodation: updatingForm.querySelector('#apartmentAccommodation').value,
            apartmentComfortType: updatingForm.querySelector('#apartmentComfortType').value,
            checkInDate: updatingForm.querySelector('#checkInDate').value,
            checkOutDate: updatingForm.querySelector('#checkOutDate').value
        }),
        headers:{
            'Accept': 'application/json, text/plain,*/*',
            'Content-Type': 'application/json'
        }
    }).then(loadReservations).then(renderReservations);
    closeModalWindow()
}

function closeModalWindow() {
    $('#exampleModalCenter').modal('hide');
}
function openModalWindow() {
    $('#exampleModalCenter').modal('show');
}