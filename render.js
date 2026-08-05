const productsContainer = document.getElementById("products-Container");
const searchInput = document.getElementById("search-input");
const categorySelect = document.getElementById("categories");
const priceSelect = document.getElementById("prices");
const ratingSelect = document.getElementById("ratings");
const sortSelect = document.getElementById("sort");
const resetFilterButton = document.getElementById("filter-resetbButton");
const paginationContainer = document.getElementById ("pagination");

let currentPage = 1;
let productsPerPage = 8;

const startIndex = (currentPage - 1) * productsPerPage;
const endIndex = startIndex  + productsPerPage;


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
        productsContainer.innerHTML += `
            <div class="products-Cards">
                <div class="product-image">
                    <span class="product-badge">${product.badge}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" class="product-wishlistIcon">
                        <path d="M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z"/></svg>
                    <img src="${product.image}" alt="Headphones" loading="lazy" width="250px" height="250px">
                </div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-brand">${product.brand}</p>
                <p class="product-rating">Ratings: ${product.rating}/5</p>
                <p class="product-price">Rs: <ins>${product.price}</ins></p><p class="original-price">Rs: <del>${product.oldPrice}</del></p>
                <button class="product-button"><i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
            </div>
        `;
    });
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
        filteredProducts = filteredProducts.filter(product => product.badge.toLowerCase() .includes(normalizedSearch) ||
         product.name.toLowerCase() .includes(normalizedSearch) || product.brand.toLowerCase() .includes(normalizedSearch) ||
         product.category.toLowerCase() .includes(normalizedSearch));
    }
    if(filters.category !== "All Categories"){
        const searchCategories = filters.category;
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

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex  + productsPerPage;

    const productsForCurrentPage = filteredProducts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    paginationContainer.innerHTML = ""
    for(let i = 1; i <= totalPages; i++){
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.addEventListener("click", () => {
            currentPage = i;
            applyFilters();
        })
        paginationContainer.appendChild(pageButton);
    }

    renderProducts(productsForCurrentPage);
};

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


