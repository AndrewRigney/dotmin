(() => {
    //Load model
    //declare an IIFE as the callback to process the model data
    this.loadModel("default", `(() => {
                defaultModel.greeting += "!* :)";
                document.getElementById("slide1_h1").textContent = defaultModel.greeting;
                document.getElementById("slide1_p").textContent = defaultModel.copy;
                document.getElementById("slide1_cta").textContent = defaultModel.cta;
                document.getElementById("slide1_cta").setAttribute("href", defaultModel.ctaLink);
            })();`
    );

    fetch("https://api.ipify.org/?format=json")
        .then(response => response.json())
        .then(data => {
            document.getElementById("slide1_p").innerHTML += "<br/>You're visiting us from " + data.ip + ". Remember, there's no place like 127.0.0.1!";
        }).catch(error => {
            console.error(error);
        });
})();