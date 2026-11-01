document.addEventListener("DOMContentLoaded", function () {

    // Dashboard loaded message
    console.log("Transporter Dashboard loaded successfully.");


    // Dashboard cards
    const cards = document.querySelectorAll(".dashboard-card");

    cards.forEach(function (card) {

        card.addEventListener("click", function () {

            card.style.opacity = "0.6";

            setTimeout(function () {
                card.style.opacity = "1";
            }, 300);

        });

    });


    // Logout confirmation
    const logoutButton = document.querySelector(".logout-btn");

    logoutButton.addEventListener("click", function (event) {

        const confirmLogout = confirm("Are you sure you want to logout?");

        if (!confirmLogout) {
            event.preventDefault();
        }

    });

});