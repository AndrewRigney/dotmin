var themePickerComponentViewController = {
    darkMode: document.getElementById("darkMode"),
    darkLabel: "darkModeLabel",
    darkLang = "Dark",
    lightLang = "Light",
    
    init: () => {
        _m.r(() => {
            if (themePickerComponentViewController.darkMode) {
                themePickerComponentViewController.initTheme();
                _m.on("#darkMode", "change", () => {
                    if (themePickerComponentViewController.darkMode.checked) {
                        document.body.setAttribute('data-theme', 'dark');
                        localStorage.setItem('darkMode', 'dark');
                        document.getElementById(themePickerComponentViewController.darkLabel).innerHTML = themePickerComponentViewController.darkLang;
                    } else {
                        document.body.removeAttribute('data-theme');
                        localStorage.removeItem('darkMode');
                        document.getElementById(themePickerComponentViewController.darkLabel).innerHTML = themePickerComponentViewController.lightLang;
                    }
                });
            }
        });
    },
    initTheme: () => {
        var darkThemeSelected = localStorage.getItem('darkMode') !== null && localStorage.getItem('darkMode') === 'dark';
        themePickerComponentViewController.darkMode.checked = darkThemeSelected;
        darkThemeSelected ? document.body.setAttribute('data-theme', 'dark') : document.body.removeAttribute('data-theme');
        darkThemeSelected ? document.getElementById(themePickerComponentViewController.darkLabel).innerHTML = darkLang : document.getElementById(themePickerComponentViewController.darkLabel).innerHTML = themePickerComponentViewController.lightLang;
    }
};
