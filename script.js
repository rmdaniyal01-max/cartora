let menuButton = document.getElementById("menu-button");
let navLinks = document.getElementById("nav-links");
let topButton = document.getElementById("top-button");

menuButton.addEventListener("click", () => navLinks.classList.toggle("show"))

addEventListener("scroll", () => {
    if(window.scrollY >= 300){
        topButton.classList.add("moveToTop");
        console.log("added")
    }
    else{
        topButton.classList.remove("moveToTop");
        console.log("removed")
    }
})

topButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    })
})