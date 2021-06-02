var navbarComponentViewController = {
    init: function () {
        var page = dotmin.getPageName();

        var navItemLink = document.querySelector("ul.navbar-nav li a");
        navItemLink.classList.remove("active");
        var navItemLinks = document.querySelectorAll("ul.navbar-nav li a");
        navItemLinks.forEach(element => {
            if (element.getAttribute("href") == page) {
                element.classList.add("active");
            }
        });
    }
}