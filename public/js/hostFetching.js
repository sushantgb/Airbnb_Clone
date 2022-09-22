//for fetching data on the host page

async function fetchData() {
    await fetch("/loginHostAuth")
        .then((res) => {
            const responses = res.json();
            console.log(responses);
            return responses;
        })
        .then((data) => {
            console.log(data);
            let userNameDisplay = document.getElementById('userNameDisplay');
            userNameDisplay.innerHTML = data.pFname;
            // let values = data;
            // let dataLen = values.length;
            // console.log("Length of data: " + dataLen);
            // if(dataLen!=0){
            //     let cardsDiv = document.querySelector('.cards');
            //     let node;
            //     for (let i = 0; i < dataLen; i++) {

            //         console.log(i);
            //         node = document.createElement('div');
            //         node.classList.add('blocks');
            //         cardsDiv.appendChild(node);
            //         node.innerHTML += `
            //         <img src="./uploads/${values[i].images[0][0]}"></img>
            //         <h4>${values[i].name}</h4>
            //         <p>${values[i].city}, ${values[i].state}</p>
            //         <p>${values[i].country}</p>
            //         <p><strong>&#8377 ${values[i].price}</strong></p>
            //         `;
            //         console.log(values[i].images[0][0]);
            //         console.log("value of i: "+ i);
            //     }
            // }
        })
        .catch(err => {console.log(err)})
}

window.addEventListener('load', () => {
    alert("Logged in successfully");
    fetchData();
})