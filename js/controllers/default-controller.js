var pageController = {
    init: function () { 
        //Load model
        //declare an IIFE as the callback to process the model data
        _m.lm("default", `(() => {
                defaultModel.greeting += "! :)";
                document.getElementById("slide1_h1").textContent = defaultModel.greeting;
                document.getElementById("slide1_p").textContent = defaultModel.copy;
                document.getElementById("slide1_cta").textContent = defaultModel.cta;
                document.getElementById("slide1_cta").setAttribute("href", defaultModel.ctaLink);
            })();`
        );
        
        //Load components
        _m.lc("navbar-component");
        _m.lc("footer-component");
        _m.lc("theme-picker-component");
    }   
};
