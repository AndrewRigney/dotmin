//dotmin object
var _m = {
    //ready()
    r: (callback) => {
        (document.readyState != "loading") ? callback() : document.addEventListener("DOMContentLoaded", callback);
    },
    
    //load()
    l: (url, callback) => {
        fetch(url)
            .then(data => data.text()).then(data => {
                eval(data);
                eval(callback);
            }).catch(error => {
                console.error(error);
            });
    },
    
    //initRoute()
    ir: (url, callback) => {
        _m.l(url, callback);
    },
    
    //initComponent()
    ic: (url, callback) => {
        _m.l(url, callback);
    },
    
    //loadModel()
    lm: (name, callback) => {
        _m.l(app.config.folder_models + name + app.config.suffix_models, callback);
    },
    
    //getRoute()
    gr: () => {
        var location = window.location.href.toString();
        var currentRoute = app.routes.find((c) => { return c.name === app.config.default_route; });

        app.routes.forEach(element => {
            if (location.indexOf(element.path) !== -1) {
                currentRoute = element;
            }
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
    
    //getUrlParameter()
    gup: (name) => {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");

        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        var results = regex.exec(location.search);

        return results === null
            ? ""
            : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    
    //getViewController()
    gvc: (name) => {
        var n = name.split("-");
        name = n[0];
        n.forEach((element, index) => {
            if (index > 0) {
                name += (element.charAt(0).toUpperCase() + element.slice(1).toLowerCase());
            }
        });

        return name += app.config.view_controller_object;
    },
    
    //getViewModel()
    gvm: (name) => {
        var n = name.split("-");
        name = n[0];
        n.forEach((element, index) => {
            if (index > 0) {
                name += (element.charAt(0).toUpperCase() + element.slice(1).toLowerCase());
            }
        });

        return name += app.config.view_model_object;
    },
    
    //loadComponent()
    lc: (name) => {
        var component = app.components.find(function (c) { return c.name == name; });

        fetch("/views/" + component.path + name + ".html")
            .then(data => data.text()).then(data => {
                document.querySelector(name).innerHTML = data;
            }).catch(error => {
                console.error(error);
            });

            _m.l(app.config.folder_views + component.path + name + app.config.suffix_views, _m.gvc(name) + ".init()");
    },
    
    //add event listener
    on: (id, action, response) => {
        let elem = document.querySelector(id);
        if (elem !== null) elem.addEventListener(action, response);
    },
    
    //remove event listener
    off: (id, action, response) => {
        let elem = document.querySelector(id);
        if (elem !== null) elem.removeEventListener(action, response);
    }
};
