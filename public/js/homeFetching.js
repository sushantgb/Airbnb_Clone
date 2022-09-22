//for fetching products on home page

async function fetchData() {
    await fetch("http://localhost:5000/rooms")
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
                    console.log(i);
                    node = document.createElement('div');
                    nodeInside = document.createElement('div');
                    node.classList.add('blocks');
                    nodeInside.classList.add('expand-blocks');
                    cardsDiv.appendChild(node);
                    cardsDiv.appendChild(nodeInside);
                    //node.appendChild(nodeInside);
                    node.innerHTML += `
                        <img src="./uploads/${values[i].images[0][0]}"></img>
                        <h4>${values[i].name}</h4>
                        <p>${values[i].city}, ${values[i].state}</p>
                        <p>${values[i].country}</p>
                        <p><strong>&#8377 ${values[i].price}</strong></p>
                    `;
                    nodeInside.innerHTML += `
                        <div class="location-rating">
                            <div>
                                <p>${values[i].city} &bullet; ${values[i].state} &bullet; ${values[i].country}</p>
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
                                <img src="./uploads/${values[i].images[0][1]}"></img>
                                <img src="./uploads/${values[i].images[0][1]}"></img>
                                <img src="./uploads/${values[i].images[0][1]}"></img>
                            </div>
                        </div>
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
                        <div class="details-price">
                            <div class="roomAddons">
                                <strong>Amenities</strong>
                                <ul>
                                    <li>&#8594; Parking: ${values[i].parking}</li>
                                    <li>&#8594; WiFi: ${values[i].wifi}</li>
                                    <li>&#8594; Air Conditioner: ${values[i].ac}</li>
                                    <li>&#8594; Laundry: ${values[i].laundry}</li>
                                    <li>&#8594; Kitchen: ${values[i].kitchen}</li>
                                    <li>&#8594; Smoke Alarm (Fire Safety): ${values[i].smokeAlarm}</li>
                                    <li>&#8594; Pets Permitted: ${values[i].petsPermission}</li>
                                    <li>&#8594; Breakfast Availability: ${values[i].breakfast}</li>
                                <ul>
                            </div>
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
                                        <button type="submit" class="dateBtn">Calculate price</button>
                                    </form>
                                    <h6 class=totPrice></h6>
                                    <button type="click" class="bookBtn">Book Room</button>
                                </div>
                            </div>
                        </div>
                        
                    `;
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

            let minDateVal = minDate.getFullYear() + "-"+minMonth + "-" + minDay;
            let dateStartField = document.querySelectorAll('.dateCheckIn');
            let dateEndField = document.querySelectorAll('.dateCheckOut');
            let dateBtn = document.querySelectorAll('.dateBtn');
            let bookBtn = document.querySelectorAll('.bookBtn');
            let priceVal = document.querySelectorAll('.priceValue');
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
                    dateEndField[k].setAttribute('min', minDateVal);
                    dateBtn[k].addEventListener('click',(e)=>{
                        e.preventDefault();
                        console.log("Inside date function");
                        let startDate = new Date(dateStartField[k].value);
                        let endDate = new Date(dateEndField[k].value);
                        let priceRoom = priceVal[k].textContent;
                        let millisecPerDay = 1000 * 60 * 60 * 24;
                        let daysCount = Math.floor((endDate - startDate)/millisecPerDay);
                        let totalPrice = priceRoom * daysCount;
                        console.log(totalPrice);
                        totPrice[k].innerHTML = `Total Cost for ${daysCount} days is &#8377 ${totalPrice}`;
                    })
                    bookBtn[k].addEventListener('click',()=>{
                        let registerSection = document.querySelector('.register');
                        let signupDiv = document.querySelector('.signup-form');
                        expandBlock[k].style.display = "none";
                        registerSection.style.display = "flex";
                        signupDiv.style.display = "flex";

                    })

                });
            }

            

        })
        .catch(err => { console.log(err) })
}


window.addEventListener('load', () => {
    fetchData();
})