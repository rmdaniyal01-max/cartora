const productsContainer = document.getElementById("products-Container");
const searchInput = document.getElementById("search-input");

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
                <p class="product-rating">Ratings: ⭐⭐⭐⭐⭐ (${product.rating})</p>
                <p class="product-price">Rs: <ins>${product.price}</ins></p><p class="original-price">Rs: <del>${product.oldPrice}</del></p>
                <button class="product-button"><i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
            </div>
        `;
    });
}


searchInput.addEventListener("input", () => {
    const searchText = searchInput.value
    const filterdProducts = productList.filter(product => product.badge.toLowerCase() .includes(searchText.toLowerCase()) ||
     product.name.toLowerCase() .includes(searchText.toLowerCase()) || product.brand.toLowerCase() .includes(searchText.toLowerCase()) ||
     product.category.toLowerCase() .includes(searchText.toLowerCase()));
    renderProducts(filterdProducts)
})

renderProducts(productList);