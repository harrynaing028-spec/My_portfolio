/* =====================================================
   MOOD TO MUSIC - GLOBAL APP + GLOBAL MUSIC PLAYER
   ===================================================== */

const pageFrame = document.getElementById("pageFrame");
const globalAudio =
    document.getElementById("globalAudio") || new Audio();

let globalPlaylist = [];
let globalCurrentIndex = 0;
let globalIsPlaying = false;
let currentFallbackAudio = "";

const globalPlayer = document.getElementById("globalPlayer");
const globalTitle = document.getElementById("globalTitle");
const globalArtist = document.getElementById("globalArtist");
const expandedTitle = document.getElementById("expandedTitle");
const expandedArtist = document.getElementById("expandedArtist");
const globalPlayBtn = document.getElementById("globalPlayBtn");
const expandedPlayBtn = document.getElementById("expandedPlayBtn");
const globalSeek = document.getElementById("globalSeek");
const globalCurrentTime = document.getElementById("globalCurrentTime");
const globalDuration = document.getElementById("globalDuration");

const HISTORY_KEY = "moodToMusicHistory";
const FAVORITES_KEY = "moodToMusicFavorites";
const USER_KEY = "moodToMusicUser";
const GUEST_KEY = "moodToMusicGuest";

function openPage(page) {
    if (!page) return;
    if (pageFrame) {
        pageFrame.src = page;
    } else {
        window.location.href = page;
    }
}

function getMusicStorage() {
    const isGuest = !!sessionStorage.getItem(GUEST_KEY);
    const isLocalUser = !!localStorage.getItem(USER_KEY);
    return isGuest || !isLocalUser ? sessionStorage : localStorage;
}

function readMusicList(key) {
    try {
        return JSON.parse(getMusicStorage().getItem(key)) || [];
    } catch {
        return [];
    }
}

function writeMusicList(key, list) {
    try {
        getMusicStorage().setItem(key, JSON.stringify(list));
    } catch (error) {
        console.error("Could not save music data:", error);
    }
}

function rememberHistory(song) {
    if (!song || !song.title) return;

    const list = readMusicList(HISTORY_KEY);
    const clean = {
        title: song.title,
        artist: song.artist || "Unknown Artist",
        albumArt: song.albumArt || ""
    };

    const filtered = list.filter(
        item => !(item.title === clean.title && item.artist === clean.artist)
    );

    filtered.unshift(clean);
    writeMusicList(HISTORY_KEY, filtered.slice(0, 30));
    notifyChildPages("moodToMusic:historyUpdated");
}

function playGlobalSong(song, playlist = [], index = 0) {
    if (!song) return;

    globalPlaylist =
        Array.isArray(playlist) && playlist.length
            ? playlist
            : [song];

    globalCurrentIndex =
        Number.isInteger(index) ? index : 0;

    const localSrc =
        song.localAudioSrc ||
        (typeof getLocalAudioSrc === "function"
            ? getLocalAudioSrc(song.title, song.artist)
            : "");

    currentFallbackAudio =
        song.fallbackAudioSrc ||
        song.audioSrc ||
        "";

    globalTitle.textContent = song.title || "Unknown Song";
    globalArtist.textContent = song.artist || "Unknown Artist";
    expandedTitle.textContent = song.title || "Unknown Song";
    expandedArtist.textContent = song.artist || "Unknown Artist";
    globalPlayer.classList.add("show");

    globalAudio.src =
        song.audioSrc && !/^audio\//i.test(song.audioSrc)
            ? song.audioSrc
            : localSrc || song.audioSrc || "";

    globalAudio.load();

    rememberHistory(song);

    globalAudio.play().catch(() => {
        if (currentFallbackAudio &&
            globalAudio.src !== new URL(currentFallbackAudio, document.baseURI).href) {
            globalAudio.src = currentFallbackAudio;
            globalAudio.load();
            globalAudio.play().catch(() => {
                globalIsPlaying = false;
                updateGlobalPlayButtons();
            });
        } else {
            globalIsPlaying = false;
            updateGlobalPlayButtons();
        }
    });
}

function toggleGlobalPlay() {
    if (!globalAudio.src) return;

    if (globalAudio.paused) {
        globalAudio.play()
            .then(() => {
                globalIsPlaying = true;
                updateGlobalPlayButtons();
            })
            .catch(() => {
                if (currentFallbackAudio) {
                    globalAudio.src = currentFallbackAudio;
                    globalAudio.play().catch(() => {});
                }
            });
    } else {
        globalAudio.pause();
        globalIsPlaying = false;
        updateGlobalPlayButtons();
    }
}

function updateGlobalPlayButtons() {
    const icon = globalAudio.paused ? "▶" : "❚❚";
    if (globalPlayBtn) globalPlayBtn.textContent = icon;
    if (expandedPlayBtn) expandedPlayBtn.textContent = icon;
}

function nextGlobalSong() {
    if (!globalPlaylist.length) return;

    globalCurrentIndex =
        (globalCurrentIndex + 1) % globalPlaylist.length;

    playGlobalSong(
        globalPlaylist[globalCurrentIndex],
        globalPlaylist,
        globalCurrentIndex
    );
}

function previousGlobalSong() {
    if (!globalPlaylist.length) return;

    globalCurrentIndex =
        (globalCurrentIndex - 1 + globalPlaylist.length) %
        globalPlaylist.length;

    playGlobalSong(
        globalPlaylist[globalCurrentIndex],
        globalPlaylist,
        globalCurrentIndex
    );
}

function seekGlobalSong(value) {
    if (!globalAudio.duration || Number.isNaN(globalAudio.duration)) return;
    globalAudio.currentTime =
        (Number(value) / 100) * globalAudio.duration;
}

globalAudio.addEventListener("timeupdate", () => {
    if (!globalAudio.duration) return;

    const progress =
        (globalAudio.currentTime / globalAudio.duration) * 100;

    if (globalSeek) globalSeek.value = progress;
    if (globalCurrentTime) {
        globalCurrentTime.textContent =
            formatGlobalTime(globalAudio.currentTime);
    }

    try {
        if (pageFrame && pageFrame.contentWindow) {
            pageFrame.contentWindow.postMessage(
                {
                    type: "moodToMusic:progress",
                    currentTime: globalAudio.currentTime,
                    duration: globalAudio.duration
                },
                "*"
            );
        }
    } catch {}
});

globalAudio.addEventListener("loadedmetadata", () => {
    if (globalDuration) {
        globalDuration.textContent =
            formatGlobalTime(globalAudio.duration);
    }
});

globalAudio.addEventListener("play", () => {
    globalIsPlaying = true;
    updateGlobalPlayButtons();
    notifyChildPages("moodToMusic:playing");
});

globalAudio.addEventListener("pause", () => {
    globalIsPlaying = false;
    updateGlobalPlayButtons();
    notifyChildPages("moodToMusic:paused");
});

globalAudio.addEventListener("error", () => {
    if (currentFallbackAudio &&
        globalAudio.src !== currentFallbackAudio) {
        globalAudio.src = currentFallbackAudio;
        globalAudio.load();
        globalAudio.play().catch(() => {});
    }
});

globalAudio.addEventListener("ended", () => {
    nextGlobalSong();
});

function formatGlobalTime(seconds) {
    if (!seconds || Number.isNaN(seconds)) return "00:00";

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(secs).padStart(2, "0")
    );
}

function expandGlobalPlayer() {
    if (!globalAudio.src) return;
    globalPlayer.classList.add("expanded");
}

function minimizeGlobalPlayer() {
    globalPlayer.classList.remove("expanded");
}

function notifyChildPages(message) {
    try {
        const frameWindow =
            pageFrame && pageFrame.contentWindow;

        if (frameWindow) {
            frameWindow.postMessage(
                { type: message },
                "*"
            );
        }
    } catch {
        // Ignore frame communication errors.
    }
}

function globalLogout() {
    globalAudio.pause();
    globalAudio.removeAttribute("src");
    globalAudio.load();

    globalPlaylist = [];
    globalCurrentIndex = 0;
    globalIsPlaying = false;

    if (globalPlayer) {
        globalPlayer.classList.remove("show", "expanded");
    }

    updateGlobalPlayButtons();
}

window.playMoodSong = playGlobalSong;
window.playGlobalSong = playGlobalSong;
window.toggleGlobalPlay = toggleGlobalPlay;
window.nextGlobalSong = nextGlobalSong;
window.previousGlobalSong = previousGlobalSong;
window.seekGlobalSong = seekGlobalSong;
window.expandGlobalPlayer = expandGlobalPlayer;
window.minimizeGlobalPlayer = minimizeGlobalPlayer;
window.globalLogout = globalLogout;

window.goToPage = function (page) {
    openPage(page);
};

if (pageFrame) {
    pageFrame.addEventListener("load", () => {
        notifyChildPages("moodToMusic:pageReady");
    });
}
