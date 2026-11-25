// =========================================================
// ARTIST PAGE - MUSIC CONTROL
// =========================================================

let tracks = [];
let currentTrackIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

let audioPlayer, playPauseBtn, prevBtn, nextBtn, progressBar, progressFill, progressThumb;
let currentTimeEl, totalTimeEl, playerTrackName, playerTrackArtist, playerAlbumArt;
let volumeSlider, volumeBtn, shuffleBtn, repeatBtn, playlistItems;

const fallbackStreams = artistProfile.audioFallbacks || window.audioFallbacks || [
    "audio/babyJustin.mp3",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
];

function init() {
    audioPlayer = document.getElementById("audioPlayer");
    playPauseBtn = document.getElementById("playPauseBtn");
    prevBtn = document.getElementById("prevBtn");
    nextBtn = document.getElementById("nextBtn");
    progressBar = document.getElementById("progressBar");
    progressFill = document.getElementById("progressFill");
    progressThumb = document.getElementById("progressThumb");
    currentTimeEl = document.getElementById("currentTime");
    totalTimeEl = document.getElementById("totalTime");
    playerTrackName = document.getElementById("playerTrackName");
    playerTrackArtist = document.getElementById("playerTrackArtist");
    playerAlbumArt = document.getElementById("playerAlbumArt");
    volumeSlider = document.getElementById("volumeSlider");
    volumeBtn = document.getElementById("volumeBtn");
    shuffleBtn = document.getElementById("shuffleBtn");
    repeatBtn = document.getElementById("repeatBtn");
    playlistItems = document.querySelectorAll(".playlist-item");

    parsePlaylistFromDOM();

    if (tracks.length) {
        loadTrack(0);
    }

    if (audioPlayer) {
        audioPlayer.volume = 0.75;
        audioPlayer.preload = "metadata";
    }

    setupEventListeners();
}

function parsePlaylistFromDOM() {
    tracks = [];

    playlistItems.forEach((item, index) => {
        const titleEl = item.querySelector(".playlist-title");
        const artistEl = item.querySelector(".playlist-artist");
        const imgEl = item.querySelector(".playlist-thumb img");

        const title =
            titleEl ? titleEl.textContent.trim() : `Track ${index + 1}`;

        const artist =
            artistEl ? artistEl.textContent.trim() : "Artist";

        const localAudioSrc =
            typeof getLocalAudioSrc === "function"
                ? getLocalAudioSrc(title, artist)
                : `audio/${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.mp3`;

        tracks.push({
            title,
            artist,
            albumArt: imgEl ? imgEl.src : "",
            audioSrc: localAudioSrc,
            fallbackAudioSrc:
                fallbackStreams[index % fallbackStreams.length]
        });
    });
}

function embeddedInPlayerShell() {
    return (
        window.parent &&
        window.parent !== window &&
        typeof window.parent.playMoodSong === "function"
    );
}

function loadTrack(index) {
    if (index < 0 || index >= tracks.length) return;

    currentTrackIndex = index;
    const track = tracks[index];

    if (playerTrackName) {
        playerTrackName.textContent = track.title;
    }

    if (playerTrackArtist) {
        playerTrackArtist.textContent = track.artist;
    }

    if (playerAlbumArt && track.albumArt) {
        playerAlbumArt.src = track.albumArt;
    }

    playlistItems.forEach((item, i) => {
        item.classList.toggle("active", i === index);
    });

    if (audioPlayer) {
        audioPlayer.src = track.audioSrc;
        audioPlayer.load();
    }
}

function playTrack(index) {
    if (index < 0 || index >= tracks.length) return;

    currentTrackIndex = index;
    const track = tracks[index];

    loadTrack(index);

    if (embeddedInPlayerShell()) {
        /* Use the one global player in player.html. */
        window.parent.playMoodSong(
            track,
            tracks,
            index
        );
        isPlaying = true;
        if (playPauseBtn) {
            playPauseBtn.textContent = "⏸";
        }
        return;
    }

    if (!audioPlayer) return;

    audioPlayer.play()
        .then(() => {
            isPlaying = true;
            if (playPauseBtn) playPauseBtn.textContent = "⏸";
        })
        .catch(() => {
            audioPlayer.src =
                track.fallbackAudioSrc;

            audioPlayer.load();

            audioPlayer.play().catch(() => {
                isPlaying = false;
                if (playPauseBtn) {
                    playPauseBtn.textContent = "▶";
                }
            });
        });
}

function togglePlayPause() {
    if (!tracks.length) return;

    if (
        embeddedInPlayerShell() &&
        typeof window.parent.toggleGlobalPlay === "function"
    ) {
        window.parent.toggleGlobalPlay();
        return;
    }

    if (audioPlayer.paused) {
        audioPlayer.play()
            .then(() => {
                isPlaying = true;
                if (playPauseBtn) playPauseBtn.textContent = "⏸";
            })
            .catch(() => {
                const track = tracks[currentTrackIndex];
                if (!track) return;

                audioPlayer.src = track.fallbackAudioSrc;
                audioPlayer.play().catch(() => {});
            });
    } else {
        audioPlayer.pause();
        isPlaying = false;
        if (playPauseBtn) playPauseBtn.textContent = "▶";
    }
}

function nextTrack() {
    if (!tracks.length) return;

    currentTrackIndex = isShuffle
        ? Math.floor(Math.random() * tracks.length)
        : (currentTrackIndex + 1) % tracks.length;

    playTrack(currentTrackIndex);
}

function prevTrack() {
    if (!tracks.length) return;

    if (audioPlayer && audioPlayer.currentTime > 3) {
        audioPlayer.currentTime = 0;
        return;
    }

    currentTrackIndex =
        (currentTrackIndex - 1 + tracks.length) % tracks.length;

    playTrack(currentTrackIndex);
}

function formatTime(seconds) {
    if (!seconds || Number.isNaN(seconds)) return "00:00";

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return (
        String(mins).padStart(2, "0") +
        ":" +
        String(secs).padStart(2, "0")
    );
}

function updateProgress() {
    if (!audioPlayer || !audioPlayer.duration) return;

    const progress =
        (audioPlayer.currentTime / audioPlayer.duration) * 100;

    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }

    if (progressThumb) {
        progressThumb.style.left = `${progress}%`;
    }

    if (currentTimeEl) {
        currentTimeEl.textContent =
            formatTime(audioPlayer.currentTime);
    }
}

function seek(e) {
    if (!audioPlayer || !progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;

    if (audioPlayer.duration) {
        audioPlayer.currentTime =
            pos * audioPlayer.duration;
    }
}

function updateVolumeIcon() {
    if (!audioPlayer || !volumeBtn) return;

    volumeBtn.textContent =
        audioPlayer.volume === 0
            ? "🔇"
            : audioPlayer.volume < 0.5
                ? "🔉"
                : "🔊";
}

function setupEventListeners() {
    if (playPauseBtn) {
        playPauseBtn.addEventListener("click", togglePlayPause);
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", nextTrack);
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", prevTrack);
    }

    if (progressBar) {
        progressBar.addEventListener("click", seek);
    }

    if (audioPlayer) {
        audioPlayer.addEventListener("timeupdate", updateProgress);

        audioPlayer.addEventListener("loadedmetadata", () => {
            if (totalTimeEl) {
                totalTimeEl.textContent =
                    formatTime(audioPlayer.duration);
            }
        });

        audioPlayer.addEventListener("ended", () => {
            if (isRepeat) {
                audioPlayer.currentTime = 0;
                audioPlayer.play().catch(() => {});
            } else {
                nextTrack();
            }
        });

        audioPlayer.addEventListener("play", () => {
            isPlaying = true;
            if (playPauseBtn) playPauseBtn.textContent = "⏸";
        });

        audioPlayer.addEventListener("pause", () => {
            isPlaying = false;
            if (playPauseBtn) playPauseBtn.textContent = "▶";
        });
    }

    if (volumeSlider) {
        volumeSlider.addEventListener("input", event => {
            audioPlayer.volume =
                Number(event.target.value) / 100;
            updateVolumeIcon();
        });
    }

    if (volumeBtn) {
        volumeBtn.addEventListener("click", () => {
            if (audioPlayer.volume > 0) {
                audioPlayer.volume = 0;
                if (volumeSlider) volumeSlider.value = 0;
            } else {
                audioPlayer.volume = 0.75;
                if (volumeSlider) volumeSlider.value = 75;
            }
            updateVolumeIcon();
        });
    }

    if (shuffleBtn) {
        shuffleBtn.addEventListener("click", () => {
            isShuffle = !isShuffle;
            shuffleBtn.style.opacity =
                isShuffle ? "1" : "0.5";
        });
    }

    if (repeatBtn) {
        repeatBtn.addEventListener("click", () => {
            isRepeat = !isRepeat;
            repeatBtn.style.opacity =
                isRepeat ? "1" : "0.5";
        });
    }

    playlistItems.forEach((item, index) => {
        item.addEventListener(
            "click",
            () => playTrack(index)
        );

        const btn =
            item.querySelector(".play-btn-small");

        if (btn) {
            btn.addEventListener("click", event => {
                event.stopPropagation();
                playTrack(index);
            });
        }
    });

    document.addEventListener("keydown", event => {
        if (
            event.code === "Space" &&
            event.target === document.body
        ) {
            event.preventDefault();
            togglePlayPause();
        } else if (event.key === "ArrowRight") {
            nextTrack();
        } else if (event.key === "ArrowLeft") {
            prevTrack();
        }
    });
}

document.addEventListener("DOMContentLoaded", init);


window.addEventListener("message", event => {
    if (!event.data || typeof event.data.type !== "string") return;

    if (event.data.type === "moodToMusic:playing") {
        isPlaying = true;
        if (playPauseBtn) playPauseBtn.textContent = "⏸";
    }

    if (event.data.type === "moodToMusic:paused") {
        isPlaying = false;
        if (playPauseBtn) playPauseBtn.textContent = "▶";
    }
});
