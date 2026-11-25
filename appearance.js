/* =========================================================
   THEME
   ========================================================= */

function initTheme() {

    const saved =
        localStorage.getItem(
            THEME_KEY
        );

    const isLight =
        saved === "light";

    /*
       Keep existing theme system.
    */

    document.body.classList.toggle(
        "light-theme",
        isLight
    );

    const toggle =
        document.getElementById(
            "darkToggle"
        );

    if (toggle) {

        toggle.checked =
            !isLight;
    }
}

/* =========================================================
   SET THEME
   ========================================================= */

function setTheme(isDark) {

    /*
       Existing theme implementation.
    */

    document.body.classList.toggle(
        "light-theme",
        !isDark
    );

    localStorage.setItem(
        THEME_KEY,
        isDark
            ? "dark"
            : "light"
    );
}

/* =========================================================
   MUSIC BACKGROUND
   ========================================================= */

function createMusicBackground() {

    if (
        document.querySelector(
            ".music-background"
        )
    ) {

        return;
    }

    const background =
        document.createElement("div");

    background.className =
        "music-background";

    const notes = [
        "♪",
        "♫",
        "♬",
        "♩",
        "𝄞",
        "♪",
        "♫",
        "♬",
        "♩",
        "♪",
        "♫",
        "♬",
        "𝄢",
        "♪",
        "♫",
        "♩",
        "♬",
        "♪"
    ];

    notes.forEach(
        note => {

            const element =
                document.createElement(
                    "span"
                );

            element.className =
                "music-note";

            element.textContent =
                note;

            element.style.left =
                `${Math.random() * 100}%`;

            element.style.fontSize =
                `${15 + Math.random() * 22}px`;

            element.style.animationDuration =
                `${10 + Math.random() * 12}s, ${3 + Math.random() * 4}s`;

            element.style.animationDelay =
                `${Math.random() * -20}s, ${Math.random() * -5}s`;

            element.style.opacity =
                `${0.15 + Math.random() * 0.30}`;

            background.appendChild(
                element
            );

        }
    );

    document.body.prepend(
        background
    );
}

/* =========================================================
   BACKGROUND GLOW
   ========================================================= */

function createBackgroundGlow() {

    if (
        document.querySelector(
            ".background-glow"
        )
    ) {

        return;
    }

    const glowOne =
        document.createElement("div");

    glowOne.className =
        "background-glow glow-one";

    const glowTwo =
        document.createElement("div");

    glowTwo.className =
        "background-glow glow-two";

    document.body.prepend(
        glowOne
    );

    document.body.prepend(
        glowTwo
    );
}
