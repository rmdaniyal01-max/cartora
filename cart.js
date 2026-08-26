const cartContainer = document.getElementById("cart-container");
const cartCount = document.getElementById("cart-count");
const cartTotalElement = document.getElementById("cart-total");
const cartSubTotalElement = document.getElementById("cart-subtotal");
const itemCard = document.getElementById("card");
const savedCart = localStorage.getItem("cart");
const menuButton = document.getElementById("menu-button");
const navLinks = document.getElementById("nav-links");

menuButton.addEventListener("click", () => navLinks.classList.toggle("show"));
let cart = savedCart ? JSON.parse(savedCart):[];
updateCartCount();

function renderCart(){
    cartContainer.innerHTML = "";
    itemCard.innerHTML="";
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        cartContainer.innerHTML += `
            <div class="products-Cards">
                <div class="product-image">
                    <img src="${item.image}" alt="Headphones" loading="lazy" width="180px" height="180px">
                </div>
                <div class="product-details">
                    <h3 class="product-name">${item.name}</h3>
                    <p class="product-brand">${item.brand}</p>
                    <p class="product-rating">Ratings: ${item.rating}/5</p>
                    <p class="product-price">Rs: <ins>${item.price}</ins></p><p class="original-price">Rs: <del>${item.oldPrice}</del></p>
                    <div class="quantity-container">
                        <button class="increase-button" data-id="${item.id}">+</button>
                        <p class="product-quantity">${item.quantity}</p>
                        <button class="decrease-button" data-id="${item.id}">-</button>
                    </div>
                </div>
                <div class="product-total">
                    <p class="item-total">Total: Rs ${itemTotal}</p>
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
            <a href="shop.html"><button class="proceed-button">Shop</button></a>
            <p>Or</p>
            <p>Visit our Categories</p>
            <a href="categories.html"><button class="proceed-button">Categories</button></a>
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
    cartSubTotalElement.textContent = ` Rs,${cartSubTotal}`;
    const shippingCost = 0;
    const grandTotal = cartSubTotal + shippingCost;
    cartTotalElement.textContent =`Rs,${grandTotal}`
}
function updateCartCount(){
    const totalItems = cart.reduce((total,item)=>{return total+item.quantity},0);
    cartCount.textContent = totalItems;
}
renderCart();