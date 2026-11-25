/* =========================================================
   MODULE CARDS
   ========================================================= */

function initModules() {

    document
        .querySelectorAll(
            ".module-card"
        )
        .forEach(
            card => {

                /* Prevent duplicate listeners */

                if (
                    card.dataset.moduleReady ===
                    "true"
                ) {

                    return;
                }

                card.dataset.moduleReady =
                    "true";

                card.addEventListener(
                    "click",
                    event => {

                        const module =
                            card.dataset.module ||
                            "Music";

                        /* ==================================
                           MOOD MODULE
                           ================================== */

                        if (
                            module === "Mood"
                        ) {

                            /*
                               Mood uses its own
                               navigation.
                            */

                            return;
                        }
                         if (
                            module === "Artist"
                        ) {

                            return;
                        }
                        if (
                            module === "Mood Quiz"
                        ) {

                            return;
                        }

                        /* ==================================
                           OTHER MODULES
                           ================================== */

                        event.preventDefault();

                        alert(
                            `${module} module is ready to connect.`
                        );

                    }
                );

            }
        );
}

/* =========================================================
   TABS
   ========================================================= */

function initTabs() {

    const tabs =
        document.querySelectorAll(
            ".tab"
        );

    tabs.forEach(
        tab => {

            /* Prevent duplicate listeners */

            if (
                tab.dataset.tabsReady ===
                "true"
            ) {

                return;
            }

            tab.dataset.tabsReady =
                "true";

            tab.addEventListener(
                "click",
                () => {

                    /* Remove active tab */

                    tabs.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );

                    /* Hide panels */

                    document
                        .querySelectorAll(
                            ".tab-panel"
                        )
                        .forEach(
                            panel => {

                                panel.classList.remove(
                                    "active"
                                );

                            }
                        );

                    /* Activate clicked tab */

                    tab.classList.add(
                        "active"
                    );

                    /* Find target panel */

                    const target =
                        document.getElementById(
                            `${tab.dataset.tab}Panel`
                        );

                    if (target) {

                        target.classList.add(
                            "active"
                        );
                    }

                }
            );

        }
    );
}

/* =========================================================
   HASH TAB
   ========================================================= */

function openHashTab() {

    const hash =
        window.location.hash
            .replace("#", "");

    if (!hash) {

        return;
    }

    const tab =
        document.querySelector(
            `.tab[data-tab="${hash}"]`
        );

    if (tab) {

        tab.click();
    }
}

/* =========================================================
   SETTINGS
   ========================================================= */

function initSettings() {

    /* ==========================================
       DARK MODE
       ========================================== */

    const darkToggle =
        document.getElementById(
            "darkToggle"
        );

    if (darkToggle) {

        darkToggle.addEventListener(
            "change",
            event => {

                setTheme(
                    event.target.checked
                );

            }
        );
    }

    /* ==========================================
       DATA SAVER
       ========================================== */

    const dataSaver =
        document.getElementById(
            "dataSaverToggle"
        );

    if (dataSaver) {

        dataSaver.checked =
            localStorage.getItem(
                DATA_SAVER_KEY
            ) === "true";

        dataSaver.addEventListener(
            "change",
            event => {

                localStorage.setItem(
                    DATA_SAVER_KEY,
                    event.target.checked
                );

            }
        );
    }
}
