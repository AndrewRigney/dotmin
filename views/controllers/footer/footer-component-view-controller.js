var footerComponentViewController = {
    init: function () {
        dotmin.ready( function() {
            dotmin.on("#trg", "click", function (e) {
                console.info("dotmin - miniscule JavaScript app framework! Brought to you by The Rigney Group");
                var toastElList = [].slice.call(document.querySelectorAll('.toast'))
                var toastList = toastElList.map(function (toastEl) {
                    return new bootstrap.Toast(toastEl);
                });
                toastList.forEach(toast => toast.show());
                console.log(toastList);
            });
        });        
    }
};