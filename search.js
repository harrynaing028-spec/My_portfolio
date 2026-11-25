function goToHome() {
    if (window.parent && window.parent !== window && typeof window.parent.goToPage === "function") {
        window.parent.goToPage("home.html");
    } else {
        window.location.href = "home.html";
    }
}

function getYouTubeApiKey() {
    return window.MOOD_TO_MUSIC_CONFIG?.youtubeApiKey || "";
}

const internetStatus = document.getElementById("internetStatus");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

let currentPlaylist = [];
let currentSongIndex = -1;
let player = null;
let isPlaying = true;
let updateTimer;
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function checkInternet() {
    if (navigator.onLine) {
        internetStatus.textContent = "Internet is available ✅";
        internetStatus.style.color = "#00ffcc";
        searchInput.disabled = false;
        searchButton.disabled = false;
    } else {
        internetStatus.textContent = "No internet connection ❌";
        internetStatus.style.color = "#ff4d4d";
        searchInput.disabled = true;
        searchButton.disabled = true;
    }
}

checkInternet();
window.addEventListener("offline", checkInternet);
window.addEventListener("online", checkInternet);

function decodeHTMLEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}

async function searchMusic() {
    const userQuery = searchInput.value.trim();
    const results = document.getElementById("results");

    if (!userQuery) {
        results.textContent = "Please enter a song name.";
        return;
    }

    const API_KEY = getYouTubeApiKey();
    if (!API_KEY || API_KEY === "PASTE_YOUR_NEW_API_KEY_HERE") {
        results.textContent = "API key not set. Add your key in config/youtube.js.";
        return;
    }

    results.textContent = "Searching...";
    searchButton.disabled = true;

    const searchQuery = userQuery + " -shorts -tiktok -compilation";
    const params = new URLSearchParams({
        part: "snippet",
        q: searchQuery,
        type: "video",
        videoCategoryId: "10",
        videoEmbeddable: "true",
        maxResults: "10",
        key: API_KEY
    });
    const url = `https://www.googleapis.com/youtube/v3/search?${params.toString()}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
        const response = await fetch(url, { signal: controller.signal });
        const data = await response.json();

        if (!response.ok || data.error) {
            const apiMessage = data.error?.message || `HTTP ${response.status}`;
            console.error("YouTube Data API error:", data.error || apiMessage);
            results.textContent = `YouTube API error: ${apiMessage}`;
            return;
        }

        currentPlaylist = Array.isArray(data.items) ? data.items : [];
        results.innerHTML = "";

        if (currentPlaylist.length === 0) {
            results.textContent = "No results found. Try another song title.";
            return;
        }

        currentPlaylist.forEach((item, index) => {
            const snippet = item.snippet || {};
            const titleText = decodeHTMLEntities(snippet.title || "Untitled video");
            const channelText = decodeHTMLEntities(snippet.channelTitle || "Unknown channel");
            const thumbnailUrl = snippet.thumbnails?.medium?.url || snippet.thumbnails?.default?.url || "";

            const song = document.createElement("div");
            song.className = "song-card";

            const image = document.createElement("img");
            image.src = thumbnailUrl;
            image.alt = titleText;

            const info = document.createElement("div");
            info.style.flex = "1";

            const heading = document.createElement("h3");
            heading.style.margin = "0 0 5px 0";
            heading.style.fontSize = "15px";
            heading.textContent = titleText;

            const channel = document.createElement("p");
            channel.style.margin = "0";
            channel.style.color = "#8a99ad";
            channel.style.fontSize = "13px";
            channel.textContent = channelText;

            const playButton = document.createElement("button");
            playButton.textContent = "Play";
            playButton.addEventListener("click", () => playSongIndex(index));

            info.append(heading, channel);
            song.append(image, info, playButton);
            results.appendChild(song);
        });
    } catch (error) {
        console.error("YouTube search request failed:", error);
        results.textContent = error.name === "AbortError"
            ? "Search timed out after 15 seconds. Please try again."
            : "Could not reach YouTube. Check your connection and browser console.";
    } finally {
        clearTimeout(timeoutId);
        searchButton.disabled = false;
    }
}

document.getElementById("searchInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchMusic();
    }
});

function playSongIndex(index) {
    if (!currentPlaylist[index]) return;

    currentSongIndex = index;
    const song = currentPlaylist[index];
    document.getElementById('search-page').style.display = 'none';
    document.getElementById('player-page').style.display = 'block';
    document.getElementById('mini-player').style.display = 'none';

    const coverUrl = song.snippet.thumbnails.high ? song.snippet.thumbnails.high.url : song.snippet.thumbnails.medium.url;

    // Full Player Data
    document.getElementById('player-cover').src = coverUrl;
    document.getElementById('player-title').textContent = decodeHTMLEntities(song.snippet.title);

    // Mini Player Data
    document.getElementById('mini-cover').src = coverUrl;
    document.getElementById('mini-title').textContent = decodeHTMLEntities(song.snippet.title);

    const videoId = song.id.videoId;
    const hiddenContainer = document.getElementById('hidden-player-container');

    hiddenContainer.innerHTML = `<div id="yt-player"></div>`;
    if (player && typeof player.destroy === 'function') {
        player.destroy();
    }

    if (typeof YT !== 'undefined' && YT.Player) {
        initYTPlayer(videoId);
    } else {
        window.onYouTubeIframeAPIReady = function() {
            initYTPlayer(videoId);
        };
    }
}

function initYTPlayer(videoId) {
    player = new YT.Player('yt-player', {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
            'autoplay': 1,
            'controls': 0,
            'origin': window.location.origin,
            'enablejsapi': 1
        },
        events: {
            'onReady': function(event) {
                event.target.playVideo();
                isPlaying = true;
                updatePlayPauseUI('⏸️');
                startProgressTimer();
            },
            'onStateChange': function(event) {
                if (event.data === YT.PlayerState.PLAYING) {
                    updatePlayPauseUI('⏸️');
                    isPlaying = true;
                } else if (event.data === YT.PlayerState.PAUSED) {
                    updatePlayPauseUI('▶️');
                    isPlaying = false;
                } else if (event.data === YT.PlayerState.ENDED) {
                    playNextSong();
                }
            },
            'onError': function(event) {
                playNextSong();
            }
        }
    });
}

function updatePlayPauseUI(icon) {
    const btns = document.getElementsByClassName('playPauseBtn');
    for(let btn of btns){
        btn.textContent = icon;
    }
}

function startProgressTimer() {
    clearInterval(updateTimer);
    updateTimer = setInterval(() => {
        if (player && player.getCurrentTime && player.getDuration) {
            const currentTime = player.getCurrentTime();
            const duration = player.getDuration();
            if (duration > 0) {
                const progressPercentage = (currentTime / duration) * 100;
                document.getElementById('progressBar').value = progressPercentage;
            }
        }
    }, 1000);
}
function togglePlayPause() {
    if (!player || typeof player.getPlayerState !== 'function') return;
    const state = player.getPlayerState();

    if (state === 1) {
        player.pauseVideo();
        updatePlayPauseUI('▶️');
        isPlaying = false;
    } else {
        player.playVideo();
        updatePlayPauseUI('⏸️');
        isPlaying = true;
    }
}

function seekVideo(value) {
    if (player && player.getDuration) {
        const duration = player.getDuration();
        const seekToTime = (value / 100) * duration;
        player.seekTo(seekToTime, true);
    }
}

// Minimize နှိပ်လျှင် Mini Player ကို ဖော်ပေးမည်
function minimizePlayer() {
    document.getElementById('player-page').style.display = 'none';
    document.getElementById('search-page').style.display = 'flex';
    if (currentSongIndex !== -1) {
        document.getElementById('mini-player').style.display = 'flex';
    }
}
function maximizePlayer(event) {
    document.getElementById('search-page').style.display = 'none';
    document.getElementById('player-page').style.display = 'block';
    document.getElementById('mini-player').style.display = 'none';
}

// Back နှိပ်လျှင်လည်း Minimize လုပ်သကဲ့သို့ အောက်တွင် Bar လေး ကျန်ခဲ့မည်
function showSearchPage() {
    minimizePlayer();
}

function playNextSong() {
    if (currentPlaylist.length > 0 && currentSongIndex < currentPlaylist.length - 1) {
        playSongIndex(currentSongIndex + 1);
    }
}

function playPrevSong() {
    if (currentPlaylist.length > 0 && currentSongIndex > 0) {
        playSongIndex(currentSongIndex - 1);
    }
}
