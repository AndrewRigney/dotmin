(() => {
    let darkMode = document.getElementById("darkMode");
    let darkLabel = "darkModeLabel";
    let darkLang = "Dark";
    let lightLang = "Light";

    initTheme = () => {
        var darkThemeSelected = localStorage.getItem('darkMode') !== null && localStorage.getItem('darkMode') === 'dark';
        darkMode.checked = darkThemeSelected;
        darkThemeSelected ? document.body.setAttribute('data-theme', 'dark') : document.body.removeAttribute('data-theme');
        darkThemeSelected ? document.getElementById(darkLabel).innerHTML = darkLang : document.getElementById(darkLabel).innerHTML = lightLang;
    };

    _m.r(() => {
        if (darkMode) {
            initTheme();
            _m.on("#darkMode", "change", () => {
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
