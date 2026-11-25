/* =========================================
   ELEMENTS
========================================= */

const slider =
    document.getElementById("moodSlider");

const face =
    document.getElementById("face");

const label =
    document.getElementById("moodLabel");


const selectorView =
    document.getElementById("selectorView");

const musicView =
    document.getElementById("musicView");

const playerView =
    document.getElementById("playerView");

const miniPlayer =
    document.getElementById("miniPlayer");


const songListContainer =
    document.getElementById("songList");


const nowTitle =
    document.getElementById("nowTitle");

const nowArtist =
    document.getElementById("nowArtist");


const miniTitle =
    document.getElementById("miniTitle");

const miniArtist =
    document.getElementById("miniArtist");


const mainPlayBtn =
    document.getElementById("mainPlayBtn");

const miniPlayBtn =
    document.getElementById("miniPlayBtn");


const seekBar =
    document.getElementById("seekBar");

const currTime =
    document.getElementById("currTime");

const durTime =
    document.getElementById("durTime");


const favBtn =
    document.getElementById("favBtn");

const repeatBtn =
    document.getElementById("repeatBtn");

const repeatBadge =
    document.getElementById("repeatBadge");

const shuffleBtn =
    document.getElementById("shuffleBtn");


/* =========================================
   AUDIO PLAYER
========================================= */

const audioPlayer =
    document.getElementById("moodAudioPlayer") || new Audio();


let currentPlaylist = [];

let currentIndex = 0;

let isShuffle = false;

let repeatMode = 0;


/* =========================================
   COMMENTS DATA
========================================= */

const commentsData = {

    "Beauty and a Beat": [

        {
            user: "user9201",
            text: "This intro brings back so many memories 🔥",
            likes: 12
        },

        {
            user: "musicLover",
            text: "Nicki Minaj verse is iconic!",
            likes: 24
        }

    ]

};


/* =========================================
   MOOD DATA
========================================= */

const moodData = [

    {
        name: "Happy",

        class: "mood-happy",

        color: "#ffb703",

        gradient:
            "linear-gradient(135deg, #ffb703, #fb8500, #ffd166, #ffb703)",

        songs: [

            {
                title: "Beauty and the Beat",
                artist: "Justin Bieber ft. Nicki Minaj",
                audioSrc:
                    "audio/happyJ.mp3",
                isFavorite: false
            },

            {
                title: "Nothing on You",
                artist: "Bruno Mars",
                audioSrc:
                    "audio/happyB.mp3",
                isFavorite: false
            }

        ]
    },


    {
        name: "Sad",

        class: "mood-sad",

        color: "#2b5c8f",

        gradient:
            "linear-gradient(135deg, #2b5c8f, #264653, #4a4e69, #2b5c8f)",

        songs: [

            {
                title: "ဟိုတုန်းကအိမ်",
                artist: "ဝိုင်းစုခိုင်သိန်း",
                audioSrc:
                    "audio/sad.mp3",
                isFavorite: false
            },
            {
                title: "WildFlower",
                artist: "Billie Eilish",
                audioSrc:
                    "audio/sad1.mp3",
                isFavorite: false
            }
            


        ]
        
    },


    {
        name: "Lonely",

        class: "mood-relaxed",

        color: "#2a9d8f",

        gradient:
            "linear-gradient(135deg, #2a9d8f, #43aa8b, #90be6d, #2a9d8f)",

        songs: [

            {
                title: "Chill Vibes",
                artist: "Sample Artist",
                audioSrc:
                    "sad.mp3",
                isFavorite: false
            }

        ]
    },


    {
        name: "Psycho",

        class: "mood-angry",

        color: "#d62828",

        gradient:
            "linear-gradient(135deg, #d62828, #9d0208, #e85d04, #d62828)",

        songs: [

            {
                title: "Rock Beats",
                artist: "Sample Artist",
                audioSrc:
                    "sad.mp3",
                isFavorite: false
            }

        ]
    },


    {
        name: "Excited",

        class: "mood-energetic",

        color: "#f77f00",

        gradient:
            "linear-gradient(135deg, #f77f00, #fcbf49, #e85d04, #f77f00)",

        songs: [

            {
                title: "Upbeat Dance",
                artist: "Sample Artist",
                audioSrc:
                    "sad.mp3",
                isFavorite: false
            }

        ]
    },


    {
        name: "Love",

        class: "mood-romantic",

        color: "#e63946",

        gradient:
            "linear-gradient(135deg, #e63946, #f28482, #c77dff, #e63946)",

        songs: [

            {
                title: "Love Story",
                artist: "Taylor Swift",
                audioSrc: "audio/rom(T).mp3",
                isFavorite: false
            },

            {
                title: "First Love",
                artist: "ဝိုင်းစုခိုင်သိန်း",
                audioSrc:
                    "audio/rom2.mp3",
                isFavorite: false
            }

        ]
    }
    ,{
        name: "Broken",
        class: "mood-sad",
        color: "#6d5a7a",
        gradient:
            "linear-gradient(135deg, #6d5a7a, #3d314a, #8a708f, #241f2c)",
        songs: [
            {
                title: "Love Story",
                artist: "Taylor Swift",
                audioSrc: "audio/rom(T).mp3",
                isFavorite: false
            },

            {
                title: "First Love",
                artist: "ဝိုင်းစုခိုင်သိန်း",
                audioSrc:
                    "audio/rom2.mp3",
                isFavorite: false
            }

        ]
    }

];


let currentMoodIndex = 0;


/* =========================================
   MOOD SLIDER
========================================= */

slider.addEventListener("input", (event) => {

    currentMoodIndex =
        Number(event.target.value);

    const mood =
        moodData[currentMoodIndex];


    label.innerText =
        mood.name;


    /* Change background */

    document.body.style.background =
        mood.gradient;


    document.body.style.backgroundSize =
        "400% 400%";


    document.body.style.animation =
        "moodGradient 12s ease infinite";


    /* Change face */

    face.className =
        "face-wrapper " + mood.class;


    /* Small label animation */

    label.style.transform =
        "scale(1.08)";


    setTimeout(() => {

        label.style.transform =
            "scale(1)";

    }, 180);

});


/* =========================================
   OPEN MUSIC PAGE
========================================= */

function openMusicPage() {

    const mood =
        moodData[currentMoodIndex];


    currentPlaylist =
        mood.songs;


    document.getElementById("musicTitle").innerText =
        `${mood.name} Songs`;


    songListContainer.innerHTML = "";


    currentPlaylist.forEach((song, index) => {

        const item =
            document.createElement("div");


        item.className =
            "song-card";


        item.onclick = () =>
            playSong(index);


        item.innerHTML = `

            <div class="song-info">

                <span class="song-title">
                    ${song.title}
                </span>

                <span class="song-artist">
                    ${song.artist}
                </span>

            </div>

            <div class="play-btn-small">
                ▶
            </div>

        `;


        songListContainer.appendChild(item);

    });


    selectorView.classList.remove("active");

    playerView.classList.remove("active");

    musicView.classList.add("active");

}


/* =========================================
   BACK TO MOOD SELECTOR
========================================= */

function openSelectorPage() {

    musicView.classList.remove("active");

    selectorView.classList.add("active");


    if (
        audioPlayer.src &&
        !audioPlayer.paused
    ) {

        miniPlayer.classList.add("active");

    }

}


/* =========================================
   PLAY SONG
========================================= */

function playSong(index) {

    currentIndex = index;

    const song =
        currentPlaylist[currentIndex];


    nowTitle.innerText =
        song.title;

    nowArtist.innerText =
        song.artist;


    miniTitle.innerText =
        song.title;

    miniArtist.innerText =
        song.artist;


    favBtn.classList.toggle(
        "active",
        !!song.isFavorite
    );


    /* ==========================================
       PREPARE LOCAL AUDIO
       ========================================== */

    const localAudioSrc =
        song.localAudioSrc ||
        (typeof getLocalAudioSrc === "function"
            ? getLocalAudioSrc(song.title, song.artist)
            : song.audioSrc);

    const fallbackAudioSrc =
        song.fallbackAudioSrc || song.audioSrc || "";

    song.localAudioSrc = localAudioSrc;
    song.fallbackAudioSrc = fallbackAudioSrc;

    const embedded =
        window.parent &&
        window.parent !== window &&
        typeof window.parent.playMoodSong === "function";

    if (embedded) {
        /*
           Keep the local audio element loaded so the existing
           mini-player UI knows a song is selected. The parent
           player remains the only audio source.
        */
        audioPlayer.src = localAudioSrc;
        audioPlayer.load();

        window.parent.playMoodSong(
            song,
            currentPlaylist,
            currentIndex
        );
    } else {
        /* Standalone mood.html uses its own <audio> element. */
        audioPlayer.src = localAudioSrc;
        audioPlayer.load();

        audioPlayer.play().catch(() => {
            if (fallbackAudioSrc) {
                audioPlayer.src = fallbackAudioSrc;
                audioPlayer.load();
                audioPlayer.play().catch(() => {});
            }
        });
    }

    /* ==========================================
       KEEP YOUR EXISTING MOOD PLAYER UI
       ========================================== */

    updatePlayIcons(true);


    musicView.classList.remove(
        "active"
    );


    playerView.classList.add(
        "active"
    );


    miniPlayer.classList.remove(
        "active"
    );

}
/* =========================================
   PLAY / PAUSE
========================================= */

function togglePlay() {

    const embedded =
        window.parent &&
        window.parent !== window &&
        typeof window.parent.toggleGlobalPlay === "function";

    if (embedded) {
        window.parent.toggleGlobalPlay();
        return;
    }

    if (audioPlayer.paused) {
        audioPlayer.play().catch(() => {
            const song = currentPlaylist[currentIndex];
            const fallback =
                song &&
                (song.fallbackAudioSrc || song.audioSrc);

            if (fallback) {
                audioPlayer.src = fallback;
                audioPlayer.play().catch(() => {});
            }
        });
        updatePlayIcons(true);
    } else {
        audioPlayer.pause();
        updatePlayIcons(false);
    }
}


/* =========================================
   PLAY ICONS
========================================= */

function updatePlayIcons(isPlaying) {

    mainPlayBtn.innerText =
        isPlaying ? "❚❚" : "▶";


    miniPlayBtn.innerText =
        isPlaying ? "❚❚" : "▶";

}


/* =========================================
   MINIMIZE PLAYER
========================================= */

function minimizePlayer() {

    playerView.classList.remove("active");

    musicView.classList.add("active");


    if (audioPlayer.src) {

        miniPlayer.classList.add("active");

    }

}


/* =========================================
   EXPAND PLAYER
========================================= */

function expandPlayer() {

    musicView.classList.remove("active");

    selectorView.classList.remove("active");

    playerView.classList.add("active");

    miniPlayer.classList.remove("active");

}


/* =========================================
   NEXT SONG
========================================= */

function nextSong() {

    if (!currentPlaylist.length) {
        return;
    }


    if (isShuffle) {

        currentIndex =
            Math.floor(
                Math.random() *
                currentPlaylist.length
            );

    } else {

        currentIndex =
            (currentIndex + 1) %
            currentPlaylist.length;

    }


    playSong(currentIndex);

}


/* =========================================
   PREVIOUS SONG
========================================= */

function prevSong() {

    if (!currentPlaylist.length) {
        return;
    }


    currentIndex =
        (
            currentIndex - 1 +
            currentPlaylist.length
        ) %
        currentPlaylist.length;


    playSong(currentIndex);

}


/* =========================================
   FAVORITE
========================================= */

function toggleFavorite() {

    const currentSong =
        currentPlaylist[currentIndex];


    if (!currentSong) {
        return;
    }


    currentSong.isFavorite =
        !currentSong.isFavorite;

    favBtn.classList.toggle(
        "active",
        currentSong.isFavorite
    );

    try {
        const storage =
            sessionStorage.getItem("moodToMusicGuest")
                ? sessionStorage
                : localStorage;

        const key = "moodToMusicFavorites";
        const favorites =
            JSON.parse(storage.getItem(key)) || [];

        const exists = favorites.some(
            song =>
                song.title === currentSong.title &&
                song.artist === currentSong.artist
        );

        if (currentSong.isFavorite && !exists) {
            favorites.unshift({
                title: currentSong.title,
                artist: currentSong.artist,
                audioSrc:
                    currentSong.audioSrc ||
                    currentSong.fallbackAudioSrc ||
                    "",
                albumArt:
                    currentSong.albumArt || ""
            });
        } else if (!currentSong.isFavorite) {
            const filtered =
                favorites.filter(
                    song =>
                        !(
                            song.title === currentSong.title &&
                            song.artist === currentSong.artist
                        )
                );

            favorites.length = 0;
            favorites.push(...filtered);
        }

        storage.setItem(
            key,
            JSON.stringify(favorites)
        );

    } catch (error) {
        console.error(
            "Could not save favorite:",
            error
        );
    }
}


/* =========================================
   SHUFFLE
========================================= */

function toggleShuffle() {

    isShuffle =
        !isShuffle;


    shuffleBtn.classList.toggle(
        "active",
        isShuffle
    );

}


/* =========================================
   REPEAT
========================================= */

function cycleRepeat() {

    repeatMode =
        (repeatMode + 1) % 3;


    repeatBtn.classList.toggle(
        "active",
        repeatMode > 0
    );


    repeatBadge.style.display =
        repeatMode > 0
            ? "inline"
            : "none";


    repeatBadge.innerText =
        repeatMode === 1
            ? "1"
            : "∞";

}


/* =========================================
   SONG ENDED
========================================= */

audioPlayer.addEventListener(
    "ended",
    () => {

        if (repeatMode === 1) {

            audioPlayer.currentTime = 0;

            audioPlayer.play();

        }

        else if (
            repeatMode === 2 ||
            currentIndex <
            currentPlaylist.length - 1
        ) {

            nextSong();

        }

        else {

            updatePlayIcons(false);

        }

    }
);


/* =========================================
   SEEK
========================================= */

function seekTrack(value) {

    if (audioPlayer.duration) {

        audioPlayer.currentTime =
            (value / 100) *
            audioPlayer.duration;

    }

}


/* =========================================
   TIME UPDATE
========================================= */

audioPlayer.addEventListener(
    "timeupdate",
    () => {

        if (audioPlayer.duration) {

            seekBar.value =
                (
                    audioPlayer.currentTime /
                    audioPlayer.duration
                ) * 100;


            currTime.innerText =
                formatTime(
                    audioPlayer.currentTime
                );


            durTime.innerText =
                formatTime(
                    audioPlayer.duration
                );

        }

    }
);


/* =========================================
   FORMAT TIME
========================================= */

function formatTime(seconds) {

    const minutes =
        Math.floor(seconds / 60);


    const secondsPart =
        Math.floor(seconds % 60);


    return (

        `${minutes < 10 ? "0" : ""}${minutes}:` +

        `${secondsPart < 10 ? "0" : ""}${secondsPart}`

    );

}


/* =========================================
   GLOBAL PLAYER SYNC
========================================= */

window.addEventListener("message", (event) => {
    if (!event.data || typeof event.data.type !== "string") return;

    if (event.data.type === "moodToMusic:playing") {
        updatePlayIcons(true);
    }

    if (event.data.type === "moodToMusic:paused") {
        updatePlayIcons(false);
    }

    if (event.data.type === "moodToMusic:progress") {
        if (event.data.currentTime != null) {
            currTime.innerText =
                formatTime(event.data.currentTime);
        }

        if (event.data.duration) {
            seekBar.value =
                (event.data.currentTime / event.data.duration) * 100;

            durTime.innerText =
                formatTime(event.data.duration);
        }
    }
});


/* =========================================
   COMMENTS
========================================= */

function openCommentsSheet() {

    renderTiktokComments();

    document
        .getElementById("commentsOverlay")
        .classList.add("active");

}


function closeCommentsSheet() {

    document
        .getElementById("commentsOverlay")
        .classList.remove("active");

}


/* =========================================
   ADD COMMENT
========================================= */

function addTiktokComment() {

    const input =
        document.getElementById("tkInput");


    const text =
        input.value.trim();


    if (
        !currentPlaylist.length ||
        !text
    ) {

        return;

    }


    const currentTrack =
        currentPlaylist[currentIndex].title;


    if (!commentsData[currentTrack]) {

        commentsData[currentTrack] = [];

    }


    commentsData[currentTrack].unshift({

        user: "you",

        text: text,

        likes: 0

    });


    input.value = "";


    renderTiktokComments();

}


/* =========================================
   RENDER COMMENTS
========================================= */

function renderTiktokComments() {

    if (!currentPlaylist.length) {
        return;
    }


    const currentTrack =
        currentPlaylist[currentIndex].title;


    const list =
        document.getElementById(
            "tiktokCommentsList"
        );


    list.innerHTML = "";


    const trackComments =
        commentsData[currentTrack] || [];


    trackComments.forEach(
        (comment, index) => {

            const row =
                document.createElement("div");


            row.className =
                "comment-row";


            row.innerHTML = `

                <div class="avatar">
                    ${comment.user
                        .substring(0, 2)
                        .toUpperCase()}
                </div>


                <div class="comment-content">

                    <div class="username">
                        @${comment.user}
                    </div>

                    <div class="comment-text">
                        ${comment.text}
                    </div>

                </div>


                <button
                    class="comment-like-btn"
                    onclick="likeComment(
                        '${currentTrack}',
                        ${index},
                        this
                    )"
                >

                    ♥

                    <span
                        style="font-size:0.65rem;"
                    >
                        ${comment.likes}
                    </span>

                </button>

            `;


            list.appendChild(row);

        }
    );

}


/* =========================================
   LIKE COMMENT
========================================= */

function likeComment(
    track,
    index,
    button
) {

    commentsData[track][index].likes += 1;


    button.classList.add("liked");


    button.querySelector("span").innerText =
        commentsData[track][index].likes;

}
function goBack() {
            if (
                window.parent &&
                window.parent !== window &&
                typeof window.parent.goToPage === "function"
            ) {
                window.parent.goToPage(
                    "home.html"
                );
                return;
            }

            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href =
                    "home.html";
            }
        }
