window.onload = init;
var reservationsUrl = 'http://localhost:3000/reservations';
var apartmentsUrl = 'http://localhost:3000/apartments';

function init() {
    let reservationForm = document.getElementById("addNewReservation");
    reservationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validation()){
            AddNewReservation();
            removeAllValidation();
            resetReservationForm();
        }
    })
}

function loadReservations(){
    return fetch(reservationsUrl).then(response => response.json());
}

function renderReservations(reservations){
    let reservationElement = document.getElementById('template-reservation');
    let templateContent = reservationElement.content.getElementById('post');
    let reservationsDiv = document.getElementById('reservations');
    let reservationsList = reservationsDiv.querySelector('#reservationsList');
    reservationsList.innerHTML = '';
    for (let res of reservations) {
        let reservationClone = templateContent.cloneNode(true);
        updateReservationElement(reservationClone, res);
        reservationsList.appendChild(reservationClone);
    }
}

function AddNewReservation(){
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
    loadReservations().then(renderReservations);
}

function cleanPage() {
    cleanReservationPage();
    cleanReservationsBookPage();
    cleanApartmentsPage();
}

function cleanReservationPage() {
    let reservationPage = document.getElementById('reservationForm');
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
    loadApartments().then(renderApartments);
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

function changeUpdatingReservationForm(element) {
    let updatingForm = document.getElementById('reservationUpdatingForm');
    let name = element.querySelector('#name');
    let telephone = element.querySelector('#telephone');
    let accommodation = element.querySelector('#accommodation');
    let comfort = element.querySelector('#comfort');
    let checkIn = element.querySelector('#checkIn');
    let checkOut = element.querySelector('#checkOut');
    let id = element.id;
    updatingForm.querySelector('#clName').value = name.innerHTML;
    updatingForm.querySelector('#clPhone').value = telephone.innerHTML;
    updatingForm.querySelector('#apAccommodation').value = accommodation.innerHTML;
    updatingForm.querySelector('#apComfortType').value = comfort.innerHTML;
    updatingForm.querySelector('#inDate').value = checkIn.innerHTML;
    updatingForm.querySelector('#outDate').value = checkOut.innerHTML;
    updatingForm.querySelector('#updatingElementId').innerHTML = id;
}

function updateReservation() {
   let updatingForm = document.getElementById('reservationUpdatingForm');
    fetch(reservationsUrl + '/' + updatingForm.querySelector('#updatingElementId').innerHTML,{
        method: 'PATCH',
        body: JSON.stringify({
            clientName: updatingForm.querySelector('#clName').value,
            clientTelephone: updatingForm.querySelector('#clPhone').value,
            apartmentAccommodation: updatingForm.querySelector('#apAccommodation').value,
            apartmentComfortType: updatingForm.querySelector('#apComfortType').value,
            checkInDate: updatingForm.querySelector('#inDate').value,
            checkOutDate: updatingForm.querySelector('#outDate').value
        })
    });
}