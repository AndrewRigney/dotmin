var _m = {
    ready: (callback) => {
        if (document.readyState != "loading") callback();
        else document.addEventListener("DOMContentLoaded", callback);
    },
    require: (url) => {
        _m.loadScript(url, null);
    },
    loadScript: (url, callback) => {
        fetch(url)
            .then(data => data.text()).then(data => {
                eval(data);
                eval(callback);
            }).catch(error => {
                console.error(error);
            });
    },
    initRoute: (url, callback) => {
        _m.loadScript(url, callback);
    },
    initComponent: (url, callback) => {
        _m.loadScript(url, callback);
    },
    loadModel: (name, callback) => {
        _m.loadScript(app.config.folder_models + name + app.config.suffix_models, callback);
    },
    getRoute: () => {
        var location = window.location.href.toString();
        var currentRoute = app.routes.find((c) => { return c.name === app.config.default_route; });

        app.routes.forEach(element => {
            if (location.indexOf(element.path) !== -1) {
                currentRoute = element;
            }
        });

        return currentRoute;
    },
    getPageName: () => {
        var locations = window.location.href.toString().split("/");
        var name = locations[locations.length - 1];

        if (name.indexOf("?") !== -1) {
            name = name.split("?")[0];
        }

        return name;
    },
    getUrlParameter: (name) => {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");

        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        var results = regex.exec(location.search);

        return results === null
            ? ""
            : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    getViewController: (name) => {
        var n = name.split("-");
        name = n[0];
        n.forEach((element, index) => {
            if (index > 0) {
                name += (element.charAt(0).toUpperCase() + element.slice(1).toLowerCase());
            }
        });

        return name += app.config.view_controller_object;
    },
    getViewModel: (name) => {
        var n = name.split("-");
        name = n[0];
        n.forEach((element, index) => {
            if (index > 0) {
                name += (element.charAt(0).toUpperCase() + element.slice(1).toLowerCase());
            }
        });

        return name += app.config.view_model_object;
    },
    loadComponent: (name) => {
        var component = app.components.find(function (c) { return c.name == name; });

        fetch("/views/" + component.path + name + ".html")
            .then(data => data.text()).then(data => {
                document.querySelector(name).innerHTML = data;
            }).catch(error => {
                console.error(error);
            });

            _m.loadScript(app.config.folder_views + component.path + name + app.config.suffix_views, _m.getViewController(name) + ".init()");
    },
    on: (id, action, response) => {
        let elem = document.querySelector(id);
        if (elem !== null) elem.addEventListener(action, response);
    },
    off: (id, action, response) => {
        let elem = document.querySelector(id);
        if (elem !== null) elem.removeEventListener(action, response);
    }
};
