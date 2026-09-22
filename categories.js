const menuButton = document.getElementById("menu-button");
const navLinks = document.getElementById("nav-links");

const electronicButton = document.getElementById("electronic-button");
const beautyButton = document.getElementById("beauty-button");
const fashionButton = document.getElementById("fashion-button");
const homeButton = document.getElementById("home-button");
const accessoriesButton = document.getElementById("accessories-button");
const automativeButton = document.getElementById("automative-button");

const allCategoryButton = document.getElementById("all-category-button");

const categoryMenu = document.getElementById("category-menu")

const categoryContainer = document.getElementById("category-container");

const wishlistCount = document.getElementById("wishlist-count");
const cartCount = document.getElementById("cart-count");

const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const productList = JSON.parse(localStorage.getItem("productList")) || [];
const uniqueCategories = [...new Map(productList.map(item => [item.category, item])).values()];

function setActiveButton(button) {
    document.querySelectorAll(".cat-btn").forEach(btn => {
        btn.classList.remove("active-cat-button");
    });

    button.classList.add("active-cat-button");
}

function renderPopularCategories(){
    categoryContainer.innerHTML ="";
    categoryContainer.innerHTML =`<h2 id="main-heading">Popular<span id="sub-heading"></span></h2>
        <div id="sub-category-container"></div>
    `;
    const subCategoryContainer = document.getElementById("sub-category-container");

    for(let i=11; i<17;i++){
        subCategoryContainer.innerHTML+=`
            <div class="category-card">
                <img src="${uniqueCategories[i].image}">
                <div class="details">
                    <h2 class="category-name">${uniqueCategories[i].category}</h2>
                    <button class="category-button" data-id="${uniqueCategories[i].category}">&rarr;</button>
                </div>
            </div>
        `
    }
}
renderPopularCategories()
electronicButton.addEventListener("click",()=>{
    setActiveButton(electronicButton)

    const electronicCategory = uniqueCategories.filter(product => product.category  .includes("smartphones") || product.category  .includes("tablets") || product.category === "laptops");
    categoryContainer.innerHTML ="";
    categoryContainer.innerHTML =`<h2 id="main-heading">Electronics<span id="sub-heading"></span></h2>
        <div id="sub-category-container"></div>
    `;
    const subCategoryContainer = document.getElementById("sub-category-container");

    electronicCategory.forEach(element => {
        
        subCategoryContainer.innerHTML+=`
            <div class="category-card">
                <img src="${element.image}">
                <div class="details">
                    <h2 class="category-name">${element.category}</h2>
                    <button class="category-button" data-id="${element.category}">&rarr;</button>
                </div>
            </div>
        `
    });
    
})

beautyButton.addEventListener("click",()=>{
    setActiveButton(beautyButton)

    const beautyCategory = uniqueCategories.filter(product => product.category  .includes("fragrances") || product.category  .includes("sunglasses") || product.category.includes("beauty"));
    categoryContainer.innerHTML ="";
    categoryContainer.innerHTML =`<h2 id="main-heading">Beauty<span id="sub-heading"></span></h2>
        <div id="sub-category-container"></div>
    `;
    const subCategoryContainer = document.getElementById("sub-category-container");

    beautyCategory.forEach(element => {
        
        subCategoryContainer.innerHTML+=`
            <div class="category-card">
                <img src="${element.image}">
                <div class="details">
                    <h2 class="category-name">${element.category}</h2>
                    <button class="category-button" data-id="${element.category}">&rarr;</button>
                </div>
            </div>
        `
    });

})

fashionButton.addEventListener("click",()=>{
    setActiveButton(fashionButton)

    const fashionCategory = uniqueCategories.filter(product => product.category  .includes("sunglasses") || product.category  .includes("womens") || product.category.includes("mens") ||product.category ==="tops");
    categoryContainer.innerHTML ="";
    categoryContainer.innerHTML +=`<h2 id="main-heading">Fashion<span id="sub-heading"></span></h2>
        <div id="sub-category-container"></div>
    `;
    const subCategoryContainer = document.getElementById("sub-category-container");

    fashionCategory.forEach(element => {
        
        subCategoryContainer.innerHTML+=`
            <div class="category-card">
                <img src="${element.image}">
                <div class="details">
                    <h2 class="category-name">${element.category}</h2>
                    <button class="category-button" data-id="${element.category}">&rarr;</button>
                </div>
            </div>
        `
    });

})


homeButton.addEventListener("click",()=>{
    setActiveButton(homeButton)

    const homeCategory = uniqueCategories.filter(product => product.category  .includes("home-decoration") || product.category  .includes("furniture") || product.category .includes("groceries") || product.category .includes("kitchen"));
    categoryContainer.innerHTML ="";
    categoryContainer.innerHTML =`<h2 id="main-heading">Home & Living<span id="sub-heading"></span></h2>
        <div id="sub-category-container"></div>
    `;
    const subCategoryContainer = document.getElementById("sub-category-container");

    homeCategory.forEach(element => {
        
        subCategoryContainer.innerHTML+=`
            <div class="category-card">
                <img src="${element.image}">
                <div class="details">
                    <h2 class="category-name">${element.category}</h2>
                    <button class="category-button" data-id="${element.category}">&rarr;</button>
                </div>
            </div>
        `
    });

})
accessoriesButton.addEventListener("click",()=>{
    setActiveButton(accessoriesButton)

    const accessoriesCategory = uniqueCategories.filter(product => product.category  .includes("accessories"));
    categoryContainer.innerHTML ="";
    categoryContainer.innerHTML =`<h2 id="main-heading">Accessories<span id="sub-heading"></span></h2>
        <div id="sub-category-container"></div>
    `;
    const subCategoryContainer = document.getElementById("sub-category-container");

    accessoriesCategory.forEach(element => {
        
        subCategoryContainer.innerHTML+=`
            <div class="category-card">
                <img src="${element.image}">
                <div class="details">
                    <h2 class="category-name">${element.category}</h2>
                    <button class="category-button" data-id="${element.category}">&rarr;</button>
                </div>
            </div>
        `
    });

})
automativeButton.addEventListener("click",()=>{
    setActiveButton(automativeButton)

    const automativeCategory = uniqueCategories.filter(product => product.category  .includes("vehicle") || product.category  .includes("motorcycle"));
    categoryContainer.innerHTML ="";
    categoryContainer.innerHTML =`<h2 id="main-heading">Automative<span id="sub-heading"></span> </h2>
        <div id="sub-category-container"></div>
    `;
    const subCategoryContainer = document.getElementById("sub-category-container");
    
    automativeCategory.forEach(element => {
        subCategoryContainer.innerHTML+=`
            <div class="category-card">
                <img src="${element.image}">
                <div class="details">
                    <h2 class="category-name">${element.category}</h2>
                    <button class="category-button" data-id="${element.category}">&rarr;</button>
                </div>
            </div>
        `
    });

})









categoryContainer.addEventListener("click",(event)=>{
    if(event.target.classList.contains("category-button")){
        const categoryId = event.target.dataset.id;
        const products = productList.filter(product => product.category === categoryId);
        
        const subHeading = document.getElementById("sub-heading");
        const subCategoryContainer = document.getElementById("sub-category-container");
        
        subHeading.textContent = `, ${categoryId}`
        subCategoryContainer.innerHTML=""
        products.forEach(product=>{
            subCategoryContainer.innerHTML+=`
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
                            <button class="product-wishlist-button" data-id="${product.id}"><i class="fa-solid fa-heart"></i></button>
                        </div>
                    </div>
                </div>
            `
        })
    }
})
















updateCartCount()
updateWishlistCount()

document.addEventListener("click", (e) => {
    if (
        !menuButton.contains(e.target)&&
        !allCategoryButton.contains(e.target)
    ) {
        navLinks.classList.remove("show");
        categoryMenu.classList.remove("show-all-categories");
    }
});
menuButton.addEventListener("click", () => {
    navLinks.classList.toggle("show");
        categoryMenu.classList.remove("show-all-categories");

});
allCategoryButton.addEventListener("click", () => {
    categoryMenu.classList.toggle("show-all-categories");
        navLinks.classList.remove("show");

});

function updateCartCount(){
    const totalItems = cart.reduce((total,item)=>{return total+item.quantity},0);
    cartCount.textContent = totalItems;
};
function updateWishlistCount(){
    wishlistCount.textContent = wishlist.length;
};
