//nav links
let hostRoomLink = document.getElementById('host-link');
let contactUsLink = document.getElementById('contact-link');


//to handle the divs in rooms registration
let registerSection = document.querySelector('.register');
let productFormDiv = document.querySelector('.product-form');
let contactFormDiv = document.querySelector('.contact-form');

//events
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
canceBtn.addEventListener('click',()=>{
    registerSection.style.display="none";
    productFormDiv.style.display ="none";
    contactFormDiv.style.display ="none";
})