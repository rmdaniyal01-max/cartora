const orderIdElement = document.getElementById("order-id");
const orderDateElement = document.getElementById("order-date");
const customerNameElement = document.getElementById("customer-name");
const orderByNameElement = document.getElementById("order-by-name");
const orderId = localStorage.getItem("lastOrderId");
const savedOrderDate = localStorage.getItem("lastOrderDate");
const customerName = localStorage.getItem("lastCustomerName");
const orderDate = new Date(savedOrderDate);
const orderedProducts = document.getElementById("ordered-products");
const lastOrder = JSON.parse(localStorage.getItem("lastOrder")) || [];
const orderTotalElement = document.getElementById("order-total");
orderIdElement.textContent = orderId;
orderDateElement.textContent = orderDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
});
customerNameElement.textContent = customerName;
orderByNameElement.textContent = customerName;

function renderOrderedProducs(){
    orderedProducts.innerHTML =""
    lastOrder.forEach(item => {
        const itemTotal = item.price * item.quantity;

        orderedProducts.innerHTML+=`
        <div class="products">
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h3 class="products-name">${item.name}</h3>
                <p class="products-price">Price: Rs ${item.price}</p>
                <p class="products-quantity">Quantity: ${item.quantity}</p>
                <hr>
                <p class="products-total">Item Total: $ ${itemTotal}</p>
            </div>
        </div>`
    });
    
}
const orderTotal = lastOrder.reduce((total, item) => {
    return total + (item.price * item.quantity);
}, 0);
orderTotalElement.textContent = `$ ${Number(orderTotal).toFixed(2)}`;
renderOrderedProducs()