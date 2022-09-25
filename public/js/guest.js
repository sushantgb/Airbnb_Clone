/* basic front end actions for guest page */

//nav links
let bookRoomLink = document.getElementById('guestBooking-link');
let contactUsLink = document.getElementById('contact-link');


//to handle the divs in rooms registration
let registerSection = document.querySelector('.register');
let bookingFormDiv = document.querySelector('.booking-form');
let contactFormDiv = document.querySelector('.contact-form');
let reviewFormDiv = document.querySelector('.rating-form');
let userBookingDetailsSection = document.querySelector('.userBookingDetailSection')

//events
bookRoomLink.addEventListener('click',()=>{
    userBookingDetailsSection.style.display = "flex";
});

contactUsLink.addEventListener('click',()=>{
    registerSection.style.display="flex";
    contactFormDiv.style.display="flex";
});

//for closing the form and booking details page
let canceBtn = document.querySelector('.cancelBtn');
let cancelBookDetailBtn = document.querySelector('.cancelBookDetailsBtn');
canceBtn.addEventListener('click',()=>{
    registerSection.style.display="none";
    bookingFormDiv.style.display ="none";
    contactFormDiv.style.display ="none";
    reviewFormDiv.style.display ="none";
})
cancelBookDetailBtn.addEventListener('click',()=>{
    userBookingDetailsSection.style.display = "none";
})

//---------- to search rooms from searchbar --------
let inputVal = document.getElementById("searchBar");
inputVal.addEventListener('keyup', () => {
    let indexDiv = document.querySelector('.cards');
    let a = indexDiv.querySelectorAll('.blocks');
    let searchValue = inputVal.value.toLowerCase();
    console.log("search value: " + searchValue);

    for (let i = 0; i < a.length; i++) {
        let matchVal = a[i];
        console.log(matchVal);
        console.log("index of search value " + matchVal.innerHTML.toLowerCase().indexOf(searchValue));
        if (matchVal.innerHTML.toLowerCase().indexOf(searchValue) > -1) {
            matchVal.style.display = "";
        } else {
            matchVal.style.display = "none";
        }
    }
}) 
