//Enums
const buildTargets = {
    DEVEL: "Development",
    PROD: "Production"
};

//App info
const app = {
    version: "0.8.2021.06130455",
    target: buildTargets.DEVEL,
    config: {
        "folder_services": "js/services/",
        "suffix_services": "-service.min.js",
        "folder_models": "js/models/",
        "suffix_models": "-model.min.js",
        "view_model_object": "Model",
        "folder_views": "views/controllers/",
        "suffix_views": "-view-controller.min.js",
        "folder_controllers": "js/controllers/",
        "suffix_controllers": "-controller.min.js",
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
        { name: "footer-component", path: "footer/" },
        { name: "theme-picker-component", path: "theme-picker/" }
    ]
};

//App depedencies
_m.l("js/vendor/bootstrap.min.js");

//App controller
_m.r(() => {
    _m.ir(app.config.folder_controllers + _m.gr().controller + app.config.suffix_controllers, "pageController.init()");
    if (app.target === buildTargets.PROD) {
        //noOp
    }
});
