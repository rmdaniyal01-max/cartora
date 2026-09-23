const productsContainer = document.getElementById("products-Container");
const paginationContainer = document.getElementById ("pagination");

const searchInput = document.getElementById("search-input");
const categorySelect = document.getElementById("categories");
const priceSelect = document.getElementById("prices");
const ratingSelect = document.getElementById("ratings");
const sortSelect = document.getElementById("sort");
const resetFilterButton = document.getElementById("filter-resetbButton");

const details = document.getElementById("info");

const cartCount = document.getElementById("cart-count");
const wishlistCount = document.getElementById("wishlist-count");

const previousButton = document.createElement("button");
previousButton.textContent = "◀"
previousButton.classList.add("style");
const nextButton = document.createElement("button");
nextButton.textContent = "▶"
nextButton.classList.add("style");

const cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
updateCartCount();
updateWishlistCount()
let currentPage = 1;
const productsPerPage = 8;
let totalPages = 1;
let visibleButtons = 5;

const filters = {
    search: "",
    category: "All Categories",
    price: "All Prices",
    rating: "All Ratings",
    sort: "Sort By"
};

function renderProducts(productList) {
    productsContainer.innerHTML = ""
    productList.forEach(product =>  {
        const isWishlisted = wishlist.some(item => item.id === product.id);
        productsContainer.innerHTML += `
            <div class="products-Cards">
                <div class="product-image">
                    <button class="product-wishlist-button ${isWishlisted ? "added-to-wishlist" : ""}" data-id="${product.id}"><i class="fa-solid fa-heart"></i></button>
                    <img src="${product.image}" alt="${product.name}" loading="lazy" width="250px" height="250px">
                </div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-brand">${product.brand || "Open Source"}</p>
                <p class="product-rating">Ratings: ${product.rating}</p>
                <p class="product-price">$: <ins>${product.price}</ins></p><p class="original-price">$: <del>${(Number(product.price)+3).toFixed(2)}</del></p>
                <button class="product-button" data-id="${product.id}"><i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
            </div>
        `;
    });
    const cartButtons = document.querySelectorAll(".product-button");
    cartButtons.forEach(button =>{
        button.addEventListener("click",()=>{
            const productId = button.dataset.id;
            const product = productList.find(product => product.id === Number(productId));
            const existingProduct = cart.find(item => item.id === product.id);
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
                cart.push({...product, quantity: 1})
                button.textContent ="In Cart"
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
        });
    });
    const wishlistButtons = document.querySelectorAll(".product-wishlist-button");
    wishlistButtons.forEach(button => {
        button.addEventListener("click",()=>{
            const productId = button.dataset.id;
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
        });
    });
}
function updateCartCount(){
    const totalItems = cart.reduce((total,item)=>{return total+item.quantity},0);
    cartCount.textContent = totalItems;
}
function updateWishlistCount(){
    wishlistCount.textContent = wishlist.length;
}
applyFilters();

searchInput.addEventListener("input", () => {
    filters.search = searchInput.value;
    applyFilters();
})
categorySelect.addEventListener("change", () => {
    filters.category = categorySelect.value;
    applyFilters();
});
priceSelect.addEventListener("change", () => { 
    filters.price = priceSelect.value;
    applyFilters();
});
ratingSelect.addEventListener("change", () => {
  filters.rating = ratingSelect.value;
  applyFilters();
});
sortSelect.addEventListener("change", () => {
    filters.sort = sortSelect.value;
    applyFilters();
})
function applyFilters(){

    let filteredProducts = [...productList];
    if(filters.search !== ""){
        const normalizedSearch = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
         product.name.toLowerCase() .includes(normalizedSearch) || product.brand?.toLowerCase() .includes(normalizedSearch) ||
         product.category.toLowerCase() .includes(normalizedSearch));
    }
    if(filters.category !== "All Categories"){
        const searchCategories = filters.category.toLowerCase();
        filteredProducts = filteredProducts.filter(product => product.category === searchCategories);
    }
    if(filters.price !== "All Prices"){
        const searchPrices = filters.price;
        const minMax = searchPrices.split("-");
        const minimum = Number(minMax[0]);
        const maximum = Number(minMax[1]);
        filteredProducts = filteredProducts.filter(product => product.price >= minimum && product.price <= maximum);
    }
    if(filters.rating !== "All Ratings"){
        const searchRatings = filters.rating;
        const minMax = searchRatings.split("-");
        const minimum = Number(minMax[0]);
        const maximum = Number(minMax[1]);
        filteredProducts = filteredProducts.filter(product => product.rating >= minimum && product.rating <= maximum);
    }

    if(filters.sort === "Price: Low → High"){
        filteredProducts.sort((a, b) => a.price - b.price);
    }
    if(filters.sort === "Price: High → Low"){
        filteredProducts.sort((a, b) => b.price - a.price);
    }
    if(filters.sort === "Highest Rated"){
        filteredProducts.sort((a, b) => b.rating - a.rating);
    }
    if(filters.sort === "Newest"){
        filteredProducts.sort((a, b) => b.id - a.id);
    }

    
    totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    if(currentPage > totalPages){
        currentPage = totalPages;
    };
    if(totalPages === 0){
        currentPage = 1;
    };
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex  + productsPerPage;

    const productsForCurrentPage = filteredProducts.slice(startIndex, endIndex);

    paginationContainer.innerHTML = "";

    paginationContainer.appendChild(previousButton);
    if(currentPage === 1){
        previousButton.disabled = true;
    }else{
        previousButton.disabled = false;
    }
    
    window.addEventListener("resize", () => {
        if (window.innerWidth <= 786) {
            visibleButtons = 3;
        } else {
            visibleButtons = 5;
        }

        applyFilters();
    });
    let half = Math.floor(visibleButtons/2);
    let startPage = Math.max(1,currentPage - half);
    let endPage = Math.min(totalPages, startPage + visibleButtons - 1);
    let missingButtons = visibleButtons - (endPage - startPage + 1);
    if(missingButtons > 0){startPage = Math.max(1, startPage - missingButtons)};

    for(let i = startPage; i <= endPage; i++){
        
        const pageButton = document.createElement("button");
        pageButton.textContent = i;

        if(i === currentPage){
            pageButton.classList.add("active")
        };
        pageButton.addEventListener("click", () => {
            currentPage = i;
            window.scrollTo({
                top: 580,
                behavior: "smooth",
            })
            applyFilters();
        });
        
        paginationContainer.appendChild(pageButton);
    };

    paginationContainer.appendChild(nextButton);
    if(currentPage === totalPages){
        nextButton.disabled = true;
    }else{
        nextButton.disabled = false;
    }
    details.textContent = `Showing: ${startIndex + 1} - ${endIndex} of ${filteredProducts.length} Products.`
    if(filteredProducts.length < 8){
        details.textContent = `Showing: ${1} - ${filteredProducts.length} of ${filteredProducts.length} Products.`
    }
    if(filteredProducts.length === 0){
        details.textContent = `No matching products found.`
        paginationContainer.style.display = "none";
    }else{
        paginationContainer.style.display = "flex";
    }
    renderProducts(productsForCurrentPage);
};

nextButton.addEventListener("click", () => {
    if(currentPage < totalPages){
        currentPage += 1;
        window.scrollTo({
            top: 580,
            behavior: "smooth",
        })
        applyFilters();
    }
})
    
previousButton.addEventListener("click", () => {
    if(currentPage > 1){
        currentPage -= 1;
        window.scrollTo({
            top: 580,
            behavior: "smooth",
        })
        applyFilters();
    }
})

resetFilterButton.addEventListener("click", () => {
    searchInput.value = "";
    categorySelect.value = "All Categories";
    priceSelect.value = "All Prices";
    ratingSelect.value = "All Ratings"
    sortSelect.value = "Sort By";

    filters.search= "";
    filters.category= "All Categories";
    filters.price= "All Prices";
    filters.rating= "All Ratings";
    filters.sort= "Sort By";
    applyFilters();
});