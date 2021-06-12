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
                eval(callback);
            }).catch(error => {
                console.error(error);
            });
    },
    
    //initRoute(string: url, function: callback)
    ir: (url, callback) => {
        _m.l(url, callback);
        _m.ipc();
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
    
    //loadModel(string: name, function: callback)
    lm: (name, callback) => {
        _m.l(app.config.folder_models + name + app.config.suffix_models, callback);
    },
    
    //getRoute()
    gr: () => {
        var location = window.location.href.toString();
        var currentRoute = app.routes.find((c) => { return c.name === app.config.default_route; });

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
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");

        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        var results = regex.exec(location.search);

        return results === null
            ? ""
            : decodeURIComponent(results[1].replace(/\+/g, " "));
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

        return name += app.config.view_controller_object;
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

        return name += app.config.view_model_object;
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

            _m.l(app.config.folder_views + component.path + name + app.config.suffix_views, _m.gvc(name) + ".init()");
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
