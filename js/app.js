//Enums
const buildTargets = {
    DEVEL: "Development",
    PROD: "Production"
};

//App info
var app = {
    version: "1.2.2019.031020191530",
    target: buildTargets.DEVEL,
    config: {
        "folder_controllers": "js/controllers/",
        "suffix_controllers": "-controller.min.js",
        "folder_services": "js/services/",
        "suffix_services": "-service.min.js",
        "folder_views": "views/controllers/",
        "suffix_views": "-view-controller.min.js",
        "view_controller_object": "ViewController",
        "default_route": "default"
    },
    routes: [
        { name: "child1", path: "child1.html", controller: "child1" },
        { name: "child2", path: "child2.html", controller: "child12" },
        { name: "index", path: "index.html", controller: "default" },
        { name: "default", path: "index.html", controller: "default" }
    ],
    components: [
        { name: "navbar-component", path: "navbar/" },
        { name: "footer-component", path: "footer/" }
    ]
};

//App depedencies
dotmin.require("js/vendor/bootstrap.min.js");

//App controller
dotmin.ready(() => {
    dotmin.initRoute(app.config.folder_controllers + dotmin.getRoute().controller + app.config.suffix_controllers, "pageController.init()");
    if (app.target === buildTargets.PROD) {
        console.log = function() {};
        console.info = function() {};
    }
});