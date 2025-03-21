// let container = document.getElementsByClassName("container")[0];
// async function getData(){
//     try{
//         let res = await fetch("https://dog.ceo/api/breeds/image/random");
//         if(!res.ok){
//             throw new Error("HTTP error!", res.status);
//         }
//         let obj = await res.json()
//         let { message, status} = obj;
//         displayData(message, status)
//     }
//     catch(err){
//         console.warn(err)
//     }
// }
// function displayData(url, status1){
//     container.innerHTML = `
//     <img src='${url}' style="height:200px; width:200px; border: 1px solid gray">
//     <p> Status : ${status1}</p>
//     `;
// }


// window.addEventListener("DOMContentLoaded", function(){
//     getData();
// })

let container = document.getElementsByClassName("container")[0];

async function getData() {
    try {
        let res = await fetch("https://dog.ceo/api/breeds/image/random");
        if (!res.ok) {
            throw new Error("HTTP error! Status: " + res.status);
        }
        let obj = await res.json();
        let { message, status } = obj;

        displayData(message, status);
        saveData(message, status);  // Send data to db.json
    } catch (err) {
        console.warn(err);
    }
}

function displayData(url, status1) {
    container.innerHTML = `
    <img src='${url}' style="height:200px; width:200px; border: 1px solid gray">
    <p> Status : ${status1}</p>
    `;
}

async function saveData(url, status1) {
    try {
        let response = await fetch("http://localhost:3000/dogs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ image: url, status: status1 })
        });

        if (!response.ok) {
            throw new Error("Failed to save data");
        }
        console.log("Data saved successfully!");
    } catch (error) {
        console.error("Error:", error);
    }
}

window.addEventListener("DOMContentLoaded", function () {
    getData();
});
