/* =====================================================
   ABOUT PAGE JAVASCRIPT
===================================================== */

// Automatically display current year

document.getElementById("year").textContent =
    new Date().getFullYear();


// Back button

function goBack() {

    /*
     * If the page was opened from another page,
     * return to that page.
     */

    if (window.history.length > 1) {

        window.history.back();

    } else {

        /*
         * Safe fallback if About page was opened directly.
         */

        window.location.href = "settings.html";

    }

}
