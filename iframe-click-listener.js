// Detects a user click inside an iFrame and pushes a datalayer event
// Contains <script> as required by GTM
// Uses ES5 syntax as required by GTM (ES6+ not supported)
// Add script to Custom HTML tag
// ** Replace iFrame src URL as needed

<script>
window.focus();
// Define the blur event listener
var blurListener = function () {
    // Check if the active element is the specified iframe
    var iframe = document.querySelector('iframe[src*="https://iframe-src-url.com"]');
    if (document.activeElement === iframe) {
        // Push data to the dataLayer
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            map2Interact: true,
            event: 'map2Interact'
        });
    }
    // Remove the blur event listener
    window.removeEventListener('blur', blurListener);
};
// Add the blur event listener to the window
window.addEventListener('blur', blurListener);
</script>
