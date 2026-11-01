document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("orderForm");
    const orderList = document.getElementById("order-list");

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        // Get values

        const orderId = form.querySelector(
            'input[placeholder="Enter order ID"]'
        ).value.trim();

        const customerName = form.querySelector(
            'input[placeholder="Enter customer or industry name"]'
        ).value.trim();

        const quantity = form.querySelector(
            'input[placeholder="Enter quantity in ton"]'
        ).value;

        const orderDate = form.querySelector(
            'input[type="date"]'
        ).value;

        const deliveryLocation = form.querySelector(
            'input[placeholder="Enter delivery location"]'
        ).value.trim();

        const selects = form.querySelectorAll("select");

        const vehicleRequired = selects[0].value;
        const orderStatus = selects[1].value;
        const loadingStatus = selects[2].value;

        const details = form.querySelector("textarea").value.trim();


        // =========================
        // VALIDATION
        // =========================

        if (orderId === "") {
            alert("Please enter order ID.");
            return;
        }

        if (customerName === "") {
            alert("Please enter customer or industry name.");
            return;
        }

        if (quantity === "" || Number(quantity) <= 0) {
            alert("Please enter a valid fly ash quantity.");
            return;
        }

        if (orderDate === "") {
            alert("Please select order date.");
            return;
        }

        if (deliveryLocation === "") {
            alert("Please enter delivery location.");
            return;
        }

        if (vehicleRequired === "") {
            alert("Please select vehicle requirement.");
            return;
        }

        if (orderStatus === "") {
            alert("Please select order status.");
            return;
        }

        if (loadingStatus === "") {
            alert("Please select loading status.");
            return;
        }


        // =========================
        // CREATE ORDER
        // =========================

        const orderDetails = document.createElement("div");

        orderDetails.className = "saved-order";

        orderDetails.innerHTML = `
            <h3>Order ID: ${orderId}</h3>

            <p>
                <strong>Customer / Industry:</strong>
                ${customerName}
            </p>

            <p>
                <strong>Fly Ash Quantity:</strong>
                ${quantity} Ton
            </p>

            <p>
                <strong>Order Date:</strong>
                ${orderDate}
            </p>

            <p>
                <strong>Delivery Location:</strong>
                ${deliveryLocation}
            </p>

            <p>
                <strong>Vehicle Required:</strong>
                ${vehicleRequired}
            </p>

            <p>
                <strong>Order Status:</strong>
                ${orderStatus}
            </p>

            <p>
                <strong>Loading Status:</strong>
                ${loadingStatus}
            </p>

            <p>
                <strong>Order Details:</strong>
                ${details || "No additional details"}
            </p>

            <button class="delete-btn">
                Delete
            </button>
        `;


        // Remove empty message

        const emptyMessage =
            orderList.querySelector(".empty-message");

        if (emptyMessage) {
            emptyMessage.remove();
        }


        // Add order

        orderList.appendChild(orderDetails);


        // =========================
        // DELETE ORDER
        // =========================

        const deleteButton =
            orderDetails.querySelector(".delete-btn");

        deleteButton.addEventListener("click", function () {

            const confirmDelete = confirm(
                "Are you sure you want to delete this order?"
            );

            if (confirmDelete) {

                orderDetails.remove();

                if (orderList.children.length === 0) {

                    orderList.innerHTML = `
                        <div class="empty-message">
                            No order details available yet.
                        </div>
                    `;
                }

            }

        });


        alert("Order saved successfully!");

        // Clear form

        form.reset();

    });

});