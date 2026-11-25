/* =========================================================
   STORAGE
   ========================================================= */

const USER_KEY = "moodToMusicUser";
const GUEST_KEY = "moodToMusicGuest";
const THEME_KEY = "moodToMusicTheme";
const HISTORY_KEY = "moodToMusicHistory";
const FAVORITES_KEY = "moodToMusicFavorites";
const DATA_SAVER_KEY = "moodToMusicDataSaver";

/* =========================================================
   USER
   ========================================================= */

function getUser() {

    try {

        const localUser =
            localStorage.getItem(USER_KEY);

        const sessionUser =
            sessionStorage.getItem(USER_KEY);

        const guestUser =
            sessionStorage.getItem(GUEST_KEY);

        return (
            JSON.parse(localUser) ||
            JSON.parse(sessionUser) ||
            JSON.parse(guestUser) ||
            null
        );

    } catch (error) {

        console.error(
            "Could not read user data:",
            error
        );

        return null;
    }
}

/* =========================================================
   SAVE USER
   ========================================================= */

function saveUser(
    user,
    guest = false,
    remember = true
) {

    try {

        if (guest) {

            sessionStorage.setItem(
                GUEST_KEY,
                JSON.stringify(user)
            );

            localStorage.removeItem(
                USER_KEY
            );

            sessionStorage.removeItem(
                USER_KEY
            );

            return;
        }

        /* Registered user */

        sessionStorage.removeItem(
            GUEST_KEY
        );

        if (remember) {

            localStorage.setItem(
                USER_KEY,
                JSON.stringify(user)
            );

            sessionStorage.removeItem(
                USER_KEY
            );

        } else {

            sessionStorage.setItem(
                USER_KEY,
                JSON.stringify(user)
            );

            localStorage.removeItem(
                USER_KEY
            );
        }

    } catch (error) {

        console.error(
            "Could not save user:",
            error
        );

    }
}

/* =========================================================
   INITIALS
   ========================================================= */

function getInitials(name) {

    if (!name) {

        return "G";
    }

    return name
        .trim()
        .split(/\s+/)
        .map(
            word => word.charAt(0)
        )
        .join("")
        .substring(0, 2)
        .toUpperCase();
}

/* =========================================================
   UPDATE USER UI
   ========================================================= */

function setupUserUI() {

    const user =
        getUser() || {

            name: "Guest",

            email: "Guest session",

            guest: true

        };

    const name =
        user.name || "Guest";

    const avatar =
        getInitials(name);

    /* ==========================================
       SIDEBAR NAME
       ========================================== */

    document
        .querySelectorAll("#sideName")
        .forEach(
            element => {

                element.textContent =
                    name;

            }
        );

    /* ==========================================
       SIDEBAR EMAIL
       ========================================== */

    document
        .querySelectorAll("#sideEmail")
        .forEach(
            element => {

                element.textContent =
                    user.guest
                        ? "Session only"
                        : (
                            user.email ||
                            ""
                        );

            }
        );

    /* ==========================================
       AVATAR
       ========================================== */

    document
        .querySelectorAll(
            "#sideAvatar, #topProfile, #profileAvatar"
        )
        .forEach(
            element => {

                element.textContent =
                    avatar;

            }
        );

    /* ==========================================
       HELLO NAME
       ========================================== */

    const helloName =
        document.getElementById(
            "helloName"
        );

    if (helloName) {

        helloName.textContent =
            name;
    }

    /* ==========================================
       PROFILE NAME
       ========================================== */

    const profileName =
        document.getElementById(
            "profileName"
        );

    if (profileName) {

        profileName.textContent =
            user.guest
                ? "Guest User"
                : name;
    }

    /* ==========================================
       PROFILE EMAIL
       ========================================== */

    const profileEmail =
        document.getElementById(
            "profileEmail"
        );

    if (profileEmail) {

        profileEmail.textContent =
            user.guest
                ? "Guest session"
                : (
                    user.email ||
                    ""
                );
    }

    /* ==========================================
       ACCOUNT BADGE
       ========================================== */

    const accountBadge =
        document.getElementById(
            "accountBadge"
        );

    if (accountBadge) {

        accountBadge.textContent =
            user.guest
                ? "GUEST SESSION"
                : "REGISTERED USER";
    }

    /* ==========================================
       ACCOUNT TYPE
       ========================================== */

    const accountType =
        document.getElementById(
            "accountType"
        );

    if (accountType) {

        accountType.textContent =
            user.guest
                ? "Guest"
                : "Registered";
    }

    /* ==========================================
       INFORMATION EMAIL
       ========================================== */

    const infoEmail =
        document.getElementById(
            "infoEmail"
        );

    if (infoEmail) {

        infoEmail.textContent =
            user.guest
                ? "Not signed in"
                : (
                    user.email ||
                    ""
                );
    }

    /* ==========================================
       SETTINGS ACCOUNT
       ========================================== */

    const settingsAccount =
        document.getElementById(
            "settingsAccount"
        );

    if (settingsAccount) {

        settingsAccount.textContent =
            user.guest
                ? "Guest session"
                : (
                    user.email ||
                    ""
                );
    }
}

/* =========================================================
   LOGOUT
   ========================================================= */

function logout() {

    localStorage.removeItem(
        USER_KEY
    );

    sessionStorage.removeItem(
        USER_KEY
    );

    sessionStorage.removeItem(
        GUEST_KEY
    );

    /*
       Stop the global player
       before leaving the app.
    */

    if (
        window.parent &&
        window.parent !== window &&
        typeof window.parent.globalLogout === "function"
    ) {

        window.parent.globalLogout();
    }

    /* Go back to login */

    window.location.href =
        "index.html";
}

/* =========================================================
   LOGIN VALIDATION
   ========================================================= */

function validEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
        .test(email);
}

function validPassword(password) {

    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,15}$/
        .test(password);
}

/* =========================================================
   LOGIN
   ========================================================= */

function initLogin() {

    const form =
        document.getElementById(
            "loginForm"
        );

    if (!form) {

        return;
    }

    const passwordToggle =
        document.getElementById(
            "togglePassword"
        );

    const rememberMe =
        document.getElementById(
            "rememberMe"
        );

    /* ==========================================
       PASSWORD TOGGLE
       ========================================== */

    if (passwordToggle) {

        passwordToggle.addEventListener(
            "click",
            () => {

                const password =
                    document.getElementById(
                        "password"
                    );

                if (!password) {

                    return;
                }

                if (
                    password.type ===
                    "password"
                ) {

                    password.type =
                        "text";

                } else {

                    password.type =
                        "password";
                }

            }
        );
    }

    /* ==========================================
       REMEMBER ME
       ========================================== */

    const savedUser =
        localStorage.getItem(
            USER_KEY
        );

    if (savedUser) {

        try {

            const user =
                JSON.parse(
                    savedUser
                );

            const emailInput =
                document.getElementById(
                    "email"
                );

            if (
                emailInput &&
                user.email
            ) {

                emailInput.value =
                    user.email;
            }

            if (rememberMe) {

                rememberMe.checked =
                    true;
            }

        } catch (error) {

            localStorage.removeItem(
                USER_KEY
            );
        }
    }

    /* ==========================================
       LOGIN SUBMIT
       ========================================== */

    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const emailInput =
                document.getElementById(
                    "email"
                );

            const passwordInput =
                document.getElementById(
                    "password"
                );

            if (
                !emailInput ||
                !passwordInput
            ) {

                return;
            }

            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;

            const emailError =
                document.getElementById(
                    "emailError"
                );

            const passwordError =
                document.getElementById(
                    "passwordError"
                );

            if (emailError) {

                emailError.textContent =
                    "";
            }

            if (passwordError) {

                passwordError.textContent =
                    "";
            }

            let valid = true;

            /* ==================================
               EMAIL
               ================================== */

            if (!validEmail(email)) {

                if (emailError) {

                    emailError.textContent =
                        "Please enter a valid email.";
                }

                valid = false;
            }

            /* ==================================
               PASSWORD
               ================================== */

            if (!validPassword(password)) {

                if (passwordError) {

                    passwordError.textContent =
                        "8–15 characters, including a letter, number and special character.";
                }

                valid = false;
            }

            if (!valid) {

                return;
            }

            /* ==================================
               CREATE USER NAME
               ================================== */

            const name =
                email
                    .split("@")[0]
                    .replace(
                        /[._-]+/g,
                        " "
                    )
                    .replace(
                        /\b\w/g,
                        character =>
                            character.toUpperCase()
                    );

            /* ==================================
               SAVE USER
               ================================== */

            saveUser(
                {
                    name,
                    email,
                    guest: false,
                    loginAt:
                        new Date().toISOString()
                },
                false,
                rememberMe
                    ? rememberMe.checked
                    : false
            );

            /*
               IMPORTANT:
               Login goes to PLAYER.HTML
            */

            window.location.href =
                "player.html";

        }
    );

    /* ==========================================
       GUEST LOGIN
       ========================================== */

    const guestButton =
        document.getElementById(
            "guestBtn"
        );

    if (guestButton) {

        guestButton.addEventListener(
            "click",
            () => {

                saveUser(
                    {
                        name: "Guest",
                        email: "Guest session",
                        guest: true,
                        loginAt:
                            new Date().toISOString()
                    },
                    true
                );

                /*
                   Guest goes to PLAYER.HTML
                */

                window.location.href =
                    "player.html";

            }
        );
    }
}

/* =========================================================
   LOGOUT BUTTONS
   ========================================================= */

function initLogoutButtons() {

    document
        .querySelectorAll(
            "#logoutBtn, #settingsLogout"
        )
        .forEach(
            button => {

                /* Prevent duplicate listeners */

                if (
                    button.dataset.logoutReady ===
                    "true"
                ) {

                    return;
                }

                button.dataset.logoutReady =
                    "true";

                button.addEventListener(
                    "click",
                    logout
                );

            }
        );
}
