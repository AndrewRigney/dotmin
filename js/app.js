//App info
const app = {
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
    ],
    version: "0.8.2021.07111227",
    target: buildTargets.DEVEL,
};

//App controller
dotmin.ready(() => {
    dotmin.initRoute(config.folder_controllers + dotmin.getRoute().controller + config.suffix_controllers);
    if (app.target === buildTargets.PROD) {
        //noOp
    }
});
