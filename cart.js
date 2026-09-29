const cartContainer = document.getElementById("cart-container");
const forYouContainer = document.getElementById("forYou-container");
const cartTotalElement = document.getElementById("cart-total");
const cartSubTotalElement = document.getElementById("cart-subtotal");
const cartSummary = document.getElementById("cart-summary");

const cartCount = document.getElementById("cart-count");
const wishlistCount = document.getElementById("wishlist-count");

const checkoutButton = document.getElementById("checkout-button")
const itemCard = document.getElementById("cart-summary");
const savedCart = localStorage.getItem("cart");
const menuButton = document.getElementById("menu-button");
const navLinks = document.getElementById("nav-links");

const productList = JSON.parse(localStorage.getItem("productList")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
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
            <p>Visit our <a href="shop.html"><button class="goto-button">Shop</button></a> to pick an item you like.</p>
            
            <p>Or</p>
            <p>Visit our <a href="categories.html"><button class="goto-button">Categories</button></a></p>
        </div>`
        cartSummary.style.display = "none"
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
const randomProducts = [...productList]
    .sort(() => Math.random() - 0.5)
    .slice(0, 8);
function renderForyouProducts(){
    forYouContainer.innerHTML=`<h2>You May Also Like</h2>
        <div id="foryou-products"></div>
    `;
    const forYouProducts = document.getElementById("foryou-products")
    randomProducts.forEach(product =>{
        const isWishlisted = wishlist.some(item => item.id === product.id);

        forYouProducts.innerHTML+=`
            <div class="forYouProducts-Cards">
                <div class="forYouProduct-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy" width="150px" height="150px">
                </div>
                <div class="forYouProduct-details">
                    <h3 class="forYouProduct-name">${product.name}</h3>
                    <p class="forYouProduct-brand">${product.brand || "Open Source"}</p>
                    <p class="forYouProduct-price">$: <ins>${product.price}</ins></p>
                    <p class="forYouOriginal-price">$: <del>${product.price +3}</del></p>
                    <p class="forYouProduct-rating">Ratings: ${product.rating}/100</p>
                    <div class="forYouButtons">
                        <button class="forYouProduct-button" data-id="${product.id}">Add to Cart</button>
                        <button class="forYouProduct-wishlist-button ${isWishlisted ? "added-to-wishlist" : ""}" data-id="${product.id}"><i class="fa-solid fa-heart"></i></button>
                    </div>
                </div>
            </div>
        `
    })
    forYouProducts.addEventListener("click",(event)=>{
        if(event.target.classList.contains("forYouProduct-button")){
            const productId = Number(event.target.dataset.id);
            const product = productList.find(product => product.id === productId);
            const existingProduct = cart.find(item=> item.id === product.id);
            if(existingProduct){
                existingProduct.quantity++
                if(product.stock < existingProduct.quantity){
                    existingProduct.quantity = product.stock
                    alert(`Dear Customer! We currently have only ${product.stock} pieces left of this product`)
                }
                if(existingProduct.quantity >5){
                    existingProduct.quantity =5;
                    alert("Dear Customer! you cannot order more than 5 of the same product at a time");
                }
            }else{
                if(product.stock === 0){
                    alert(`Dear Customer! We are currently out of stock for this product.`);
                    return;
                }
                cart.push({...product, quantity: 1})
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
            renderCart();
            cartSummary.style.display = "flex"
        }
        if(event.target.closest(".forYouProduct-wishlist-button")){
            const productId = Number(event.target.closest(".forYouProduct-wishlist-button").dataset.id);
            const product = productList.find(product => product.id === productId);
            const existingProduct = wishlist.find(item => item.id === product.id);
            if(existingProduct){
                wishlist = wishlist.filter(item => item.id !== product.id);
                event.target.closest(".forYouProduct-wishlist-button").classList.remove("added-to-wishlist");
            }else{
                wishlist.push(product);
                event.target.closest(".forYouProduct-wishlist-button").classList.add("added-to-wishlist");
            }
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            updateWishlistCount();
            
        }
    })
}
renderForyouProducts();

menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("show")
    menuButton.classList.toggle("active")
});
document.addEventListener("click", (e) => {
    if (
        !menuButton.contains(e.target)
    ) {
        navLinks.classList.remove("show");
        menuButton.classList.remove("active")

    }
});