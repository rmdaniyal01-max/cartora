const productsContainer = document.getElementById("featured-content");
const flashProductsContainer = document.getElementById("flash-content");
const menuButton = document.getElementById("menu-button");
const navLinks = document.getElementById("nav-links");
const topButton = document.getElementById("top-button");
const cartCount = document.getElementById("cart-count");

const productList = JSON.parse(localStorage.getItem("productList")) || [];
const cart = JSON.parse(localStorage.getItem("cart")) || [];

menuButton.addEventListener("click", () => navLinks.classList.toggle("show"));
document.addEventListener("click", (e) => {
    if (
        !menuButton.contains(e.target)
    ) {
        navLinks.classList.remove("show");
    }
});

updateCartCount()
function updateCartCount(){
    const totalItems = cart.reduce((total,item)=>{return total+item.quantity},0);
    cartCount.textContent = totalItems;
}

function renderProducts(){
    productsContainer.innerHTML ="";
    for(let i=157; i<161; i++){
        productsContainer.innerHTML += `
            <div class="featured-Cards">
                <div class="product-image">
                    <span class="product-badge">${productList[i].badge}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="product-wishlistIcon">
                        <path d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z"/></svg>
                    <img src="${productList[i].image}" alt="Headphones" loading="lazy" width="250px" height="250px">
                </div>
                <h3 class="product-name">${productList[i].name}</h3>
                <p class="product-brand">${productList[i].brand}</p>
                <p class="product-rating">Ratings: ${productList[i].rating}/5</p>
                <p class="product-price">$: <ins>${productList[i].price}</ins></p><p class="original-price">$: <del>${productList[i].price +3}</del></p>
                <button class="product-button" data-id="${productList[i].id}"><i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
            </div>
        `
    }
    const cartButtons = document.querySelectorAll(".product-button");
    cartButtons.forEach(button =>{
        button.addEventListener("click",()=>{
            const productId = button.dataset.id;
            console.log(productId)
            const product = productList.find(product => product.id === Number(productId));
            const existingProduct = cart.find(item => item.id === product.id);
            if(existingProduct){
                existingProduct.quantity++
                if(productList.stock < existingProduct.quantity){
                    existingProduct.quantity = productList.stock
                    alert(`Dear Customer! We currently have only ${productList.stock} pieces left of this product`)
                }
                if(existingProduct.quantity >5){
                    existingProduct.quantity =5;
                    alert("Dear Customer! you cannot order more than 5 of the same product at a time");
                }
            }else{
                cart.push({...product, quantity: 1})
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            console.log(cart)
            updateCartCount();
        });
    });
}
renderProducts();


function renderFlashProducts() {
    flashProductsContainer.innerHTML = ""
    for(let i=8; i<12; i++){
        flashProductsContainer.innerHTML += `
            <div class="flash-Cards">
                <div class="flashProduct-image">
                    <span class="flashProduct-badge">${productList[i].badge}</span>
                    <img src="${productList[i].image}" alt="Headphones" loading="lazy" width="250px" height="260px">
                </div>
                    <div class="flashProduct-details">
                    <h3 class="flashProduct-name">${productList[i].name}</h3>
                    <p class="flashProduct-brand">${productList[i].brand}</p>
                    <p class="flashProduct-rating">Ratings: ${productList[i].rating}/5</p>
                    <p class="flashProduct-price">$: <ins>${productList[i].price}</ins></p><p class="original-price">$: <del>${productList[i].price +3}</del></p>
                    <p class="flashProduct-stock">Only ${productList[i].stock} Left</p>
                    <button class="flashProduct-button" data-id="${productList[i].id}"><i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
                </div>
            </div>
        `;
    };
    const cartButtons = document.querySelectorAll(".flashProduct-button");
    cartButtons.forEach(button =>{
        button.addEventListener("click",()=>{
            const productId = button.dataset.id;
            console.log(productId)
            const product = productList.find(product => product.id === Number(productId));
            const existingProduct = cart.find(item => item.id === product.id);
            if(existingProduct){
                existingProduct.quantity++
                if(productList.stock < existingProduct.quantity){
                    existingProduct.quantity = productList.stock
                    alert(`Dear Customer! We currently have only ${productList.stock} pieces left of this product`)
                }
                if(existingProduct.quantity >5){
                    existingProduct.quantity =5;
                    alert("Dear Customer! you cannot order more than 5 of the same product at a time");
                }
            }else{
                cart.push({...product, quantity: 1})
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            console.log(cart)
            updateCartCount();
        });
    });
};
renderFlashProducts();

window.addEventListener("scroll", () => {
    if(window.scrollY >= 300){
        topButton.classList.add("moveToTop");
    }
    else{
        topButton.classList.remove("moveToTop");
    }
});

topButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    })
});