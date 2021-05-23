var init = function () {
    var page = $.getPageName();

    $("ul.navbar-nav li a").removeClass("active");
    $("ul.navbar-nav li").find("a[href*='" + page + "']").addClass("active");
};
