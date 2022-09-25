/* basic front end actions for host page */

//nav links
let hostRoomLink = document.getElementById('host-link');
let contactUsLink = document.getElementById('contact-link');
let publishedLink = document.getElementById('published-link');


//to handle the divs in rooms registration
let registerSection = document.querySelector('.register');
let productFormDiv = document.querySelector('.product-form');
let contactFormDiv = document.querySelector('.contact-form');
let userPublicationDetailsSection = document.querySelector('.userPublicationDetailSection')


//events
publishedLink.addEventListener('click',()=>{
    userPublicationDetailsSection.style.display = "flex";
});
hostRoomLink.addEventListener('click',()=>{
    registerSection.style.display="flex";
    productFormDiv.style.display="flex";
});

contactUsLink.addEventListener('click',()=>{
    registerSection.style.display="flex";
    contactFormDiv.style.display="flex";
});

//for closing the form
let canceBtn = document.querySelector('.cancelBtn');
let cancelBookDetailBtn = document.querySelector('.cancelBookDetailsBtn');
canceBtn.addEventListener('click',()=>{
    registerSection.style.display="none";
    productFormDiv.style.display ="none";
    contactFormDiv.style.display ="none";
});
cancelBookDetailBtn.addEventListener('click',()=>{
    userPublicationDetailsSection.style.display = "none";
}); 

// ----------- to search rooms from searchbar ------------

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
