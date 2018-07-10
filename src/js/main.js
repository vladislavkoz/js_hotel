window.onload = init;
var reservationsUrl = 'http://localhost:3000/reservations';

function init() {
    let reservationForm = document.getElementById("addNewReservation");
    reservationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validation()){
            AddNewReservation()
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
    let reservationsList = document.getElementById('reservations');
    reservationsList.innerHTML = '';
    addHeaderInReservationBook();
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
    return fetch(reservationsUrl, {
        method: "POST",
        body: JSON.stringify({clientName: clName,clientTelephone: clPhone,apartmentAccommodation: apAccommodation,apartmentComfortType: apComfortType}),
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
    element.querySelector('#comfortType').innerText = res.apartmentAccommodation;
    element.querySelector('#accommodation').innerText = res.apartmentComfortType;
}

function removeReservation(element){
    fetch(reservationsUrl + '/' + element.id,{
        method: 'delete'
    })
        .then(response => response.json());
    element.remove();
}

function editReservation(element) {
    let content = document.getElementById('content');
    content.innerHTML = '';
}

function showReservationBook(){
    cleanPage();
    loadReservations().then(renderReservations);
}

function cleanPage() {

    let content = document.getElementById('content');
    content.innerHTML = '';
}

function addHeaderInReservationBook() {
    let reservations = document.getElementById('reservations');
    let headerElement = document.getElementById('template-reservationsBookHeader');
    let reservationHeaderClone = headerElement.content.getElementById('tff').cloneNode(true);
    reservations.appendChild(reservationHeaderClone);

}