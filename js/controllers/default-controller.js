//Load model
_m.lm().then(() => {
    pageModel.greeting += "! :)";
        document.getElementById("slide1_h1").textContent = pageModel.greeting;
        document.getElementById("slide1_p").innerHTML = pageModel.copy;
        document.getElementById("slide1_cta").textContent = pageModel.cta;
        document.getElementById("slide1_cta").setAttribute("href", pageModel.ctaLink);
});

fetch("https://api.ipify.org/?format=json")
    .then(response => response.json())
    .then(data => {
        document.getElementById("ipAddress").innerHTML = data.ip 
    }).catch(error => {
        console.error(error);
    });