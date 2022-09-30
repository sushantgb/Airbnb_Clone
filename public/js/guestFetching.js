/* different async functions to fetch different 
data from database to display on the guest page */


//for fetching products on page --- available rooms
async function fetchRoomData() {
    await fetch("/rooms")
        .then((res) => {
            const responses = res.json();
            console.log(responses);
            return responses;
        })
        .then((data) => {
            console.log(data);
            let values = data;
            let dataLen = values.length;
            let cardsDiv = document.querySelector('.cards');
            console.log("Length of data: " + dataLen);
            if (dataLen != 0) {
                let node;
                for (let i = 0; i < dataLen; i++) {
                    let ratingVal = values[i].ratings;
                    console.log("rating length: " + ratingVal.length);
                    console.log("inside room loop");
                    console.log(i);
                    node = document.createElement('div');
                    nodeInside = document.createElement('div');
                    node.classList.add('blocks');
                    nodeInside.classList.add('expand-blocks');
                    cardsDiv.appendChild(node);
                    cardsDiv.appendChild(nodeInside);
                    //to display the cards
                    node.innerHTML += `
                        <img src="./uploads/${values[i].images[0][0]}"></img>
                        <h4>${values[i].name}</h4>
                        <p>${values[i].city}, ${values[i].state}</p>
                        <p>${values[i].country}</p>
                        <p><strong>&#8377 ${values[i].price}</strong></p>
                        <p class="ratingCard"></p>
                    `;
                    //to display the expanded details of cards
                    nodeInside.innerHTML += `
                        <div class="location-rating">
                            <div>
                                <p>${values[i].city} &bullet; ${values[i].state} &bullet; ${values[i].country}</p>
                                <p class="rateHeadExpand"></p>
                            </div>
                            <div class="cancelDiv">
                                <button class="cancelBtnRooms" type="button"><i class="bi bi-x-square-fill"></i></button>
                            </div>
                        </div>
                        <div class="imgShow">
                            <div class="imgLeft">
                                <img src="./uploads/${values[i].images[0][0]}"></img>
                            </div>
                            <div class="imgRight">
                                <img src="./uploads/${values[i].images[0][1]}"></img>
                                <img src="./uploads/${values[i].images[0][2]}"></img>
                                <img src="./uploads/${values[i].images[0][3]}"></img>
                                <img src="./uploads/${values[i].images[0][4]}"></img>
                            </div>
                        </div>
                        <div class="content-manager">
                            <div class="content-left">
                                <div class="roomHead">
                                    <div>
                                        <h6>${values[i].name} by ${values[i].owner}</h6>
                                    </div>
                                    <div>
                                        <p>${values[i].maxAccommodate} Guests &bullet; ${values[i].beds} beds</p>
                                    </div>
                                </div>
                                <div class="describe">
                                    <p>Description: <em>${values[i].description}</em></p>
                                </div>
                                <div class="roomAddons">
                                    <strong>Amenities</strong>
                                    <div class = "amenity">
                                        <div>
                                            <p><i class="fa-solid fa-square-parking"></i> Parking: ${values[i].parking}</p>
                                            <p><i class="fa-solid fa-wifi"></i> WiFi: ${values[i].wifi}</p>
                                        </div>
                                        <div>
                                            <p><i class="fa-solid fa-wind"></i> Air Conditioner: ${values[i].ac}</p>
                                            <p><i class="fa-solid fa-shirt"></i> Laundry: ${values[i].laundry}</p>
                                        </div>
                                        <div>
                                            <p><i class="fa-solid fa-kitchen-set"></i> Kitchen: ${values[i].kitchen}</p>
                                            <p><i class="fa-solid fa-ban-smoking"></i> Smoke Alarm (Fire Safety): ${values[i].smokeAlarm}</p>
                                        </div>
                                        <div>
                                            <p><i class="fa-solid fa-paw"></i> Pets Permitted: ${values[i].petsPermission}</p>
                                            <p><i class="fa-solid fa-mug-saucer"></i> Breakfast Availability: ${values[i].breakfast}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="content-right">    
                                <div class="price-booking">
                                    <div>
                                        <h6>&#8377 <span class="priceValue">${values[i].price}</span></h6>
                                    </div>
                                    <div class="booking-query">
                                        <form>
                                            <label for="dateCheckIn">Pick a Check-in Date</label>
                                            <input type="date" class="dateCheckIn" min="" value="">
                                            <label for="dateCheckOut">Pick a Check-in Date</label>
                                            <input type="date" class="dateCheckOut" value="">
                                            <input type="text" class="numRoom" placeholder="Number of room to book">
                                            <button type="submit" class="dateBtn">Calculate price</button>
                                        </form>
                                        <h6 class=totPrice></h6>
                                        <button type="click" class="bookBtn">Book Room</button>
                                    </div>
                                </div>
                            </div>    
                        </div>  
                        <div class="comments">
                            <h3>Recent Comment</h3>
                            <hr>
                            <h6 class="commentHeadRate"></h6>
                            <p class="userNameRate">By: </p>
                            <p class="descriptionRate"></p>
                            <hr>
                        </div>  
                    `;
                    //controls to do many on-the-page actions and data pushing
                    let ratingHeadCard = document.querySelectorAll('.ratingCard');
                    let ratingHeadExpanded = document.querySelectorAll('.rateHeadExpand');
                    let commentHeadRate = document.querySelectorAll('.commentHeadRate');
                    let userNameRate = document.querySelectorAll('.userNameRate');
                    let descriptionRate = document.querySelectorAll('.descriptionRate');
                    //related to rating display
                    if(ratingVal.length == 0){
                        ratingHeadCard[i].innerHTML=`No Ratings`;
                        ratingHeadExpanded[i].innerHTML = `No Ratings`;
                    }
                    if(ratingVal !=0){
                        let rateCal = 0;
                        let ratingCal;
                        for(let k = 0; k < ratingVal.length; k++){
                            rateCal += values[i].ratings[k].rating;
                            console.log("ratecal: "+ rateCal);
                            let rateDeno = ratingVal.length;
                            ratingCal = rateCal/rateDeno;
                            console.log("rating cal: " + ratingCal);
                            ratingHeadCard[i].innerHTML = `Current Rating: ${ratingCal}`;
                            ratingHeadExpanded[i].innerHTML = `Current Rating: ${ratingCal}`;
                            commentHeadRate[i].innerHTML = `${values[i].ratings[k].reviewHead}`;
                            userNameRate[i].innerHTML = `By: ${values[i].ratings[k].userID}`;
                            descriptionRate[i].innerHTML = `${values[i].ratings[k].reviewDescription}`;
                        }
                        
                    }
                    
                    console.log(values[i].images[0][0]);
                    console.log("value of i: " + i);
                }
            }
            let blockClick = document.querySelectorAll('.blocks');
            let expandBlock = document.querySelectorAll('.expand-blocks');
            let cancelBtnRooms = document.querySelectorAll('.cancelBtnRooms');
            //to set min field for date input
            let minDate = new Date();
            let minMonth = (minDate.getMonth() + 1);
            let minDay = minDate.getDate();
            if(minMonth < 10){
                minMonth = "0" + minMonth;
                console.log(minMonth);
            }
            if(minDay < 10){
                minDay = "0" + minDay;
            }
            //related to setting date in date pickers and other controls
            let minDateVal = minDate.getFullYear() + "-"+minMonth + "-" + minDay;
            let minDateValSec = minDate.getFullYear()+ "-"+minMonth + "-" + (minDay + 1);
            let dateStartField = document.querySelectorAll('.dateCheckIn');
            let dateEndField = document.querySelectorAll('.dateCheckOut');
            let dateBtn = document.querySelectorAll('.dateBtn');
            let bookBtn = document.querySelectorAll('.bookBtn');
            let priceVal = document.querySelectorAll('.priceValue');
            let roomNum = document.querySelectorAll('.numRoom');
            let totPrice = document.querySelectorAll('.totPrice');


            //for expanding the room details
            for (let k = 0; k < blockClick.length; k++) {
                blockClick[k].addEventListener('click', () => {
                    console.log("Inside click function");
                    expandBlock[k].style.display = "flex";
                    //to close the div
                    cancelBtnRooms[k].addEventListener('click', () => {
                        console.log("inside cancel function");
                        expandBlock[k].style.display = "none";
                    });
                    //to calculate price and dates
                    dateStartField[k].setAttribute('min', minDateVal);
                    dateEndField[k].setAttribute('min', minDateValSec);
                    dateBtn[k].addEventListener('click',(e)=>{
                        e.preventDefault();
                        console.log("Inside date function");
                        let startDate = new Date(dateStartField[k].value);
                        let endDate = new Date(dateEndField[k].value);
                        let priceRoom = priceVal[k].textContent;
                        let roomValue = roomNum[k].value;
                        let millisecPerDay = 1000 * 60 * 60 * 24;
                        let daysCount = Math.floor((endDate - startDate)/millisecPerDay);
                        let totalPrice = priceRoom * daysCount * roomValue;
                        console.log(totalPrice);
                        totPrice[k].innerHTML = `Total Cost for ${daysCount} days is &#8377 ${totalPrice}`;
                    })
                    //for booking form
                    bookBtn[k].addEventListener('click',()=>{
                        let registerSection = document.querySelector('.register');
                        let bookingDiv = document.querySelector('.booking-form');
                        let propertyIdDisplay = document.getElementById('propertyID');
                        let priceField = document.getElementById('totalPrice');
                        //setting minimum date for date pickers
                        let checkinDateDisplay = document.getElementById('checkinDate');
                        let checkoutDateDisplay = document.getElementById('checkoutDate');
                        let numberOfRooms = document.getElementById('roomBooked');
                        checkinDateDisplay.setAttribute('min', minDateVal);
                        checkoutDateDisplay.setAttribute('min', minDateValSec); 
                        //function for calculating price on date picking
                        checkoutDateDisplay.addEventListener('input', ()=>{
                            let inDate = new Date(checkinDateDisplay.value);
                            let outDate = new Date(checkoutDateDisplay.value);
                            let roomNumValue = numberOfRooms.value;
                            let priceBook = priceVal[k].textContent;
                            let msPerDay = 1000 * 60 * 60 * 24;
                            let dayCount = Math.floor((outDate - inDate)/msPerDay);
                            priceField.value = priceBook * dayCount * roomNumValue;
                        });
                        expandBlock[k].style.display = "none";
                        registerSection.style.display = "flex";
                        bookingDiv.style.display = "flex";
                        //for displaying the product ID on the form
                        propertyIdDisplay.value = values[k].propertyID;

                    })

                });
            }

        })
        .catch(err => { console.log(err) })
}
/* ------------------------------------------------------ */


//for fetching data on the guest user -> details of guest user
async function fetchData() {
    await fetch("/loginHostAuth")
        .then((res) => {
            const responses = res.json();
            console.log(responses);
            return responses;
        })
        .then((data) => {
            console.log(data);
            //for user name and profile picture
            let userNameDisplay = document.getElementById('userNameDisplay');
            let userProfileImage = document.getElementById('userImage');
            //for contact Us form
            let contactFormUser = document.getElementById('userName');
            let contactFormEmail = document.getElementById('userEmail');
            //for rating form
            let userNameFieldRating = document.getElementById('userIDRate');
            //for booking form
            let bookingFormUser = document.getElementById('userID');
            //to display form values for the user on contact form and booking form
            userNameDisplay.innerHTML = data.pFname;
            userProfileImage.innerHTML =`<img src="../profileUpload/${data.profileImg}"></img>`;
            contactFormUser.value = data.pFname + " " + data.pLname;
            contactFormEmail.value = data.pEmail;
            bookingFormUser.value = data.pEmail;
            userNameFieldRating.value = data.pFname + " " + data.pLname;
        })
        .catch(err => {console.log(err)})
}
/* -------------------------------------------------------- */

//for fetching booking data of room on the guest page
async function fetchBookingData() {
    await fetch("/userRoomFetchGuest")
        .then((res) => {
            const responses = res.json();
            console.log(responses);
            return responses;
        })
        .then((data) => {
            console.log(data);
            let values = data;
            let dataLen = values.length;
            //function for getting date of booking and other booking data.
            fetchBookingDateValue();
            console.log("Length of data: " + dataLen);
            if(dataLen!=0){
                let userBookingCards = document.querySelector('.userBookingDetails');
                let node;
                for (let i = 0; i < dataLen; i++) {
                    console.log(i);
                    node = document.createElement('div');
                    node.classList.add('blockBooking');
                    userBookingCards.appendChild(node);
                    node.innerHTML += `
                        <div class="sideImage">
                            <img src="./uploads/${values[i].images[0][0]}"></img>
                        </div>
                        <div class="rightSideContent">
                            <div class="rightTop">
                                <h4>${values[i].name}</h4>
                                <p>${values[i].city}, ${values[i].state}</p>
                                <p>${values[i].country}</p>
                                <p class="total-price"></p>
                            </div>
                            <div class="rightMid">
                                <h6>${values[i].name} by ${values[i].owner}</h6>
                                <p>${values[i].maxAccommodate} Guests &bullet; ${values[i].beds} beds</p>
                                <p>Description: <em>${values[i].description}</em></p>
                            </div>
                            <div class="rightBottom">
                                <p class="book-Date"></p>
                                <p class="room-quant"></p>
                                <button type="click" class="ratingCommentBtn">Rate This Room</button>
                            </div>
                        </div>  
                     `;
                }
                let propertyIdFieldRating = document.getElementById('propertyIDRate');
                let registerSection = document.querySelector('.register');
                let ratingForm = document.querySelector('.rating-form');
                let ratingButton = document.querySelectorAll('.ratingCommentBtn');
                //for rating the room
                for(let a = 0; a < ratingButton.length; a++){
                    ratingButton[a].addEventListener('click', ()=>{
                        console.log("Inside rating");
                        console.log(values[a].propertyID);
                        registerSection.style.display = "flex";
                        ratingForm.style.display = "flex";
                        propertyIdFieldRating.value = `${values[a].propertyID}`; 
                    });
                }
            }
        })
        .catch(err => {console.log(err)})
} 
/* ------------------------------------------------------ */

//for booking data to fetch the booking dates and total price
async function fetchBookingDateValue() {
    await fetch("/bookingDate")
        .then((res) => {
            const responses = res.json();
            console.log(responses);
            return responses;
        })
        .then((data) => {
            console.log(data);
            let values2 = data;
            let dataLen = values2.length;
            console.log("Length of data: " + dataLen);
            if(dataLen!=0){
                let totalPricePrint = document.querySelectorAll(".total-price");
                let bookDatePrint = document.querySelectorAll(".book-Date");
                let roomQuantityPrint = document.querySelectorAll(".room-quant");
                //displaying the dates and price on the user's booking details card
                for(let i=0; i<dataLen; i++){
                    let bookDateString = new Date(values2[i].bookingDate);
                    totalPricePrint[i].innerHTML=`Total Price: <strong>&#8377 ${values2[i].totalPrice}</strong>`;
                    bookDatePrint[i].innerHTML=`Booking Date: <strong>${bookDateString.getDate()} - ${bookDateString.getMonth()} - ${bookDateString.getFullYear()} </strong>`;
                    roomQuantityPrint[i].innerHTML=`<strong>Number of rooms booked: ${values2[i].roomBooked}</strong>`;
                }

            }

        }).catch(err => {console.log(err)})
    }
/* ---------------------------------------------------- */    

//on the load of window
window.addEventListener('load', () => {
    alert("SUCCESS!!");
    fetchData();
    fetchRoomData();
    fetchBookingData();
});