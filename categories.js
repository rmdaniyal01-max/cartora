const menuButton = document.getElementById("menu-button");
const navLinks = document.getElementById("nav-links");
const categoriesLinks = document.getElementById("categories-links");
const categoriesContainer = document.getElementById("categories-container");
const linksToggle = document.getElementById("links-toggle");
const wishlistCount = document.getElementById("wishlist-count");

const cartCount = document.getElementById("cart-count");
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const cart = JSON.parse(localStorage.getItem("cart")) || [];
const productList = JSON.parse(localStorage.getItem("productList")) || [];
updateCartCount()
updateWishlistCount()

const uniqueCategories = [...new Map(productList.map(item => [item.category, item])).values()];
console.log(uniqueCategories);

function renderCategories(){
    uniqueCategories.forEach(item =>{
        categoriesLinks.innerHTML+=`
            <button class="category-button" data-id="${item.category}">${item.category}</button>
        `
    });
};
renderCategories();
const categoryButtons = document.querySelectorAll(".category-button");
categoryButtons.forEach(button =>{
    button.addEventListener("click", () => {
        const productCategory = button.dataset.id;
        const categoryProducts = productList.filter(product => product.category === productCategory);
        categoriesContainer.innerHTML=""
        categoryProducts.forEach(product =>{
            const isWishlisted = wishlist.some(item => item.id === product.id);
            categoriesContainer.innerHTML+=`
                <div class="products-Cards">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}" loading="lazy" width="150px" height="150px">
                    </div>
                    <div class="product-details">
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-brand">${product.brand || "Open Source"}</p>
                        <p class="product-price">$: <ins>${product.price}</ins></p>
                        <p class="original-price">$: <del>${product.price +3}</del></p>
                        <p class="product-rating">Ratings: ${product.rating}/100</p>
                        <div class="buttons">
                            <button class="product-button" data-id="${product.id}">Add to Cart</button>
                            <button class="product-wishlist-button ${isWishlisted ? "added-to-wishlist" : ""}" data-id="${product.id}"><i class="fa-solid fa-heart"></i></button>
                        </div>
                    </div>
                </div>
            `
        });
        if(categoriesLinks.classList.contains("links-display")){
            categoriesLinks.classList.remove("links-display")
        }
    });
});
categoriesContainer.addEventListener("click", (event) =>{
    if(event.target.classList.contains("product-button")){
        const productId = event.target.dataset.id;
        console.log(productId)
        const product = productList.find(product => product.id === Number(productId));
        console.log(product)
        const existingProduct = cart.find(item => item.id === product.id);
        if(existingProduct){
            existingProduct.quantity++
            if(product.stock < existingProduct.quantity){
                existingProduct.quantity = product.stock
                alert(`Dear Customer! We currently have only ${product.stock} pieces left of this product`)
            }
            if(existingProduct.quantity >5){
                existingProduct.quantity = 5
                alert("Dear Customer! you cannot order more than 5 of the same product at a time");
            }
        }else{
            cart.push({...product, quantity: 1})
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    }
});
const wishlistButtons = document.querySelectorAll(".product-wishlist-button");
wishlistButtons.forEach(button => {
        button.addEventListener("click",()=>{
        const productId = button.dataset.id;
                console.log("worked")
        const product = productList.find(product => product.id === Number(productId));
        const existingProduct = wishlist.find(item => item.id === product.id);
        if(existingProduct){
            wishlist = wishlist.filter(item => item.id !== product.id);
            button.classList.remove("added-to-wishlist");
        }else{
            wishlist.push(product);
            button.classList.add("added-to-wishlist");
        }
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        updateWishlistCount();
        renderWishlist();
    });
});
if(window.innerWidth <= 768){
    linksToggle.addEventListener("click",()=>{
        categoriesLinks.classList.toggle("links-display")
    });
}
document.addEventListener("click", (e) => {
    if (
        !linksToggle.contains(e.target) &&
        !menuButton.contains(e.target)
    ) {
        categoriesLinks.classList.remove("links-display")
        navLinks.classList.remove("show");
    }
});
function updateCartCount(){
    const totalItems = cart.reduce((total,item)=>{return total+item.quantity},0);
    cartCount.textContent = totalItems;
};
function updateWishlistCount(){
    wishlistCount.textContent = wishlist.length;
};

menuButton.addEventListener("click", () => 
    navLinks.classList.toggle("show")
);