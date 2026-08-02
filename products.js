let menuButton = document.getElementById("menu-button");
let navLinks = document.getElementById("nav-links");

menuButton.addEventListener("click", () => navLinks.classList.toggle("show"));

let products =[
    {
        id: 1,
        name: "Sony WH-1000XM5",
        brand: "Sony",
        category: "Electronics",
        price: 49500,
        oldPrice: 59000,
        rating: 4.8,
        reviews: 124,
        badge: "-10%",
        image: "images/sony.webp"
    },
    {
        id: 2,
        name: "Apple Watch Series 10",
        brand: "Apple",
        category: "Electronics",
        price: 120000,
        oldPrice: 122000,
        rating: 4.8,
        reviews: 87,
        badge: "HOT",
        image: "images/watch.webp"
    },
    {
        id: 3,
        name: "Nike Air Force 1",
        brand: "Nike",
        category: "Fashion",
        price: 33000,
        oldPrice: 34000,
        rating: 4.8,
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
        rating: 4.8,
        reviews: 87,
        badge: "NEW",
        image: "images/keyboard.webp"
    },
    {
        id: 5,
        name: "ASUS TUF GAMING F15",
        brand: "Asus",
        category: "Electronics",
        price: 368999,
        oldPrice: 400000,
        rating: 4.9,
        reviews: 87,
        badge: "Trending",
        image: "images/laptop.webp"
    },
    {
        id: 6,
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
        id: 7,
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
        id: 8,
        name: "Odyssey G5",
        brand: "Samsung",
        category: "Electronics",
        price: 86999,
        oldPrice: 80000,
        rating: 4.9,
        reviews: 87,
        badge: "NEW",
        image: "images/samsung-TV.webp"
    }

]