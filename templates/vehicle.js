document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("transportForm");
    const transportList = document.getElementById("transport-list");

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        // Get values

        const vehicleNumber = form.querySelector(
            'input[placeholder="e.g. MH 15 AB 1234"]'
        ).value.trim();

        const vehicleType = form.querySelectorAll("select")[0].value;

        const driverName = form.querySelector(
            'input[placeholder="Enter driver name"]'
        ).value.trim();

        const driverContact = form.querySelector(
            'input[placeholder="Enter driver contact"]'
        ).value.trim();

        const orderId = form.querySelector(
            'input[placeholder="Enter order ID"]'
        ).value.trim();

        const currentLocation = form.querySelector(
            'input[placeholder="Enter current vehicle location"]'
        ).value.trim();

        const selects = form.querySelectorAll("select");

        const vehicleStatus = selects[1].value;
        const loadingStatus = selects[2].value;
        const deliveryStatus = selects[3].value;
        const gatePass = selects[4].value;

        const transportDetails = form.querySelector("textarea").value.trim();


        // =========================
        // VALIDATION
        // =========================

        if (vehicleNumber === "") {
            alert("Please enter vehicle number.");
            return;
        }

        if (vehicleType === "") {
            alert("Please select vehicle type.");
            return;
        }

        if (!/^[A-Za-z ]+$/.test(driverName)) {
            alert("Please enter a valid driver name.");
            return;
        }

        if (!/^[0-9]{10}$/.test(driverContact)) {
            alert("Please enter a valid 10-digit driver contact.");
            return;
        }

        if (orderId === "") {
            alert("Please enter order ID.");
            return;
        }

        if (currentLocation === "") {
            alert("Please enter current vehicle location.");
            return;
        }

        if (vehicleStatus === "") {
            alert("Please select vehicle status.");
            return;
        }

        if (loadingStatus === "") {
            alert("Please select loading status.");
            return;
        }

        if (deliveryStatus === "") {
            alert("Please select delivery status.");
            return;
        }

        if (gatePass === "") {
            alert("Please select gate pass status.");
            return;
        }


        // =========================
        // CREATE TRANSPORT DETAILS
        // =========================

        const transportDetailsCard = document.createElement("div");

        transportDetailsCard.className = "saved-transport";

        transportDetailsCard.innerHTML = `
            <h3>${vehicleNumber}</h3>

            <p>
                <strong>Vehicle Type:</strong>
                ${vehicleType}
            </p>

            <p>
                <strong>Driver Name:</strong>
                ${driverName}
            </p>

            <p>
                <strong>Driver Contact:</strong>
                ${driverContact}
            </p>

            <p>
                <strong>Order ID:</strong>
                ${orderId}
            </p>

            <p>
                <strong>Current Location:</strong>
                ${currentLocation}
            </p>

            <p>
                <strong>Vehicle Status:</strong>
                ${vehicleStatus}
            </p>

            <p>
                <strong>Loading Status:</strong>
                ${loadingStatus}
            </p>

            <p>
                <strong>Delivery Status:</strong>
                ${deliveryStatus}
            </p>

            <p>
                <strong>Gate Pass:</strong>
                ${gatePass}
            </p>

            <p>
                <strong>Transport Details:</strong>
                ${transportDetails || "No additional details"}
            </p>

            <button class="delete-btn">
                Delete
            </button>
        `;


        // Remove empty message

        const emptyMessage =
            transportList.querySelector(".empty-message");

        if (emptyMessage) {
            emptyMessage.remove();
        }


        // Add transport details

        transportList.appendChild(transportDetailsCard);


        // =========================
        // DELETE
        // =========================

        const deleteButton =
            transportDetailsCard.querySelector(".delete-btn");

        deleteButton.addEventListener("click", function () {

            const confirmDelete = confirm(
                "Are you sure you want to delete this transport details?"
            );

            if (confirmDelete) {

                transportDetailsCard.remove();

                if (transportList.children.length === 0) {

                    transportList.innerHTML = `
                        <div class="empty-message">
                            No transport details available yet.
                        </div>
                    `;
                }

            }

        });


        alert("Transport details saved successfully!");

        // Clear form

        form.reset();

    });

});