//Load model
_m.lm().then(() => {
    pageModel.greeting += "! :)";
    document.getElementById("welcomeMessage").innerHTML = pageModel.copy;
});

fetch("https://api.ipify.org/?format=json")
    .then(response => response.json())
    .then(data => {
        document.getElementById("ipAddress").innerHTML = data.ip
    }).catch(error => {
        console.error(error);
    });