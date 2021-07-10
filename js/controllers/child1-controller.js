let repeater = document.getElementById("countryCards");

fetch("https://restcountries.eu/rest/v2/all")
    .then(response => response.json())
    .then(data => {
        data.forEach((c) => {
            var node = document.createElement("div");
            node.className = "col";
            node.innerHTML = '<div class="card shadow-sm"><img data-src="' + c.flag + '" class="card-img-top lazy" alt="' + c.name + '"><div class="card-body"><p class="card-text">' + c.name + '</p><div class="d-flex justify-content-between align-items-center"><div class="btn-group"><button type="button" class="btn btn-sm btn-outline-secondary">View</button><button type="button" class="btn btn-sm btn-outline-secondary">Edit</button></div><small class="text-muted">Dynamic API data</small></div></div></div>';
            repeater.appendChild(node);
        });

        dotmin.lazyLoadImages();

    }).catch(error => {
        console.error(error);
    });