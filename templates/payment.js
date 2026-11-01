document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("paymentForm");
    const paymentList = document.getElementById("payment-list");

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const paymentId = form.querySelector(
            'input[placeholder="Enter payment ID"]'
        ).value.trim();

        const orderId = form.querySelector(
            'input[placeholder="Enter order ID"]'
        ).value.trim();

        const customerName = form.querySelector(
            'input[placeholder="Enter customer or industry name"]'
        ).value.trim();

        const amount = form.querySelector(
            'input[placeholder="Enter payment amount"]'
        ).value;

        const paymentDate = form.querySelector(
            'input[type="date"]'
        ).value;

        const selects = form.querySelectorAll("select");

        const paymentMethod = selects[0].value;
        const paymentStatus = selects[1].value;

        const transactionReference = form.querySelector(
            'input[placeholder="Enter transaction reference"]'
        ).value.trim();

        const additionalDetails = form.querySelector(
            "textarea"
        ).value.trim();


        // VALIDATION

        if (paymentId === "") {
            alert("Please enter payment ID.");
            return;
        }

        if (orderId === "") {
            alert("Please enter order ID.");
            return;
        }

        if (customerName === "") {
            alert("Please enter customer or industry name.");
            return;
        }

        if (amount === "" || Number(amount) <= 0) {
            alert("Please enter a valid payment amount.");
            return;
        }

        if (paymentDate === "") {
            alert("Please select payment date.");
            return;
        }

        if (paymentMethod === "") {
            alert("Please select payment method.");
            return;
        }

        if (paymentStatus === "") {
            alert("Please select payment status.");
            return;
        }


        // CREATE PAYMENT DETAILS

        const paymentDetails = document.createElement("div");

        paymentDetails.className = "saved-payment";

        paymentDetails.innerHTML = `
            <h3>Payment ID: ${paymentId}</h3>

            <p>
                <strong>Order ID:</strong> ${orderId}
            </p>

            <p>
                <strong>Customer / Industry:</strong>
                ${customerName}
            </p>

            <p>
                <strong>Payment Amount:</strong>
                ₹${amount}
            </p>

            <p>
                <strong>Payment Date:</strong>
                ${paymentDate}
            </p>

            <p>
                <strong>Payment Method:</strong>
                ${paymentMethod}
            </p>

            <p>
                <strong>Payment Status:</strong>
                ${paymentStatus}
            </p>

            <p>
                <strong>Transaction Reference:</strong>
                ${transactionReference || "Not provided"}
            </p>

            <p>
                <strong>Additional Details:</strong>
                ${additionalDetails || "No additional details"}
            </p>

            <button class="delete-btn">
                Delete
            </button>
        `;


        // REMOVE EMPTY MESSAGE

        const emptyMessage =
            paymentList.querySelector(".empty-message");

        if (emptyMessage) {
            emptyMessage.remove();
        }


        // ADD PAYMENT

        paymentList.appendChild(paymentDetails);


        // DELETE PAYMENT

        const deleteButton =
            paymentDetails.querySelector(".delete-btn");

        deleteButton.addEventListener("click", function () {

            const confirmDelete = confirm(
                "Are you sure you want to delete this payment?"
            );

            if (confirmDelete) {

                paymentDetails.remove();

                if (paymentList.children.length === 0) {

                    paymentList.innerHTML = `
                        <div class="empty-message">
                            No payment history available yet.
                        </div>
                    `;
                }
            }

        });


        alert("Payment saved successfully!");

        form.reset();

    });

});