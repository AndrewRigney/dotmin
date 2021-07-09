(() => {
    var page = _m.gr();

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

    document.addEventListener("imageClick", (evt) => {
        console.log("custom event handled");
        document.querySelector("#nav_main_002").textContent = "Whoa!";
    });
})();
