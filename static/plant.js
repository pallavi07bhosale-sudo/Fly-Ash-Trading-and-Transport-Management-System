
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("plantForm");

    if (!form) return;

    form.addEventListener("submit", function (event) {

        const plantName = form.querySelector('[name="plant_name"]').value.trim();
        const location = form.querySelector('[name="plant_location"]').value.trim();
        const requirement = form.querySelector('[name="fly_ash_requirement"]').value;
        const orderDate = form.querySelector('[name="order_date"]').value;
        const vehicleRequired = form.querySelector('[name="vehicle_required"]').value;
        const loadingStatus = form.querySelector('[name="loading_status"]').value;
        const gatePass = form.querySelector('[name="gate_pass"]').value.trim();
        const gateEntry = form.querySelector('[name="mseb_gate_entry"]').value.trim();

        if (!plantName || !location || !requirement ||
            Number(requirement) <= 0 || !orderDate ||
            !vehicleRequired || !loadingStatus ||
            !gatePass || !gateEntry) {

            event.preventDefault();
            alert("Please fill in all required plant details.");
            return;
        }

        // Do not use preventDefault here.
        // Valid form submits to Flask and saves in PostgreSQL.
    });

});