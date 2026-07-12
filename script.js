let menuButton = document.getElementById("menu-button");
let navLinks = document.getElementById("nav-links");

menuButton.addEventListener("click", function(){
    navLinks.classList.toggle("show")
})
