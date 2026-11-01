// Contact Form Validation

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");

    if (form) {

        form.addEventListener("submit", function (event) {

            const phone = document.querySelector('input[name="phone"]').value;

            if (!/^[0-9]{10}$/.test(phone)) {
                alert("Please enter a valid 10-digit phone number.");
                event.preventDefault();
                return;
            }

            alert("Your message has been submitted successfully!");
        });
    }

});