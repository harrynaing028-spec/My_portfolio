const DOWNLOAD_KEY = "downloadedSongs";

const demoDownloads = [
    {
        title: "Golden Hour",
        artist: "JVKE",
        emoji: "🌅",
        url: "audio/golden-hour-jvke.mp3",
        fallbackUrl:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        title: "Until I Found You",
        artist: "Stephen Sanchez",
        emoji: "💜",
        url: "audio/until-i-found-you-stephen-sanchez.mp3",
        fallbackUrl:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        title: "Perfect",
        artist: "Ed Sheeran",
        emoji: "❤️",
        url: "audio/perfect-ed-sheeran.mp3",
        fallbackUrl:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    },
    {
        title: "As It Was",
        artist: "Harry Styles",
        emoji: "✨",
        url: "audio/as-it-was-harry-styles.mp3",
        fallbackUrl:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    },
    {
        title: "Night Changes",
        artist: "One Direction",
        emoji: "🌙",
        url: "audio/night-changes-one-direction.mp3",
        fallbackUrl:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    }
];

const downloadAudio =
    document.getElementById(
        "downloadAudio"
    );

function goBack() {
    if (
        window.parent &&
        window.parent !== window &&
        typeof window.parent.goToPage === "function"
    ) {
        window.parent.goToPage(
            "settings.html"
        );
        return;
    }

    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href =
            "settings.html";
    }
}

function getDownloads() {
    try {
        const raw =
            localStorage.getItem(
                DOWNLOAD_KEY
            );

        if (raw === null) {
            localStorage.setItem(
                DOWNLOAD_KEY,
                JSON.stringify(demoDownloads)
            );

            return [...demoDownloads];
        }

        return JSON.parse(raw) || [];

    } catch {
        return [];
    }
}

function saveDownloads(downloads) {
    localStorage.setItem(
        DOWNLOAD_KEY,
        JSON.stringify(downloads)
    );
}

function loadDownloads() {
    const downloads =
        getDownloads();

    const list =
        document.getElementById(
            "downloadList"
        );

    const empty =
        document.getElementById(
            "emptyDownload"
        );

    const count =
        document.getElementById(
            "songCount"
        );

    const storageText =
        document.getElementById(
            "storageText"
        );

    const storageProgress =
        document.getElementById(
            "storageProgress"
        );

    list.innerHTML = "";

    count.textContent =
        downloads.length;

    storageText.textContent =
        downloads.length + " songs";

    const percentage =
        Math.min(
            (downloads.length / 20) * 100,
            100
        );

    storageProgress.style.width =
        percentage + "%";

    empty.style.display =
        downloads.length
            ? "none"
            : "flex";

    downloads.forEach(
        (song,index) => {
            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "download-song";

            card.innerHTML = `
                <div class="song-cover">
                    ${song.emoji || "🎵"}
                </div>

                <div class="song-info">
                    <h3>
                        ${song.title || "Unknown Song"}
                    </h3>

                    <p>
                        ${song.artist || "Unknown Artist"}
                    </p>
                </div>

                <div class="song-actions">
                    <button
                        class="play-download"
                        onclick="playDownloadedSong(${index})"
                        aria-label="Play song"
                    >▶</button>

                    <button
                        class="delete-download"
                        onclick="removeDownload(${index})"
                        aria-label="Delete song"
                    >🗑</button>
                </div>
            `;

            list.appendChild(card);
        }
    );
}

function playDownloadedSong(index) {
    const downloads =
        getDownloads();

    const song =
        downloads[index];

    if (!song) return;

    const playableSong = {
        title: song.title,
        artist: song.artist,
        audioSrc: song.url || song.audioSrc || "",
        fallbackAudioSrc: song.fallbackUrl || "",
        albumArt: ""
    };

    if (
        window.parent &&
        window.parent !== window &&
        typeof window.parent.playMoodSong === "function"
    ) {
        window.parent.playMoodSong(
            playableSong,
            [playableSong],
            0
        );
        return;
    }

    downloadAudio.src =
        playableSong.audioSrc;

    downloadAudio.play().catch(() => {
        if (playableSong.fallbackAudioSrc) {
            downloadAudio.src =
                playableSong.fallbackAudioSrc;

            downloadAudio.play().catch(() => {});
        } else {
            alert(
                "Music file is not available."
            );
        }
    });
}

function removeDownload(index) {
    const downloads =
        getDownloads();

    downloads.splice(
        index,
        1
    );

    saveDownloads(
        downloads
    );

    loadDownloads();
}

document.addEventListener(
    "DOMContentLoaded",
    loadDownloads
);
