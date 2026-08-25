const cartContainer = document.getElementById("cart-container");
const cartCount = document.getElementById("cart-count");
const savedCart = localStorage.getItem("cart");
let cart = savedCart ? JSON.parse(savedCart):[];
updateCartCount()

function renderCart(){
    cartContainer.innerHTML = "";
    cart.forEach(item => {
        cartContainer.innerHTML += `
            <div class="products-Cards">
                <div class="product-image">
                    <span class="product-badge">${item.badge}</span>
                    <img src="${item.image}" alt="Headphones" loading="lazy" width="250px" height="250px">
                </div>
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
        `
    });
    
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
            updateCartCount()
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
}
function updateCartCount(){
    const totalItems = cart.reduce((total,item)=>{return total+item.quantity},0);
    cartCount.textContent = totalItems;
}
renderCart();