var dotmin = {
    ready: (callback) => {
        if (document.readyState != "loading") callback();
        else document.addEventListener("DOMContentLoaded", callback);
    },
    loadScript: function (url, callback) {
        fetch(url)
            .then(data => data.text()).then(data => {
                eval(data);
                eval(callback);
            }).catch(error => {
                console.error(error);
            });
    },
    initRoute: function (url, callback) {
        this.loadScript(url, callback);
    },
    initComponent: function (url, callback) {
        this.loadScript(url, callback);
    },
    getRoute: function () {
        var location = window.location.href.toString();
        var currentRoute = app.config.default_route;

        app.routes.forEach(element => {
            if (location.indexOf(element.path) !== -1) {
                currentRoute = element.name;
            }
        });

        return currentRoute;
    },
    getPageName: function () {
        var locations = window.location.href.toString().split("/");
        var name = locations[locations.length - 1];

        if (name.indexOf("?") !== -1) {
            name = name.split("?")[0];
        }

        return name;
    },
    getUrlParameter: function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");

        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        var results = regex.exec(location.search);

        return results === null
            ? ""
            : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    getViewController: function (name) {
        var n = name.split("-");
        name = n[0];
        n.forEach((element, index) => {
            if (index > 0) {
                name += (element.charAt(0).toUpperCase() + element.slice(1).toLowerCase());
            }
        });

        return name += app.config.view_controller_object;
    },
    loadComponent: function (name) {
        var component = _.findWhere(app.components, { name: name });

        fetch("/views/" + component.path + name + ".html")
            .then(data => data.text()).then(data => {
                document.querySelector(name).innerHTML = data;
            }).catch(error => {
                console.error(error);
            });

        this.loadScript(app.config.folder_views + component.path + name + app.config.suffix_views, this.getViewController(name) + ".init()");
    }
};
