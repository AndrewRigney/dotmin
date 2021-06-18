//Load model
fetch(config.folder_models + _m.gr().name + config.suffix_models)
    .then(data => data.text()).then(data => {
        eval(data);
        pageModel.greeting += "! :)";
        document.getElementById("slide1_h1").textContent = pageModel.greeting;
        document.getElementById("slide1_p").textContent = pageModel.copy;
        document.getElementById("slide1_cta").textContent = pageModel.cta;
        document.getElementById("slide1_cta").setAttribute("href", pageModel.ctaLink);
    }).catch(error => {
        console.error(error);
    });

fetch("https://api.ipify.org/?format=json")
    .then(response => response.json())
    .then(data => {
        document.getElementById("slide1_p").innerHTML += "<br/>You're visiting us from " + data.ip + ". Remember, there's no place like 127.0.0.1!";
    }).catch(error => {
        console.error(error);
    });