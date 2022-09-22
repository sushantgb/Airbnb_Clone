//dynamic controls for registration pages

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









