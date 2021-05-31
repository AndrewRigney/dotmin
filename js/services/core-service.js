var dotmin = {
    ready = (callback) => {
        if (document.readyState != "loading") callback();
        else document.addEventListener("DOMContentLoaded", callback);
    },
    loadScript = function (url, callback) {
        fetch(url)
            .then(data => {
                init();
            }).catch(error => {
                // Handle error
                alert("Error loading script");
                console.error(error);
            });
    },
    initRoute = function (url, callback) {
        this.loadScript(url, callback);
    },
    initComponent = function (url, callback) {
        this.loadScript(url, callback);
    },
    getRoute = function () {
        var location = window.location.href.toString();
        var currentRoute = "default";

        for (var i = 0; i < app.routes.length; i++) {
            var route = app.routes[i];
            if (location.indexOf(route.path) !== -1) {
                currentRoute = route.name;
                break;
            }
        }

        return currentRoute;
    },
    getPageName = function () {
        var locations = window.location.href.toString().split("/");
        var name = locations[locations.length - 1];

        if (name.indexOf("?") !== -1) {
            name = name.split("?")[0];
        }

        return name;
    },
    getUrlParameter = function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");

        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        var results = regex.exec(location.search);

        return results === null
            ? ""
            : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    loadComponent = function (name) {
        var component = _.findWhere(app.components, { name: name });

        fetch("/views/" + component.path + name + ".html")
            .then(data => data.text()).then(data => {
                document.querySelector(name).innerHTML = data;
            }).catch(error => {
                // Handle error
            });
    }
};
