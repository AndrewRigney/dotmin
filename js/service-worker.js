// Check that service workers are registered
if ("serviceWorker" in navigator) {
    console.log("service worker in navigator");
    // Use the window load event to keep the page load performant
    window.addEventListener("load", () => {
        console.log("registering service worker");
        navigator.serviceWorker.register("/service-worker.min.js");
    });
} else {
    console.log("service worker NOT in navigator");
    if (window.location.toString().indexOf("http://") !== -1) {
        console.log("SW error : site served under HTTP - SW requires HTTPS");
    }
}