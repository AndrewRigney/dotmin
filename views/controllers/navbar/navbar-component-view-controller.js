var init = function () {
    var page = dotmin.getPageName();

    /*$("ul.navbar-nav li a").removeClass("active");
    $("ul.navbar-nav li").find("a[href*='" + page + "']").addClass("active");*/

    var navItemLink = document.querySelector("ul.navbar-nav li a");
    navItemLink.classList.remove("active");
    var navItemLinks = document.querySelectorAll("ul.navbar-nav li a");
    navItemLinks.forEach(
        function (currentValue) {
            if (currentValue.getAtribute("href") == page) {
                currentValue.classList.add("active");
            }
        },
        'myThisArg'
    );
};
