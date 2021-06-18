(() => {
    var page = this.getRoute();

    var navItemLink = document.querySelector("ul.navbar-nav li a");
    if (navItemLink !== null) {
        navItemLink.classList.remove("active");
    }

    var navItemLinks = document.querySelectorAll("ul.navbar-nav li a");
    if (navItemLinks !== null) {
        navItemLinks.forEach(element => {
            if (element.getAttribute("href") == page.path) {
                element.classList.add("active");
            }
        });
    }
})();
