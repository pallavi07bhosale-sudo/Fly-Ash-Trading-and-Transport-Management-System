document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("customerForm");
    const customerList = document.getElementById("customer-list");

    // =========================
    // GPS LOCATION
    // =========================

    const locationBtn = document.getElementById("locationBtn");
    const deliveryLocation = document.getElementById("deliveryLocation");

    locationBtn.addEventListener("click", function () {

        if (!navigator.geolocation) {
            alert("GPS is not supported by your browser.");
            return;
        }

        locationBtn.innerText = "Getting Location...";

        navigator.geolocation.getCurrentPosition(

            function (position) {

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                deliveryLocation.value =
                    "Lat: " + latitude.toFixed(6) +
                    ", Long: " + longitude.toFixed(6);

                locationBtn.innerText = "📍 Location Selected";

                alert("Delivery location selected successfully!");

            },

            function () {

                locationBtn.innerText = "📍 Use Current Location";

                alert("Please allow location permission.");

            }

        );

    });


    // =========================
    // CUSTOMER FORM
    // =========================

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        // Get values

        const customerName = form.querySelector(
            'input[placeholder="Enter customer name"]'
        ).value.trim();

        const companyName = form.querySelector(
            'input[placeholder="Enter company name"]'
        ).value.trim();

        const contactNumber = form.querySelector(
            'input[type="tel"]'
        ).value.trim();

        const email = form.querySelector(
            'input[type="email"]'
        ).value.trim();

        const address = form.querySelector(
            'textarea[placeholder="Enter customer address"]'
        ).value.trim();

        const requirement = form.querySelector(
            'input[placeholder="Enter requirement in ton"]'
        ).value;

        const requirementDate = form.querySelector(
            'input[type="date"]'
        ).value;

        const orderStatus = form.querySelector("select").value;

        const deliveryLocationValue = deliveryLocation.value.trim();

        const additionalRequirement = form.querySelector(
            'textarea[placeholder="Enter additional requirement"]'
        ).value.trim();


        // =========================
        // VALIDATION
        // =========================

        if (!/^[A-Za-z ]+$/.test(customerName)) {
            alert("Please enter a valid customer name.");
            return;
        }

        if (companyName === "") {
            alert("Please enter company name.");
            return;
        }

        if (!/^[0-9]{10}$/.test(contactNumber)) {
            alert("Please enter a valid 10-digit contact number.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (address === "") {
            alert("Please enter customer address.");
            return;
        }

        if (requirement === "" || Number(requirement) <= 0) {
            alert("Please enter a valid fly ash requirement.");
            return;
        }

        if (requirementDate === "") {
            alert("Please select requirement date.");
            return;
        }

        if (orderStatus === "") {
            alert("Please select order status.");
            return;
        }

        if (deliveryLocationValue === "") {
            alert("Please enter or select delivery location.");
            return;
        }


        // =========================
        // CREATE CUSTOMER DETAILS
        // =========================

        const customerDetails = document.createElement("div");

        customerDetails.className = "saved-customer";

        customerDetails.innerHTML = `
            <h3>${customerName}</h3>

            <p><strong>Company:</strong> ${companyName}</p>

            <p><strong>Contact:</strong> ${contactNumber}</p>

            <p><strong>Email:</strong> ${email}</p>

            <p><strong>Address:</strong> ${address}</p>

            <p><strong>Fly Ash Requirement:</strong>
                ${requirement} Ton
            </p>

            <p><strong>Requirement Date:</strong>
                ${requirementDate}
            </p>

            <p><strong>Order Status:</strong>
                ${orderStatus}
            </p>

            <p><strong>Delivery Location:</strong>
                ${deliveryLocationValue}
            </p>

            <p><strong>Additional Requirement:</strong>
                ${additionalRequirement || "No additional requirement"}
            </p>

            <button class="delete-btn">
                Delete
            </button>
        `;


        // Remove empty message

        const emptyMessage =
            customerList.querySelector(".empty-message");

        if (emptyMessage) {
            emptyMessage.remove();
        }


        // Add customer details

        customerList.appendChild(customerDetails);


        // =========================
        // DELETE CUSTOMER
        // =========================

        const deleteButton =
            customerDetails.querySelector(".delete-btn");

        deleteButton.addEventListener("click", function () {

            const confirmDelete = confirm(
                "Are you sure you want to delete this customer?"
            );

            if (confirmDelete) {

                customerDetails.remove();

                if (customerList.children.length === 0) {

                    customerList.innerHTML = `
                        <div class="empty-message">
                            No customer details available yet.
                        </div>
                    `;
                }

            }

        });


        // Success message

        alert("Customer details saved successfully!");

        // Clear form

        form.reset();

        // Reset GPS button

        locationBtn.innerText = "📍 Use Current Location";

    });

});