let menuButton = document.getElementById("menu-button");
let navLinks = document.getElementById("nav-links");

menuButton.addEventListener("click", () => navLinks.classList.toggle("show"));
document.addEventListener("click", (e) => {
    if (
        !menuButton.contains(e.target)
    ) {
        navLinks.classList.remove("show");
    }
});
let productList =[];

async function loadProducts() {
    const savedSession = localStorage.getItem("savedSession");
    if(savedSession){
        productList = JSON.parse(savedSession);
        return;
    }
    try{
    const response =await fetch("https://dummyJSON.com/products?limit=0");
    const data =await response.json();
    productList = data.products.map(product =>({
        id:product.id,
        name:product.title,
        price:product.price +0.01,
        image:product.thumbnail,
        category:product.category,
        brand:product.brand,
        rating:product.stock,
        stock:product.stock,
        description:product.description,
        badge:product.tags[1] || product.tags[0]
    }));
    sessionStorage.setItem("savedSession", JSON.stringify(productList));
    localStorage.setItem("productList", JSON.stringify(productList));
    renderProducts(productList);
    applyFilters()
    }catch(error){
        alert("Failed to load products",error);
    }
}
loadProducts();

