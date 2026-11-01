
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("orderform");
    const locationInput = document.getElementById("deliveryLocation");

    // Initialize map at Nashik
    const map = L.map("orderMap").setView([19.9975, 73.7898], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    let marker;

    // Select delivery location by clicking map
    map.on("click", function (event) {
        const lat = event.latlng.lat;
        const lng = event.latlng.lng;

        if (marker) {
            map.removeLayer(marker);
        }

        marker = L.marker([lat, lng]).addTo(map);

        const location = "Lat: " + lat.toFixed(6) +
                         ", Long: " + lng.toFixed(6);

        locationInput.value = location;
        marker.bindPopup("Selected Delivery Location").openPopup();
    });

    // Validate form; valid data submits to Flask
    form.addEventListener("submit", function (event) {

        const orderId = form.querySelector(
            'input[name="order_id"]'
        ).value.trim();

        const customer = form.querySelector(
            'input[name="customer_name"]'
        ).value.trim();

        const quantity = Number(form.querySelector(
            'input[name="quantity"]'
        ).value);

        if (!orderId || !customer || quantity <= 0) {
            event.preventDefault();
            alert("Please enter valid order details.");
            return;
        }

        if (!locationInput.value.trim()) {
            event.preventDefault();
            alert("Please select delivery location on the map.");
            return;
        }

        // Do not prevent valid submission.
        // Flask will save the order in PostgreSQL.
    });

});
