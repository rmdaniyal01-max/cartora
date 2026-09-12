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
        ordersContainer.innerHTML +=`
            <div class="orders-container">
                <h2>Customer Name: <span>${order.customerName}</span></h2>
                <p>Order id: ${order.id}</p>
                <p>Status: <span>${order.status || "Processing"}</span></p>
                <p>Ordered Date: ${new Date(order.date).toLocaleDateString()}</p>
                <hr>
                <p>Order Total: ${order.total}</p>
                <button class="view-order-button" data-id="${order.id}">
                    View Details
                </button>
                ${(order.status === "Processing")?`
                <button class="cancel-order-button" data-id="${order.id}">
                    Cancel Order
                </button>`: ""}
            </div>
        `
    });
}
renderOrders();

ordersContainer.addEventListener("click",(event)=>{
    if(event.target.classList.contains("view-order-button")){
       const orderId = event.target.dataset.id;
        const selectedOrder = orders.find(order => order.id === orderId);
        localStorage.setItem("selectedOrder", JSON.stringify(selectedOrder))
        window.location.href = "order-details.html";
    }
});
ordersContainer.addEventListener("click",(event)=>{
    if(!event.target.classList.contains("cancel-order-button")){
        return;
    }
    const orderId = event.target.dataset.id;
    const selectedOrder = orders.find(order => order.id === orderId);
    const confirmCancle = confirm("Are you sure you wont to cancle this Order");
    if(!confirmCancle){
        return;
    }
    selectedOrder.status = "Cancelled"
    localStorage.setItem("orders", JSON.stringify(orders));
    renderOrders();
});