const cart = JSON.parse(localStorage.getItem("cart")) || [];
const checkoutSubtotalElement = document.getElementById("checkout-subtotal");
const checkoutTotalElement = document.getElementById("checkout-total");
const checkoutProducts = document.getElementById("checkout-products");
const checkoutForm = document.getElementById("checkout-form");


function renderCheckoutProducts() {
    checkoutProducts.innerHTML = "";
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        checkoutProducts.innerHTML += `
            <div class="checkout-product">
                <img src="${item.image}" class="products-image" alt="${item.name} ">
                <div>
                    <h3 class="products-name">${item.name}</h3>
                    <p class="products-price">Rs ${item.price} × ${item.quantity}</p>
                    <p class="products-total">Item Total: $: ${itemTotal}</p>
                </div>
            </div>
        `;
    });
    const checkoutSubtotal = cart.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
    checkoutSubtotalElement.textContent = `${Number(checkoutSubtotal).toFixed(2)}$`;
    const shippingCost = 0;
    const checkoutTotal = checkoutSubtotal + shippingCost;
    checkoutTotalElement.textContent =`${Number(checkoutTotal).toFixed(2)}$`
    
}
checkoutForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    if(cart.length ===0){
        return;
    }
    const orderId = `CRT-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderDate = new Date();
    const customerName = document.getElementById("customer-name").value;
    localStorage.setItem("lastOrderId", orderId);
    localStorage.setItem("lastOrderDate",orderDate.toISOString());
    localStorage.setItem("lastCustomerName", customerName);
    localStorage.setItem("lastOrder", JSON.stringify(cart));
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const order = {
        id: orderId,
        date: orderDate.toISOString(),
        customerName: customerName,
        products: cart,
        total: cart.reduce((total, item) => {
            return total + (item.price * item.quantity).toFixed(2);
        }, 0)
    };
    savedOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(savedOrders));
    cart.length = 0;
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "confirmationPage.html";
});



renderCheckoutProducts();