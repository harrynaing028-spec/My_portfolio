/* =========================================================
   RECENT TRACK PLAYER + USER MUSIC
   ========================================================= */

function playPageSong(song) {
    if (
        window.parent &&
        window.parent !== window &&
        typeof window.parent.playMoodSong === "function"
    ) {
        window.parent.playMoodSong(song, [song], 0);
        return;
    }

    const audio =
        new Audio(
            song.audioSrc ||
            song.fallbackAudioSrc ||
            ""
        );

    audio.play().catch(() => {});
}

function setupTrackButtons() {
    document.querySelectorAll(".track-row").forEach(row => {
        if (row.dataset.playerReady === "true") return;
        row.dataset.playerReady = "true";

        const title =
            row.querySelector(".track-info h4")?.textContent.trim();

        const artist =
            row.querySelector(".track-info p")?.textContent.trim();

        if (!title) return;

        const song = {
            title,
            artist: artist || "Unknown Artist",
            audioSrc:
                typeof getLocalAudioSrc === "function"
                    ? getLocalAudioSrc(title, artist)
                    : "audio/" +
                      title.toLowerCase().replace(/[^a-z0-9]+/g, "-") +
                      ".mp3"
        };

        const button =
            row.querySelector(".track-button");

        if (button) {
            button.addEventListener(
                "click",
                event => {
                    event.preventDefault();
                    event.stopPropagation();
                    playPageSong(song);
                }
            );
        }
    });
}

function setupTopProfileNavigation() {
    document.querySelectorAll(".profile-button").forEach(button => {
        if (button.dataset.profileReady === "true") return;
        button.dataset.profileReady = "true";

        button.addEventListener(
            "click",
            viewProfile
        );
    });
}

function goToDownloadPage() {
    goToAppPage("download.html");
}

function getCurrentMusicStorage() {
    const guest =
        sessionStorage.getItem(GUEST_KEY);

    const registered =
        localStorage.getItem(USER_KEY);

    return guest || !registered
        ? sessionStorage
        : localStorage;
}

function getStoredMusic(key) {
    try {
        return JSON.parse(
            getCurrentMusicStorage().getItem(key)
        ) || [];
    } catch {
        return [];
    }
}

function renderStoredMusic() {
    const historyList =
        document.querySelector(
            "#historyPanel .track-list"
        );

    const favoritePanel =
        document.getElementById(
            "favoritesPanel"
        );

    if (historyList) {
        const history =
            getStoredMusic(HISTORY_KEY);

        if (history.length) {
            historyList.innerHTML = "";

            history.forEach(song => {
                const row =
                    document.createElement("div");

                row.className = "track-row";

                row.innerHTML = `
                    <img
                        class="track-image"
                        src="${song.albumArt || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300"}"
                        alt="${song.title}"
                    >
                    <div class="track-info">
                        <h4>${song.title}</h4>
                        <p>${song.artist || "Unknown Artist"}</p>
                    </div>
                    <div class="track-actions">
                        <button class="track-button" type="button">▶</button>
                    </div>
                `;

                historyList.appendChild(row);
            });
        }
    }

    if (favoritePanel) {
        const favorites =
            getStoredMusic(FAVORITES_KEY);

        const empty =
            favoritePanel.querySelector(
                ".empty-state"
            );

        if (favorites.length) {
            if (empty) {
                empty.style.display = "none";
            }

            let list =
                favoritePanel.querySelector(
                    ".track-list"
                );

            if (!list) {
                list =
                    document.createElement("div");

                list.className =
                    "track-list";

                favoritePanel.appendChild(list);
            }

            list.innerHTML = "";

            favorites.forEach(song => {
                const row =
                    document.createElement("div");

                row.className = "track-row";

                row.innerHTML = `
                    <img
                        class="track-image"
                        src="${song.albumArt || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300"}"
                        alt="${song.title}"
                    >
                    <div class="track-info">
                        <h4>${song.title}</h4>
                        <p>${song.artist || "Unknown Artist"}</p>
                    </div>
                    <div class="track-actions">
                        <button class="track-button" type="button">▶</button>
                    </div>
                `;

                list.appendChild(row);
            });
        }
    }

    setupTrackButtons();
}
