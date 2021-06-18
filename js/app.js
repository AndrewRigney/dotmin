import * as Core from "/js/core.min.js";

//App depedencies
Core.loadScript("js/vendor/bootstrap.min.js");

//App controller
Core.ready(() => {
    Core.initRoute(Core.config.folder_controllers + Core.getRoute().controller + Core.config.suffix_controllers, null);
    
    if (Core.app.target === Core.buildTargets.PROD) {
        //noOp
    }
});
