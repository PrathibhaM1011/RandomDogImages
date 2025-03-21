document.addEventListener("DOMContentLoaded", function () {
    let container = document.getElementById("container");
    let loader = document.getElementById("loader");

    async function getData() {
        try {
            let res = await fetch("https://dog.ceo/api/breeds/image/random");
            if (!res.ok) {
                throw new Error("HTTP error! Status: " + res.status);
            }
            let obj = await res.json();
            let { message, status } = obj;

            setTimeout(() => {
                displayData(message, status);
                saveData(message, status);
            }, 4000); // 4 seconds delay

        } catch (err) {
            console.error("Error:", err.message);
        }
    }

    function displayData(url, status1) {
        if (!container) {
            console.error("Error: container not found!");
            return;
        }
        loader.remove(); // Hide loader
        container.style.display = "block"; // Show container

        container.innerHTML = `
            <img src="${url}" alt="Random Dog">
            <p>Status: ${status1}</p>
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

    getData(); // Call function only after DOM is loaded
});
