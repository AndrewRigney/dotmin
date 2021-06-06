var pageController = {
    init: function () { 
        //Load model
        //declare an IIFE as the callback to process the model data
        dotmin.loadModel("default", `(() => {
                defaultModel.greeting += "! :)";
                document.getElementById("slide1_h1").textContent = defaultModel.greeting;
                document.getElementById("slide1_p").textContent = defaultModel.copy;
                document.getElementById("slide1_cta").textContent = defaultModel.cta;
                document.getElementById("slide1_cta").setAttribute("href", defaultModel.ctaLink);
            })();`
        );
        
        //Load components
        dotmin.loadComponent("navbar-component");
        dotmin.loadComponent("footer-component");
    }   
};
