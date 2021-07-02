//Load model
_m.lm().then(() => {
    pageModel.greeting += "! :)";
    document.getElementById("welcomeMessage").innerHTML = pageModel.copy;

    _m.lli();

    _m.r(() => {
        var elems = document.querySelectorAll(".carousel-item.lazy");
        if (elems !== null && elems.length > 0) {
            elems.forEach((elem) => {
                var bgImg = elem.getAttribute("data-bg");
                elem.setAttribute("style", "background-image: url('" + bgImg + "')");
                elem.classList.remove("lazy");
            });
        }
    });
});

fetch("https://api.ipify.org/?format=json")
    .then(response => response.json())
    .then(data => {
        document.getElementById("ipAddress").innerHTML = data.ip
    }).catch(error => {
        console.error(error);
    });