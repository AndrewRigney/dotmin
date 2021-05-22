var init = function () {
    //Load components
    $.loadComponent("navbar-component");
    $.loadComponent("footer-component");

    //Get home id
    var id = parseInt($.getUrlParameter("id"), 10);
    if (Number.isNaN(id)) {
        console.error("No home id passed in");
        return false;
    }

    //Get home from dataset
    var home = _.findWhere(homes, { id: id });
    if (home === undefined) {
        console.error("No matching home found");
        return false;
    }

    //Bind data to UI
    $("#name").html(home.name + " <small id='tagline'></small>");
    $("#tagline").html(home.tagline);
    home.details.forEach(function (detail) {
        if (detail.display) {
            $("#details").append(
                '<li><i class="icon-ok"></i> ' +
                detail.name +
                " : " +
                detail.value +
                " " +
                detail.unit +
                "</li>"
            );
        }
    });
    $("#overview").html(home.overview);
    $("#at-a-glance").html(home.at_a_glance);
    $(".carousel-inner").append(
        '<div class="active item"><img src="img/' +
        id +
        'elev.jpg" alt="" /></div>'
    );
    $(".carousel-inner").append(
        '<div class="item"><img src="img/' + id + 'plan.jpg" alt="" /></div>'
    );

    var inquire = $("#inquire").attr("href");
    $("#inquire").attr("href", inquire + home.name);

    homes.forEach(function (home) {
        $(".home-thumbnails").append(buildPortfolioThumbnail(home));
    });

    var runtimeDebug = $.getUrlParameter("debug");
    if (runtimeDebug !== undefined) {
        app.debug = (runtimeDebug === "true");
    }

    //Print debug info if enabled
    if (app.debug) {
        console.groupCollapsed("page parameters");
        console.log(id);
        console.log(home);
        console.groupEnd();
    }
};

var buildPortfolioThumbnail = function (home) {
    return '<li class="home-summary span2"><div class="thumbnail"><a href="portfolio-detail.html?id=' +
        home.id +
        '" title="' + home.name + '"><img src="img/' +
        home.id +
        'l.jpg" alt="' + home.name + '"></a><div class="thumbnail-caption">' + home.name + '</div></div></li>';
};
