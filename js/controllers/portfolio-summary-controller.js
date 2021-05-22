var init = function () {
    //Load components
    $.loadComponent("navbar-component");
    $.loadComponent("footer-component");

    homes.forEach(function (home) {
        $(".thumbnails").append(buildThumbnail(home));
    });

    $(".thumbnails").append(buildGalleryThumbnail());
};

var buildThumbnail = function (home) {
    var bedrooms = _.findWhere(home.details, { name: "Bedrooms" }).value;
    var bathrooms = _.findWhere(home.details, { name: "Bathrooms" }).value;
    var cars = _.findWhere(home.details, { name: "Car Spaces" }).value;
    var total = _.findWhere(home.details, { name: "Total" }).value;

    return '<li class="home-summary span4" data-bedrooms="' + bedrooms + '" data-bathrooms="' + bathrooms + '" data-carspaces="' + cars + '" data-total="' + total + '"><div class="thumbnail"><a href="portfolio-detail.html?id=' +
        home.id +
        '"><img src="img/' +
        home.id +
        'm.jpg" alt=""></a><div class="caption"><h3>' +
        home.name +
        '</h3><p><span class="bed">&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="iconvalue">' +
        bedrooms +
        '</span> <span class="bath">&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="iconvalue">' +
        bathrooms +
        '</span> <span class="car">&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="iconvalue">' +
        cars +
        '</span></p><p><a class="" href="portfolio-detail.html?id=' +
        home.id +
        '">View Home Details</a></p></div></div></li>';
};

var buildGalleryThumbnail = function () {
    return '<li class="home-summary span4"><div class="thumbnail"><a href="portfolio-inner-general.html"><img src="img/gm.jpg" alt=""></a><div class="caption"><h3>Gallery</h3><p><br/></p><p><a class="" href="portfolio-inner-general.html">View Gallery</a></p></div></div></li>';
};

var filterBy = function (param, value) {
    var $homes = $(".home-summary");
    if (param === "size") {
        $homes.each(function () {
            $(this).show();
        });

        if (value === "small") {
            $homes.each(function () {
                if (parseFloat($(this).data("total")) >= sizes.SMALL) {
                    $(this).hide();
                }
            });
        }

        if (value === "medium") {
            $homes.each(function () {
                if (parseFloat($(this).data("total")) < sizes.SMALL || parseFloat($(this).data("total")) >= sizes.MEDIUM) {
                    $(this).hide();
                }
            });
        }

        if (value === "large") {
            $homes.each(function () {
                if (parseFloat($(this).data("total")) < sizes.MEDIUM || parseFloat($(this).data("total")) >= sizes.LARGE) {
                    $(this).hide();
                }
            });
        }

        if (value === "commercial") {
            $homes.each(function () {
                if (parseFloat($(this).data("total")) < sizes.LARGE || parseFloat($(this).data("total")) >= sizes.COMMERCIAL) {
                    $(this).hide();
                }
            });
        }
    }
};
