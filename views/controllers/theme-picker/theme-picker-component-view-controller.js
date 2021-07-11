(() => {
    let darkMode = document.querySelector("#darkMode");
    let darkLabel = "darkModeLabel";
    let darkLang = "Dark";
    let lightLang = "Light";

    initTheme = () => {
        var darkThemeSelected = localStorage.getItem('darkMode') !== null && localStorage.getItem('darkMode') === 'dark';
        darkMode.checked = darkThemeSelected;
        darkThemeSelected ? document.body.setAttribute('data-theme', 'dark') : document.body.removeAttribute('data-theme');
        darkThemeSelected ? document.querySelector(darkLabel).innerHTML = darkLang : document.querySelector(darkLabel).innerHTML = lightLang;
    };

    dotmin.ready(() => {
        if (darkMode) {
            initTheme();
            dotmin.on("#darkMode", "change", () => {
                if (darkMode.checked) {
                    document.body.setAttribute('data-theme', 'dark');
                    localStorage.setItem('darkMode', 'dark');
                    document.querySelector(darkLabel).innerHTML = darkLang;
                } else {
                    document.body.removeAttribute('data-theme');
                    localStorage.removeItem('darkMode');
                    document.querySelector(darkLabel).innerHTML = lightLang;
                }
            });
        }
    });
})();
