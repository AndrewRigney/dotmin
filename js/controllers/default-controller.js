//Load model
dotmin.lm().then(() => {
    pageModel.greeting += "! :)";
    document.getElementById("welcomeMessage").innerHTML = pageModel.copy;

    dotmin.lazyLoadImages();

    dotmin.ready(() => {
        var elems = document.querySelectorAll(".carousel-item.lazy");
        if (elems !== null && elems.length > 0) {
            elems.forEach((elem) => {
                var bgImg = elem.getAttribute("data-bg");
                elem.setAttribute("style", "background-image: url('" + bgImg + "')");
                elem.classList.remove("lazy");
            });
        }
    });
    
    dotmin.on("#f_img_001", "click", () => {
        dotmin.dispatchEvent("imageClick", { "state":true });
    });

    dotmin.listenToEvent("imageClick", (evt) => {
        document.querySelector("#f_001 h2 span.text-muted").innerHTML = `...Mind blown? ${evt.detail.state}...!!`;
    });

    dotmin.listenToEvent("imageClick", () => {
        document.querySelector("#f_001 p.lead").innerHTML = "This was updated via custom events and handlers, set up within the page controller. In a real app, this can broadcast across components. See how the menu changed?";
    });
});

fetch("https://api.ipify.org/?format=json")
    .then(response => response.json())
    .then(data => {
        document.getElementById("ipAddress").innerHTML = data.ip
    }).catch(error => {
        console.error(error);
    });

