
//App depedencies
_m.l("js/vendor/bootstrap.min.js");

//App controller
_m.r(() => {
    _m.ir(config.folder_controllers + _m.gr().controller + config.suffix_controllers);
    if (app.target === buildTargets.PROD) {
        //noOp
    }
});
