const orderDetailsContainer = document.getElementById("orders-container");
const cancelOrderButton = document.getElementById("cancel-order-button");

const selectedOrder = JSON.parse(localStorage.getItem("selectedOrder")) || [];
if (!selectedOrder) {
    window.location.href = "orders.html";
}

orderDetailsContainer.innerHTML = `
    <div>
        <h2>Order ID: <span>${selectedOrder.id}</span></h2>
        <p>Customer: <span>${selectedOrder.customerName}</span></p>
        <p>Status: <span>${selectedOrder.status || "Processing"}</span></p>
        <p>Date: ${new Date(selectedOrder.date).toLocaleDateString()}</p>
        <p>Total: $ ${Number(selectedOrder.total).toFixed(2)}</p>
        <h2>Products</h2>
    </div>
    <div id="order-products"></div>
`
const orderProducts = document.getElementById("order-products");

selectedOrder.products.forEach(product => {
    const productTotal = product.price * product.quantity;
    
    orderProducts.innerHTML +=`
        <div class="order-product">
            <img src="${product.image}" alt="${product.name}">

            <div>
                <h3>${product.name}</h3>
                <p>Price: $ ${product.price} × ${product.quantity}</p>
                <hr>
                <p>Item Total: $ ${productTotal}</p>
            </div>
        </div>
    `
});
if((selectedOrder.status || "Processing") !== "Processing"){
    cancelOrderButton.style.display ="none"
}
cancelOrderButton.addEventListener("click", () => {
    const confirmCancel = confirm(
        "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) {
        return;
    }
     if ((selectedOrder.status || "Processing") !== "Processing") {
        return;
    }
    selectedOrder.status = "Cancelled";

    const orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    const orderIndex = orders.findIndex(
        order => order.id === selectedOrder.id
    );

    if (orderIndex !== -1) { orders[orderIndex].status = "Cancelled";}
    localStorage.setItem("orders",JSON.stringify(orders));
    localStorage.setItem("selectedOrder",JSON.stringify(selectedOrder));
    location.reload();
});
