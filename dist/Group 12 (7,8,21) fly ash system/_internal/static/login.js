
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("loginForm");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    form.addEventListener("submit", function (event) {

        if (email.value.trim() === "") {
            event.preventDefault();
            alert("Please enter your email.");
            return;
        }

        if (password.value.trim() === "") {
            event.preventDefault();
            alert("Please enter your password.");
            return;
        }

        if (password.value.length < 6) {
            event.preventDefault();
            alert("Password must contain at least 6 characters.");
            return;
        }

        // Form will submit to Flask
    });

});
