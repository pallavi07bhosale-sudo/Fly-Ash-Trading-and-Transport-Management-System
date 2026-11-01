
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("customerForm");
    const locationBtn = document.getElementById("locationBtn");
    const deliveryLocation = document.getElementById("deliveryLocation");

    // =========================
    // GPS LOCATION
    // =========================

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
    // CUSTOMER FORM VALIDATION
    // =========================

    form.addEventListener("submit", function (event) {

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
            'input[name="fly_ash_requirement"]'
        ).value;

        const requirementDate = form.querySelector(
            'input[type="date"]'
        ).value;

        const orderStatus = form.querySelector(
            'select[name="order_status"]'
        ).value;

        const deliveryLocationValue = deliveryLocation.value.trim();

        // Name validation
        if (!/^[A-Za-z ]+$/.test(customerName)) {
            event.preventDefault();
            alert("Please enter a valid customer name.");
            return;
        }

        // Company validation
        if (companyName === "") {
            event.preventDefault();
            alert("Please enter company name.");
            return;
        }

        // Contact validation
        if (!/^[0-9]{10}$/.test(contactNumber)) {
            event.preventDefault();
            alert("Please enter a valid 10-digit contact number.");
            return;
        }

        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            event.preventDefault();
            alert("Please enter a valid email address.");
            return;
        }

        // Address validation
        if (address === "") {
            event.preventDefault();
            alert("Please enter customer address.");
            return;
        }

        // Requirement validation
        if (requirement === "" || Number(requirement) <= 0) {
            event.preventDefault();
            alert("Please enter a valid fly ash requirement.");
            return;
        }

        // Date validation
        if (requirementDate === "") {
            event.preventDefault();
            alert("Please select requirement date.");
            return;
        }

        // Order status validation
        if (orderStatus === "") {
            event.preventDefault();
            alert("Please select order status.");
            return;
        }

        // Location validation
        if (deliveryLocationValue === "") {
            event.preventDefault();
            alert("Please select your delivery location.");
            return;
        }

        // Valid form: allow submission to Flask.
        // Do not call preventDefault() here.
    });

});
