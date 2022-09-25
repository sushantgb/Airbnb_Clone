/* basic front end actions for landing page(index) */

//dynamic controls for registration pages

//blank link 'become a host' leads to signup Form
let becomeHostLink = document.getElementById('becomeHost');

//help link
let helpLink = document.getElementById('helpLink');

//links to open forms
let signUp = document.getElementById('signup-link');
let logIn = document.getElementById('login-link');

//upper and bottom forms within signup form
let signUpForm = document.getElementById('initials');
let profileForm = document.getElementById('complete-profile');

//keeping profile form hidden
profileForm.style.display = "none";

//headings of registration page
let headingTop = document.getElementById('sign-head');
let headingSecond = document.getElementById('sign-head2');

//values of initial signup form
let firstName = document.getElementById('fname');
let lastName = document.getElementById('lname');
let dateOfBirth = document.getElementById('dob');
let email = document.getElementById('sEmail');
let password = document.getElementById('sPass');
let agreeBtn = document.getElementById('agreeBtn');

//sections and divs of form
let registerSection = document.querySelector('.register');
let signupDiv = document.querySelector('.signup-form');
let loginDiv = document.querySelector('.login-form');
let helpSection = document.getElementById('help-message');

//cancel button to close form
let cancelBtn = document.querySelector('.cancelBtn');
cancelBtn.addEventListener('click',()=>{
    registerSection.style.display="none";
    signupDiv.style.display ="none";
    loginDiv.style.display ="none";
})


//events of buttons and links
signUp.addEventListener('click', ()=>{
    registerSection.style.display = "flex";
    signupDiv.style.display = "flex";
});
becomeHostLink.addEventListener('click', ()=>{
    registerSection.style.display = "flex";
    signupDiv.style.display = "flex";
});
//button to move to profile update
agreeBtn.addEventListener('click', ()=>{
    signUpForm.style.display = "none";
    profileForm.style.display = "flex";
    headingTop.innerHTML = `Complete Your Profile To Register`;
    headingSecond.innerHTML="";

    //values of profile-form
    let firstNameProfile = document.getElementById('pFname');
    let lastNameProfile = document.getElementById('pLname');
    let dateOfBirthProfile = document.getElementById('pDob');
    let emailProfile = document.getElementById('pEmail');
    let passwordProfile = document.getElementById('pPass');

    firstNameProfile.value = firstName.value;
    lastNameProfile.value = lastName.value;
    dateOfBirthProfile.value = dateOfBirth.value;
    emailProfile.value = email.value;
    passwordProfile.value = password.value;

    // profileForm.addEventListener('submit',()=>{
    //     messageSection.style.display = "flex";
    // });
});

logIn.addEventListener('click', ()=>{
    registerSection.style.display = "flex";
    loginDiv.style.display = "flex";
});

//help-instructions
helpLink.addEventListener('click', ()=>{
    helpSection.style.display = "flex";
})
let cancelHelp = document.querySelector('.closeHelpBtn');
cancelHelp.addEventListener('click', ()=>{
    helpSection.style.display = "none";
})

//to search rooms from searchbar

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








