//Enums
export const buildTargets = {
    DEVEL: "Development",
    PROD: "Production"
};

//App info
export const app = {
    version: "0.8.2021.06130455",
    target: buildTargets.DEVEL,
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

//App configuration
export const config = {
    "folder_services": "js/services/",
    "suffix_services": "-service.js",
    "folder_models": "js/models/",
    "suffix_models": "-model.js",
    "view_model_object": "Model",
    "folder_views": "views/controllers/",
    "suffix_views": "-view-controller.js",
    "folder_controllers": "js/controllers/",
    "suffix_controllers": "-controller.js",
    "view_controller_object": "ViewController",
    "default_route": "default"
};

//Service methods
export function ready(callback) {
    (document.readyState != "loading") ? callback() : document.addEventListener("DOMContentLoaded", callback);
};

export function loadScript(url, callback) {
    fetch(url)
        .then(data => data.text()).then(data => {
            eval(data);
        }).catch(error => {
            console.error(error);
        });
};

export function initRoute(url, callback) {
    this.loadScript(url, callback);
    this.initPageComponents();
};

export function initPageComponents() {
    let c = document.getElementsByClassName("component");
    (c !== null) ? Array.from(c).forEach(element => { this.loadComponent(element.localName); }) : null;
};

export function initComponent(url, callback) {
    this.loadScript(url, callback);
};

export function loadModel(name, callback) {
    this.loadScript(config.folder_models + name + config.suffix_models, callback);
};

export function getRoute() {
    var location = window.location.href.toString();
    var currentRoute = app.routes.find((c) => { return c.name === config.default_route; });

    app.routes.forEach(element => {
        (location.indexOf(element.path) !== -1) ? currentRoute = element : null;
    });

    return currentRoute;
};

export function getPageName() {
    var locations = window.location.href.toString().split("/");
    var name = locations[locations.length - 1];

    if (name.indexOf("?") !== -1) {
        name = name.split("?")[0];
    }

    return name;
};

export function getUrlParameter(name) {
    var parameters = new URLSearchParams(window.location.search);

    return (parameters.has(name) ? parameters.get(name) : null);
};

export function getViewController(name) {
    var n = name.split("-");
    name = n[0];
    n.forEach((element, index) => {
        if (index > 0) {
            name += (element.charAt(0).toUpperCase() + element.slice(1).toLowerCase());
        }
    });

    return name += config.view_controller_object;
};

export function getViewModel(name) {
    var n = name.split("-");
    name = n[0];
    n.forEach((element, index) => {
        if (index > 0) {
            name += (element.charAt(0).toUpperCase() + element.slice(1).toLowerCase());
        }
    });

    return name += config.view_model_object;
};

export function loadComponent(name) {
    var component = app.components.find(function (c) { return c.name == name; });

    fetch("/views/" + component.path + name + ".html")
        .then(data => data.text()).then(data => {
            document.querySelector(name).innerHTML = data;
        }).catch(error => {
            console.error(error);
        });

    this.loadScript(config.folder_views + component.path + name + config.suffix_views, null);
};

export function listen(id, action, response) {
    let elem = document.querySelector(id);
    if (elem !== null) elem.addEventListener(action, response);
};

export function unlisten(id, action, response) {
    let elem = document.querySelector(id);
    if (elem !== null) elem.removeEventListener(action, response);
};

// Check that service workers are registered
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        console.info("registering service worker");
        navigator.serviceWorker.register("/service-worker.min.js");
    });
} else {
    if (window.location.toString().indexOf("http://") !== -1) {
        console.warning("SW error : site served under HTTP - SW requires HTTPS");
    }
}