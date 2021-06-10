var pageController = {
    init: function () { 
        //Load model
        //declare an IIFE as the callback to process the model data
        _m.loadModel("default", `(() => {
                defaultModel.greeting += "! :)";
                document.getElementById("slide1_h1").textContent = defaultModel.greeting;
                document.getElementById("slide1_p").textContent = defaultModel.copy;
                document.getElementById("slide1_cta").textContent = defaultModel.cta;
                document.getElementById("slide1_cta").setAttribute("href", defaultModel.ctaLink);
            })();`
        );
        
        //Load components
        _m.loadComponent("navbar-component");
        _m.loadComponent("footer-component");
    }   
};
