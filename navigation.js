/* =========================================================
   PLAYER SHELL NAVIGATION
   ========================================================= */

/*
   Main shell:
       player.html

   Other pages:
       home.html
       mood.html
       you.html
       settings.html

   These pages can work inside player.html
   or directly by themselves.
*/

function goToAppPage(page) {

    if (!page) {
        return;
    }

    /* ==========================================
       PAGE IS INSIDE PLAYER.HTML
       ========================================== */

    if (
        window.parent &&
        window.parent !== window &&
        typeof window.parent.goToPage === "function"
    ) {

        window.parent.goToPage(page);

        return;
    }

    /* ==========================================
       PAGE IS OPENED DIRECTLY
       ========================================== */

    window.location.href = page;
}

/* =========================================================
   HISTORY
   ========================================================= */

function viewHistory() {

    goToAppPage(
        "you.html#history"
    );
}

/* =========================================================
   FAVORITES
   ========================================================= */

function viewFavorites() {

    goToAppPage(
        "download.html#favorites"
    );
}

/* =========================================================
   PROFILE
   ========================================================= */

function viewProfile() {

    goToAppPage(
        "you.html"
    );
}
