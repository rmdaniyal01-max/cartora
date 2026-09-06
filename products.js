let menuButton = document.getElementById("menu-button");
let navLinks = document.getElementById("nav-links");

menuButton.addEventListener("click", () => navLinks.classList.toggle("show"));
let productList =[];

async function loadProducts() {
    const savedSession = sessionStorage.getItem("cartoraProducts");
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
        stock:product.id,
        description:product.description,
        badge:product.tags
    }));
    localStorage.setItem("productList", JSON.stringify(productList));
    sessionStorage.setItem("cartoraProducts", JSON.stringify(productList));
    renderProducts(productList);
    applyFilters()
    }catch(error){
        alert("Failed to load products",error);
    }
}
loadProducts();
const uniqueCategories = [...new Map(productList.map(item => [item.category, item])).values()];
console.log(uniqueCategories)
localStorage.setItem("categories", JSON.stringify(uniqueCategories));

