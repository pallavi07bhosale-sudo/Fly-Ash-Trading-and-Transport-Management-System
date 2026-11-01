document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("plantForm");
    const plantList = document.getElementById("plant-list");

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        // Get values
        const plantName = form.querySelector('input[placeholder="Enter plant name"]').value.trim();
        const location = form.querySelector('input[placeholder="Enter plant location"]').value.trim();
        const requirement = form.querySelector('input[type="number"]').value;
        const orderDate = form.querySelector('input[type="date"]').value;

        const selects = form.querySelectorAll("select");

        const vehicleRequired = selects[0].value;
        const loadingStatus = selects[1].value;
        const gatePass = selects[2].value;
        const gateEntry = selects[3].value;

        const additionalDetails = form.querySelector("textarea").value.trim();

        // Validation
        if (plantName === "") {
            alert("Please enter plant name.");
            return;
        }

        if (location === "") {
            alert("Please enter plant location.");
            return;
        }

        if (requirement === "" || requirement <= 0) {
            alert("Please enter a valid fly ash requirement.");
            return;
        }

        if (orderDate === "") {
            alert("Please select order date.");
            return;
        }

        if (vehicleRequired === "") {
            alert("Please select vehicle requirement.");
            return;
        }

        if (loadingStatus === "") {
            alert("Please select loading status.");
            return;
        }

        if (gatePass === "") {
            alert("Please select gate pass status.");
            return;
        }

        if (gateEntry === "") {
            alert("Please select MSEB gate entry status.");
            return;
        }

        // Create saved plant details
        const plantDetails = document.createElement("div");

        plantDetails.className = "saved-plant";

        plantDetails.innerHTML = `
            <h3>${plantName}</h3>

            <p><strong>Location:</strong> ${location}</p>

            <p><strong>Fly Ash Requirement:</strong> ${requirement} Ton</p>

            <p><strong>Order Date:</strong> ${orderDate}</p>

            <p><strong>Vehicle Required:</strong> ${vehicleRequired}</p>

            <p><strong>Loading Status:</strong> ${loadingStatus}</p>

            <p><strong>Gate Pass:</strong> ${gatePass}</p>

            <p><strong>MSEB Gate Entry:</strong> ${gateEntry}</p>

            <p><strong>Additional Details:</strong> 
                ${additionalDetails || "No additional details"}
            </p>

            <button class="delete-btn">Delete</button>
        `;

        // Remove "No plant details available" message
        const emptyMessage = plantList.querySelector(".empty-message");

        if (emptyMessage) {
            emptyMessage.remove();
        }

        // Add plant details
        plantList.appendChild(plantDetails);

        // Delete button
        const deleteButton = plantDetails.querySelector(".delete-btn");

        deleteButton.addEventListener("click", function () {

            const confirmDelete = confirm(
                "Are you sure you want to delete this plant details?"
            );

            if (confirmDelete) {
                plantDetails.remove();

                if (plantList.children.length === 0) {
                    plantList.innerHTML = `
                        <div class="empty-message">
                            No plant details available yet.
                        </div>
                    `;
                }
            }

        });

        alert("Plant details saved successfully!");

        // Clear form
        form.reset();

    });

});