const orderDetailsContainer = document.getElementById("order-details-container");
const selectedOrder = JSON.parse(localStorage.getItem("selectedOrder")) || [];
if (!selectedOrder) {
    window.location.href = "orders.html";
}

orderDetailsContainer.innerHTML = `
    <h2>Order ID: ${selectedOrder.id}</h2>
    <p>Customer: ${selectedOrder.customerName}</p>
    <p>Status: <strong>${selectedOrder.status || "Processing"}</strong></p>
    <p>Date: ${new Date(selectedOrder.date).toLocaleDateString()}</p>
    <p>Total: $ ${Number(selectedOrder.total).toFixed(2)}</p>
    <h2>Products</h2>
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
                <p>Item Total: $ ${productTotal}</p>
            </div>
        </div>
    `
});

