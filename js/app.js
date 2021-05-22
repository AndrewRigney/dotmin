//App info
var app = {
    version: "1.2.2019.031020191530",
    debug: false,
    config: {
        "folder_controllers": "js/controllers/",
        "suffix_controllers": "-controller.min.js",
        "folder_services": "js/services/",
        "suffix_services": "-service.min.js",
        "folder_views": "views/controllers/",
        "suffix_views": "-view-controller.min.js"
    },
    routes: [
        { name: "portfolio-summary", path: "portfolio.html" },
        { name: "portfolio-detail", path: "portfolio-detail.html" },
        { name: "default", path: "*" }
    ],
    components: [
        { name: "navbar-component", path: "navbar/" },
        { name: "footer-component", path: "footer/" }
    ]
};

//Enums
const buildTargets = {
    DEVEL: "Development",
    PROD: "Production"
};

const sizes = {
    SMALL: 200,
    MEDIUM: 270,
    LARGE: 500,
    COMMERCIAL: 999999
};

//App controller
$(function () {
    $.loadScript(app.config.folder_services + "core" + app.config.suffix_services, function () {
        $.initRoute(app.config.folder_controllers + $.getRoute() + app.config.suffix_controllers, function () {
            init();
        });
    });
});

jQuery.ajax({
    cache: true
});

//Service methods
jQuery.loadScript = function (url, callback) {
    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: true
    });
};
