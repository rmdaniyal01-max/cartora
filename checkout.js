const cart = JSON.parse(localStorage.getItem("cart")) || [];
const checkoutSubtotalElement = document.getElementById("checkout-subtotal");
const checkoutTotalElement = document.getElementById("checkout-total");
const checkoutProducts = document.getElementById("checkout-products");


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

renderCheckoutProducts();