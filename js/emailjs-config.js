const EMAILJS_CONFIG = {
    PUBLIC_KEY: "YOUR_PUBLIC_KEY",
    SERVICE_ID: "YOUR_SERVICE_ID",
    TEMPLATE_ID: "YOUR_TEMPLATE_ID",
};

// Export untuk digunakan di script.js
if (typeof module !== "undefined" && module.exports) {
    module.exports = EMAILJS_CONFIG;
}
