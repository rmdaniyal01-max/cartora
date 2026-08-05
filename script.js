const productsContainer = document.getElementById("featured-content");
const flashProductsContainer = document.getElementById("flash-content");
const menuButton = document.getElementById("menu-button");
const navLinks = document.getElementById("nav-links");
const topButton = document.getElementById("top-button");

menuButton.addEventListener("click", () => navLinks.classList.toggle("show"));

let products =[
    {
        id: 1,
        name: "Sony WH-1000XM5",
        brand: "Sony",
        category: "Electronics",
        price: 49500,
        oldPrice: 59000,
        rating: 4.7,
        reviews: 124,
        badge: "-10%",
        image: "images/headphones.webp"
    },
    {
        id: 2,
        name: "Apple Watch Series 10",
        brand: "Apple",
        category: "Electronics",
        price: 120000,
        oldPrice: 122000,
        rating: 4.8,
        reviews: 93,
        badge: "HOT",
        image: "images/smartwatch.webp"
    },
    {
        id: 3,
        name: "Nike Air Force 1",
        brand: "Nike",
        category: "Fashion",
        price: 33000,
        oldPrice: 34000,
        rating: 4.9,
        reviews: 87,
        badge: "BEST SELLER",
        image: "images/shoes.webp"
    },
    {
        id: 4,
        name: "Corsair K70 RGB",
        brand: "Corsair",
        category: "Electronics",
        price: 40000,
        oldPrice: 42000,
        rating: 3.9,
        reviews: 87,
        badge: "NEW",
        image: "images/keyboard.webp"
    }
]

function renderProducts() {
    productsContainer.innerHTML = ""
    products.forEach(product => {
        productsContainer.innerHTML += `
            <div class="featured-Cards">
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
renderProducts();

let flashProducts =[
    {
        id: 1,
        name: "Asus Tuff Gaming F15",
        brand: "Asus",
        category: "Electronics",
        price: 368999,
        oldPrice: 400000,
        rating: 4.9,
        reviews: 87,
        badge: "Trending",
        image: "images/asus-laptop.webp"
    },
    {
        id: 2,
        name: "Iphone 16 Pro",
        brand: "Apple",
        category: "Electronics",
        price: 319999,
        oldPrice: 322000,
        rating: 4.9,
        reviews: 87,
        badge: "HOT",
        image: "images/iphone-16pro.webp"
    },
    {
        id: 3,
        name: "PS5 Pro 2TB",
        brand: "PlayStation",
        category: "Electronics",
        price: 342000,
        oldPrice: 360000,
        rating: 4.9,
        reviews: 87,
        badge: "-5%",
        image: "images/PS5.webp"
    },
    {
        id: 4,
        name: "Odyssey G5",
        brand: "Samsung",
        category: "Electronics",
        price: 86999,
        oldPrice: 80000,
        rating: 4.7,
        reviews: 87,
        badge: "NEW",
        image: "images/samsung-TV.webp"
    }
];

function renderFlashProducts() {
    flashProductsContainer.innerHTML = ""
    flashProducts.forEach(product => {
        flashProductsContainer.innerHTML += `
            <div class="flash-Cards">
                <div class="flashProduct-image">
                    <span class="flashProduct-badge">${product.badge}</span>
                    <img src="${product.image}" alt="Headphones" loading="lazy" width="250px" height="260px">
                </div>
                    <div class="flashProduct-details">
                    <h3 class="flashProduct-name">${product.name}</h3>
                    <p class="flashProduct-brand">${product.brand}</p>
                    <p class="flashProduct-rating">Ratings: ${product.rating}/5</p>
                    <p class="flashProduct-price">Rs: <ins>${product.price}</ins></p><p class="original-price">Rs: <del>${product.oldPrice}</del></p>
                    <p class="flashProduct-stock">Only 6 Left</p>
                    <button class="flashProduct-button"><i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
                </div>
            </div>
        `;
    });
}
renderFlashProducts();

addEventListener("scroll", () => {
    if(window.scrollY >= 300){
        topButton.classList.add("moveToTop");
    }
    else{
        topButton.classList.remove("moveToTop");
    }
})

topButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    })
})