const adminOrdersContainer = document.getElementById("admin-orders-container");
const orders = JSON.parse(localStorage.getItem("orders")) || [];

function renderAdminOrders(){
    adminOrdersContainer.innerHTML="";
    if(orders.length === 0){
        adminOrdersContainer.innerHTML+=`
        <p>No Orders Found</p>
        `;
        return;
    }

    orders.forEach(order => {
        adminOrdersContainer.innerHTML += `
            <div class="admin-order-card">
                <h2>Order ID: ${order.id}</h2>
                <p>Customer: ${order.customerName}</p>
                <p>Date: ${new Date(order.date).toLocaleDateString()}</p>
                <p>Total: Rs ${order.total}</p>
                <label>
                    Status:
                    <select class="order-status-select" data-id="${order.id}">
                        <option value="Processing" ${(!order.status || order.status === "Processing") ? "selected" : ""}>
                            Processing
                        </option>

                        <option value="Shipped" ${order.status === "Shipped" ? "selected" : ""}>
                            Shipped
                        </option>

                        <option value="Delivered" ${order.status === "Delivered" ? "selected" : ""}>
                            Delivered
                        </option>

                        <option value="Cancelled" ${order.status === "Cancelled" ? "selected" : ""}>
                            Cancelled
                        </option>
                    </select>
                </label>
                <button class="delete-order-button" data-id="${order.id}">
                    Delete Order
                </button>
            </div>
        `;
    });
}
renderAdminOrders();

adminOrdersContainer.addEventListener("change",(event)=>{
    if(!event.target.classList.contains("order-status-select")){
        return;
    }
    const orderId = event.target.dataset.id;
    const newStatus = event.target.value;

    const selectedOrder = orders.find(order => order.id === orderId);
    if(!selectedOrder){
        return;
    }
    if(selectedOrder.status === "Cancelled"){
        return;
    }
    selectedOrder.status = newStatus;
    localStorage.setItem("orders",JSON.stringify(orders));
    renderAdminOrders();
});
adminOrdersContainer.addEventListener("click", (event) => {

    if (!event.target.classList.contains("delete-order-button")) {
        return;
    }
    const orderId = event.target.dataset.id;
    const confirmDelete = confirm(
        "Are you sure you want to delete this order?"
    );
    if (!confirmDelete) {
        return;
    }
    const orderIndex = orders.findIndex(
        order => order.id === orderId
    );
    if (orderIndex === -1) {
        return;
    }
    orders.splice(orderIndex, 1);
    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );
    renderAdminOrders();
});