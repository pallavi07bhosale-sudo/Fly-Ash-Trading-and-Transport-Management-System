
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("transportForm");
    const mapBox = document.getElementById("vehicleMap");
    const openBtn = document.getElementById("openMapBtn");
    const locationInput = document.getElementById("currentLocation");
    const coordinates = document.getElementById("selectedCoordinates");

    let map;
    let marker;

    openBtn.addEventListener("click", function () {

        mapBox.style.display = "block";

        if (!map) {
            map = L.map("vehicleMap").setView([19.9975, 73.7898], 10);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "&copy; OpenStreetMap contributors"
            }).addTo(map);

            map.on("click", async function (e) {

                const lat = e.latlng.lat;
                const lng = e.latlng.lng;

                if (marker) {
                    marker.setLatLng(e.latlng);
                } else {
                    marker = L.marker(e.latlng).addTo(map);
                }

                coordinates.textContent =
                    "Latitude: " + lat.toFixed(6) +
                    " | Longitude: " + lng.toFixed(6);

                locationInput.value =
                    "Lat: " + lat.toFixed(6) +
                    ", Lng: " + lng.toFixed(6);

                try {
                    const url =
                        "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" +
                        lat + "&lon=" + lng;

                    const response = await fetch(url);
                    const data = await response.json();

                    if (data.display_name) {
                        locationInput.value =
                            data.display_name +
                            " (Lat: " + lat.toFixed(6) +
                            ", Lng: " + lng.toFixed(6) + ")";
                    }
                } catch (error) {
                    console.log("Address lookup unavailable:", error);
                }
            });
        }

        setTimeout(function () {
            map.invalidateSize();
        }, 100);
    });

    form.addEventListener("submit", function (event) {

        if (!form.checkValidity()) {
            event.preventDefault();
            form.reportValidity();
            return;
        }

        if (!locationInput.value.trim()) {
            event.preventDefault();
            alert("Please select current vehicle location from the map.");
        }
    });

});
