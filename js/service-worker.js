// Check that service workers are registered
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.min.js");
    });
} else {
    if (window.location.toString().indexOf("http://") !== -1) {
        console.log("SW error : site served under HTTP - SW requires HTTPS");
    }
}