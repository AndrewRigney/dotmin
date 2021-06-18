(() => {
    let darkMode = document.getElementById("darkMode");
    let darkLabel = "darkModeLabel";
    let darkLang = "Dark";
    let lightLang = "Light";

    let initTheme = () => {
        let darkThemeSelected = localStorage.getItem('darkMode') !== null && localStorage.getItem('darkMode') === 'dark';
        darkMode.checked = darkThemeSelected;
        darkThemeSelected ? document.body.setAttribute('data-theme', 'dark') : document.body.removeAttribute('data-theme');
        darkThemeSelected ? document.getElementById(darkLabel).innerHTML = darkLang : document.getElementById(darkLabel).innerHTML = lightLang;
    };

    this.ready(() => {
        if (darkMode) {
            initTheme();
            this.listen("#darkMode", "change", () => {
                if (darkMode.checked) {
                    document.body.setAttribute('data-theme', 'dark');
                    localStorage.setItem('darkMode', 'dark');
                    document.getElementById(darkLabel).innerHTML = darkLang;
                } else {
                    document.body.removeAttribute('data-theme');
                    localStorage.removeItem('darkMode');
                    document.getElementById(darkLabel).innerHTML = lightLang;
                }
            });
        }
    });
})();
