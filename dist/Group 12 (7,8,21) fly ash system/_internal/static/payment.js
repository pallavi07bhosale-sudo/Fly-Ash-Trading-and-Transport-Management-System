
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("paymentform");

    if (!form) {
        return;
    }

    form.addEventListener("submit", function (event) {

        const amount = form.querySelector(
            'input[name="payment_amount"]'
        );

        if (!amount || Number(amount.value) <= 0) {
            event.preventDefault();
            alert("Please enter a valid payment amount.");
        }

        // Valid form submits normally to Flask.
        // Flask saves the payment in PostgreSQL.

    });

});
