const ordersContainer = document.getElementById("orders-container");

const orders = JSON.parse(localStorage.getItem("orders")) || [];
console.log("Orders:",orders)


function renderOrders(){
    ordersContainer.innerHTML ="";
    if (orders.length === 0) {
    ordersContainer.innerHTML = `
        <div class="empty-orders">
            <h2>No Orders Yet</h2>
            <p>You haven't placed any orders yet.</p>
            <a href="shop.html">
                <button>Start Shopping</button>
            </a>
        </div>
    `;
    return;
}
    orders.forEach(order => {
        console.log(typeof order.products.price)
        ordersContainer.innerHTML +=`
            <div class="orders-container">
                <h2>Customer Name: ${order.customerName}</h2>
                <p>Order id: ${order.id}</p>
                <p>Ordered Date: ${new Date(order.date).toLocaleDateString()}</p>
                <p>Order Total: ${order.total}</p>
                <button class="view-order-button" data-id="${order.id}">
                    View Details
                </button>
            </div>
        `
    });
}
renderOrders();

const viewOrderButtons = document.querySelectorAll(".view-order-button");
viewOrderButtons.forEach(button =>{
    button.addEventListener("click", ()=>{
        const orderId = button.dataset.id;
        const selectedOrder = orders.find(order => order.id === orderId);
        localStorage.setItem("selectedOrder", JSON.stringify(selectedOrder))
        window.location.href = "order-details.html";
    })
})