var init = function () {
    var page = $.getPageName();

    $("ul.nav li a").removeClass("active");
    var $menuItem = $("ul.nav li").find("a[href*='" + page + "']");
    $menuItem.parent().addClass("active");
};
