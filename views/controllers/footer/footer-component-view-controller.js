var footerComponentViewController = {
    init: () => {
        _m.ready( function() {
            _m.on("#trg", "click", function (e) {
                console.info("_m - miniscule JavaScript app framework! Brought to you by The Rigney Group");
                var toastElList = [].slice.call(document.querySelectorAll('.toast'))
                var toastList = toastElList.map((toastEl) => {
                    return new bootstrap.Toast(toastEl);
                });
                toastList.forEach(toast => toast.show());
                console.log(toastList);
            });
        });        
    }
};