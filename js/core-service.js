//Enums
const buildTargets = {
    DEVEL: "Development",
    PROD: "Production"
};

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
    version: "0.8.2021.06191044",
    target: buildTargets.DEVEL,
};

const config = {
    "folder_models": "js/models/",
    "suffix_models": "-model.min.js",
    "view_model_object": "Model",
    "folder_views": "views/controllers/",
    "suffix_views": "-view-controller.min.js",
    "folder_controllers": "js/controllers/",
    "suffix_controllers": "-controller.min.js",
    "view_controller_object": "ViewController",
    "default_route": "default"
};

//dotmin object
const _m = {
    //ready(function: callback)
    r: (callback) => {
        (document.readyState != "loading") ? callback() : document.addEventListener("DOMContentLoaded", callback);
    },

    //load(string: url, function: callback)
    l: (url, callback) => {
        fetch(url)
            .then(data => data.text()).then(data => {
                eval(data);
                (typeof (callback) !== undefined && callback !== null) ? eval(callback) : null;
            }).catch(error => {
                console.error(error);
            });
    },

    //initRoute(string: url, function: callback)
    ir: (url, callback) => {
        _m.l(url, callback);
        _m.ipc();
    },

    //loadComponent(string: name)
    lc: (name) => {
        var component = app.components.find(function (c) { return c.name == name; });

        fetch("/views/" + component.path + name + ".html")
            .then(data => data.text()).then(data => {
                document.querySelector(name).innerHTML = data;
            }).catch(error => {
                console.error(error);
            });

        _m.l(config.folder_views + component.path + name + config.suffix_views);
    },

    //initPageComponents
    ipc: () => {
        let c = document.getElementsByClassName("component");
        (c !== null) ? Array.from(c).forEach(element => { _m.lc(element.localName); }) : null;
    },

    //initComponent(string: url, function: callback)
    ic: (url, callback) => {
        _m.l(url, callback);
    },

    //getRoute()
    gr: () => {
        var location = window.location.href.toString();
        var currentRoute = app.routes.find((c) => { return c.name === config.default_route; });

        app.routes.forEach(element => {
            (location.indexOf(element.path) !== -1) ? currentRoute = element : null;
        });

        return currentRoute;
    },

    //getPageName()
    gpn: () => {
        var locations = window.location.href.toString().split("/");
        var name = locations[locations.length - 1];

        if (name.indexOf("?") !== -1) {
            name = name.split("?")[0];
        }

        return name;
    },

    //getUrlParameter(string: name)
    gup: (name) => {
        var parameters = new URLSearchParams(window.location.search);

        return (parameters.has(name) ? parameters.get(name) : null);
    },

    //getViewController(string: name)
    gvc: (name) => {
        var n = name.split("-");
        name = n[0];
        n.forEach((element, index) => {
            if (index > 0) {
                name += (element.charAt(0).toUpperCase() + element.slice(1).toLowerCase());
            }
        });

        return name += config.view_controller_object;
    },

    //getViewModel(string: name)
    gvm: (name) => {
        var n = name.split("-");
        name = n[0];
        n.forEach((element, index) => {
            if (index > 0) {
                name += (element.charAt(0).toUpperCase() + element.slice(1).toLowerCase());
            }
        });

        return name += config.view_model_object;
    },

    //add event listener
    //on (string: id, string: action, function: response)
    on: (id, action, response) => {
        let elem = document.querySelector(id);
        if (elem !== null) elem.addEventListener(action, response);
    },

    //remove event listener
    //off (string: id, string: action, function: response)
    off: (id, action, response) => {
        let elem = document.querySelector(id);
        if (elem !== null) elem.removeEventListener(action, response);
    }
};
