const wishlistContainer = document.getElementById("wishlist-container")
const wishlistCount = document.getElementById("wishlist-count");
const cartCount = document.getElementById("cart-count");

const cart = JSON.parse(localStorage.getItem("cart")) || [];
const productList = JSON.parse(localStorage.getItem("productList")) || [];


let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
updateCartCount()
updateWishlistCount()

function renderWishlist(){
    wishlistContainer.innerHTML=""
    wishlist.forEach(product => {
        const isWishlisted = wishlist.some(item => item.id === product.id);
        wishlistContainer.innerHTML+=`
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
        updateCartCount()
        updateWishlistCount()
    });
}

wishlistContainer.addEventListener("click",(event) =>{
    if(event.target.classList.contains("product-wishlist-button")){
        const productId = event.target.dataset.id;
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
        renderWishlist()
    }
});
// const wishlistButtons = document.querySelectorAll(".product-wishlist-button");
// wishlistButtons.forEach(button => {
    //     button.addEventListener("click",()=>{
        // const productId = button.dataset.id;
        //         console.log("worked")
//         const product = productList.find(product => product.id === Number(productId));
//         const existingProduct = wishlist.find(item => item.id === product.id);
//         if(existingProduct){
//             wishlist = wishlist.filter(item => item.id !== product.id);
//             button.classList.remove("added-to-wishlist");
//         }else{
//             wishlist.push(product);
//             button.classList.add("added-to-wishlist");
//         }
//         localStorage.setItem("wishlist", JSON.stringify(wishlist));
//         updateWishlistCount();
//         renderWishlist();
//     });
// });
wishlistContainer.addEventListener("click", (event) =>{
    if(event.target.classList.contains("product-button")){
        const productId = event.target.dataset.id;
        console.log("worked")
        const product = productList.find(product => product.id === Number(productId));
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
function updateCartCount(){
    const totalItems = cart.reduce((total,item)=>{return total+item.quantity},0);
    cartCount.textContent = totalItems;
}
function updateWishlistCount(){
    wishlistCount.textContent = wishlist.length;
};
renderWishlist();