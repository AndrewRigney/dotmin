//Enums
const buildTargets = {
    DEVEL: "Development",
    PROD: "Production"
};

const config = {
    "folderdotminodels": "js/models/",
    "suffixdotminodels": "-model.min.js",
    "viewdotminodel_object": "Model",
    "folder_views": "views/controllers/",
    "suffix_views": "-view-controller.min.js",
    "folder_controllers": "js/controllers/",
    "suffix_controllers": "-controller.min.js",
    "view_controller_object": "ViewController",
    "default_route": "default"
};

//dotmin object
const dotmin = {
    //ready(function: callback)
    ready: (callback) => {
        (document.readyState != "loading") ? callback() : document.addEventListener("DOMContentLoaded", callback);
    },

    //load(string: url, function: callback)
    load: (url, callback) => {
        fetch(url)
            .then(data => data.text()).then(data => {
                eval(data);
                (typeof (callback) !== undefined && callback !== null) ? eval(callback) : null;
            }).catch(error => {
                console.error(error);
            });
    },

    //loadModel(string: url)
    loadModel: () => {
        var url = config.folderdotminodels + dotmin.gr().name + config.suffixdotminodels;
        return new Promise((resolve, reject) => {
            let s = document.createElement("script");
            s.onload = () => { resolve(); };
            s.onerror = (e) => { reject(e); };
            s.src = url;
            document.head.append(s);
        });
    },

    //initRoute(string: url, function: callback)
    initRoute: (url, callback) => {
        dotmin.load(url, callback);
        dotmin.initPageComponents();
    },

    //loadComponent(string: name)
    loadComponent: (name) => {
        var component = app.components.find(function (c) { return c.name == name; });

        fetch("/views/" + component.path + name + ".html")
            .then(data => data.text()).then(data => {
                document.querySelector(name).innerHTML = data;
            }).catch(error => {
                console.error(error);
            });

        dotmin.load(config.folder_views + component.path + name + config.suffix_views);
    },

    //initPageComponents
    initPageComponents: () => {
        let c = document.getElementsByClassName("component");
        (c !== null) ? Array.from(c).forEach(element => { dotmin.lc(element.localName); }) : null;
    },

    //initComponent(string: url, function: callback)
    initComponent: (url, callback) => {
        dotmin.load(url, callback);
    },

    //getRoute()
    getRoute: () => {
        var location = window.location.href.toString();
        var currentRoute = app.routes.find((c) => { return c.name === config.default_route; });

        app.routes.forEach(element => {
            (location.indexOf(element.path) !== -1) ? currentRoute = element : null;
        });

        return currentRoute;
    },

    //getPageName()
    getPageName: () => {
        var locations = window.location.href.toString().split("/");
        var name = locations[locations.length - 1];

        if (name.indexOf("?") !== -1) {
            name = name.split("?")[0];
        }

        return name;
    },

    //getUrlParameter(string: name)
    getUrlParameter: (name) => {
        var parameters = new URLSearchParams(window.location.search);

        return (parameters.has(name) ? parameters.get(name) : null);
    },

    //getViewController(string: name)
    getViewController: (name) => {
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
    getViewModel: (name) => {
        var n = name.split("-");
        name = n[0];
        n.forEach((element, index) => {
            if (index > 0) {
                name += (element.charAt(0).toUpperCase() + element.slice(1).toLowerCase());
            }
        });

        return name += config.viewdotminodel_object;
    },

    //dispatchEvent(string: name, object: details)
    dispatchEvent: (name, details) => {
        document.dispatchEvent(new CustomEvent(name, { detail: details }));
    },

    //listenToEvent(string: name, function: callback)
    listenToEvent: (name, callback) => {
        document.addEventListener(name, (evt) => {
            callback(evt);
        })
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
    },

    //lazy load images with the IntersectionObserver
    //add class 'lazy' to an img element
    lazyLoadImages: () => {
        const targets = document.querySelectorAll("img.lazy");

        if (!!window.IntersectionObserver) {
            const lazyLoad = (target) => {
                const io = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            const src = img.getAttribute("data-src");
                            img.setAttribute("src", src);
                            observer.disconnect();
                        }
                    })
                }, { threshold: 0.33 });

                io.observe(target);
            }
            targets.forEach(lazyLoad);
        } else {
            targets.forEach(function (target) {
                const src = target.getAttribute("data-src");
                target.setAttribute("src", src);
            });
        }
    },

    //lazy load block elements with the IntersectionObserver
    //add class 'lazy-trigger' to an element
    //add data-lazytriggerfor attribute to an element
    //when the trigger element is scrolled in to view, the target
    //element is then loaded
    lazyLoadElement: () => {
        const targets = document.querySelectorAll(".lazy-trigger");

        if (!!window.IntersectionObserver) {
            const io = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        document.querySelector("#" + entry.target.dataset.lazytriggerfor).style.display = "block";
                    }
                });
            }, { threshold: 0.5 });
            targets.forEach(target => {
                io.observe(target);
            });
        } else {
            targets.forEach(function (target) {
                document.querySelector("#" + target.dataset.lazytriggerfor).style.display = "block";
            });
        }
    }
};
