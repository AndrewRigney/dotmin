var updateUI = function() {
    defaultModel.greeting += "!";
    document.getElementById("slide1_h1").textContent = defaultModel.greeting;
};

var pageController = {
    init: function () { 
        //Load model
        //dotmin.loadModel("default", "updateUI()");
        
        //Load components
        dotmin.loadComponent("navbar-component");
        dotmin.loadComponent("footer-component");
    }   
};

