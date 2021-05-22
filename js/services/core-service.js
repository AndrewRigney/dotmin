jQuery.initRoute = function (url, callback) {
    $.loadScript(url, callback);
};

jQuery.initComponent = function (url, callback) {
    $.loadScript(url, callback);
};

jQuery.getRoute = function () {
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
};

jQuery.getPageName = function () {
    var locations = window.location.href.toString().split("/");
    var name = locations[locations.length - 1];

    if (name.indexOf("?") !== -1) {
        name = name.split("?")[0];
    }

    return name;
};

jQuery.getUrlParameter = function (name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");

    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(location.search);

    return results === null
        ? ""
        : decodeURIComponent(results[1].replace(/\+/g, " "));
};

jQuery.loadComponent = function (name) {
    var component = _.findWhere(app.components, { name: name });
    
    $.get("/views/" + component.path + name + ".html", function (response) {
        $(name).replaceWith(response);
        $.initComponent(app.config.folder_views + component.path + name + app.config.suffix_views, function () {
            init();
        });
    });
};
