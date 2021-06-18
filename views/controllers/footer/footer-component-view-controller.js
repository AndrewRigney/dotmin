(() => {
    this.ready(() => {
        this.listen("#trg", "click", () => {
            var toastElList = [].slice.call(document.querySelectorAll('.toast'))
            var toastList = toastElList.map((toastEl) => {
                return new bootstrap.Toast(toastEl);
            });
            toastList.forEach(toast => toast.show());
        });
    });
})();
