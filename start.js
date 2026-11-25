/* =========================================================
   PAGE START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        createMusicBackground();

        createBackgroundGlow();

        initTheme();

        setupUserUI();

        initLogin();

        initModules();

        initTabs();

        initSettings();

        initLogoutButtons();

        setupTrackButtons();
        setupTopProfileNavigation();
        renderStoredMusic();

        openHashTab();

    }
);
