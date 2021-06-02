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
        "suffix_views": "-view-controller.min.js",
        "view_controller_object": "ViewController",
        "default_route": "default"
    },
    routes: [
        { name: "child1", path: "child1.html" },
        { name: "child2", path: "child2.html" },
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

//App controller
dotmin.ready(() => {
    dotmin.initRoute(app.config.folder_controllers + dotmin.getRoute() + app.config.suffix_controllers, "pageController.init()");
});