const cartContainer = document.getElementById("cart-container");
const cartCount = document.getElementById("cart-count");
const wishlistCount = document.getElementById("wishlist-count");
const cartTotalElement = document.getElementById("cart-total");
const cartSubTotalElement = document.getElementById("cart-subtotal");
const checkoutButton = document.getElementById("checkout-button")
const itemCard = document.getElementById("cart-summary");
const savedCart = localStorage.getItem("cart");
const menuButton = document.getElementById("menu-button");
const navLinks = document.getElementById("nav-links");
const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

menuButton.addEventListener("click", () => navLinks.classList.toggle("show"));
document.addEventListener("click", (e) => {
    if (
        !menuButton.contains(e.target)
    ) {
        navLinks.classList.remove("show");
    }
});
let cart = savedCart ? JSON.parse(savedCart):[];
updateCartCount();
updateWishlistCount()

function renderCart(){
    cartContainer.innerHTML = "";
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        cartContainer.innerHTML += `
            <div class="products-Cards">
                <div class="product-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy" width="240px" height="240px">
                </div>
                <div class="product-details">
                    <h3 class="product-name">${item.name}</h3>
                    <p class="product-brand">${item.brand || "Open Source"}</p>
                    <p class="product-rating">Ratings: ${item.rating}/5</p>
                    <p class="product-price">$: <ins>${item.price}</ins></p><p class="original-price">$: <del>${(Number(item.price)+3).toFixed(2)}</del></p>
                    <div class="quantity-container">
                        <button class="increase-button" data-id="${item.id}">+</button>
                        <p class="product-quantity">${item.quantity}</p>
                        <button class="decrease-button" data-id="${item.id}">-</button>
                    </div>
                </div>
                <div class="product-total">
                    <p class="item-total">Total: $ ${Number(itemTotal).toFixed(2)}</p>
                    <button class="remove-button" data-id="${item.id}"><i class="fa-regular fa-trash-can"></i></buton>
                </div>
            </div>
        `
    });
    const removeButtons = document.querySelectorAll(".remove-button");
    removeButtons.forEach(button=>{
        button.addEventListener("click",()=>{
            const productId = button.dataset.id;
            cart = cart.filter(item => item.id !== Number(productId));
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
            renderCart();
        });
    });
    
    if(cart.length === 0){
        cartContainer.innerHTML = `
        <div id="empty-cart">
            <p>Looks like your cart is empty!</p>
            <p>Visit our shop to pick an item you like.</p>
            <a href="shop.html"><button class="goto-button">Shop</button></a>
            <p>Or</p>
            <p>Visit our Categories</p>
            <a href="categories.html"><button class="goto-button">Categories</button></a>
        </div>`
    }
    const increaseButtons = document.querySelectorAll(".increase-button");
    increaseButtons.forEach(button=>{
        button.addEventListener("click",()=>{
            const productId = button.dataset.id;
            const product = cart.find(item => item.id === Number(productId));
            product.quantity++;
            const quantityElement = button.parentElement.querySelector(".product-quantity");
            quantityElement.textContent = product.quantity;
            if(product.stock < product.quantity){
                product.quantity = product.stock
                alert(`Dear Customer! We currently have only ${product.stock} pieces left of this product`)
            }
            if(product.quantity >= 5){
                product.quantity =5;
                quantityElement.textContent = product.quantity;
                alert("Dear Customer! you cannot order more than 5 of the same product at a time");
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
            renderCart();
        });
    });
    const decreaseButtons = document.querySelectorAll(".decrease-button");
    decreaseButtons.forEach(button=>{
        button.addEventListener("click",()=>{
            const productId = button.dataset.id;
            const product = cart.find(item => item.id === Number(productId));
            product.quantity--;
            const quantityElement = button.parentElement.querySelector(".product-quantity");
            quantityElement.textContent = product.quantity;
            if (product.quantity === 0) {
                cart = cart.filter(item => item.id !== product.id);
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
            renderCart();
        });
    });
    
    const cartSubTotal = cart.reduce((total, item) => { return total+(item.price * item.quantity) }, 0);
    cartSubTotalElement.textContent = `${Number(cartSubTotal).toFixed(2)}$`;
    const shippingCost = 0;
    const grandTotal = cartSubTotal + shippingCost;
    cartTotalElement.textContent =`${Number(grandTotal).toFixed(2)}$`
}
checkoutButton.addEventListener("click",()=>{
    if(cart.length ===0){
        return;
    }else{
        window.location.href="checkout.html"
    }
})
function updateCartCount(){
    const totalItems = cart.reduce((total,item)=>{return total+item.quantity},0);
    cartCount.textContent = totalItems;
}
function updateWishlistCount(){
    wishlistCount.textContent = wishlist.length;
};
renderCart();