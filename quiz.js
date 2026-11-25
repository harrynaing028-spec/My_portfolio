/* =========================================
   MOOD TO MUSIC
   SCRIPT.JS
========================================= */


/* =========================================
   QUESTIONS
========================================= */

const questions = [

    {
        question: "ဒီနေ့ မနက်အိပ်ရာနိုးတဲ့အချိန် ဘယ်လိုခံစားရလဲ?",
        options: [
            "လန်းဆန်းပြီးတက်ကြွနေတယ်လို့ခံစားရတယ်",
            "ပုံမှန်ပါပဲလို့ခံစားရတယ်",
            "ပင်ပန်းနေတယ်လို့ခံစားရတယ်",
            "စိတ်ရှုပ်နေတယ်လို့ခံစားရတယ်"
        ],
        moods: [
            "Excited",
            "Happy",
            "Lonely",
            "Sad"
        ]
    },


    {
        question: "အခုအချိန်မှာ မင်းရဲ့စိတ်အခြေအနေကို ဘယ်စကားလုံးက အကောင်းဆုံးဖော်ပြနိုင်လဲ?",
        options: [
            "စိတ်လှုပ်ရှားနေတယ်",
            "အေးအေးဆေးဆေးရှိတယ်",
            "စိတ်ရှုပ်နေတယ်",
            "အထီးကျန်နေတယ်"
        ],
        moods: [
            "Excited",
            "Lonely",
            "Broken",
            "Sad"
        ]
    },


    {
        question: "အခုအချိန်မှာ ဘယ်လိုရာသီဥတုမျိုးကို ပိုကြိုက်လဲ?",
        options: [
            "☀️ နေပူတဲ့နေ့တစ်နေ့",
            "🌧 မိုးဖွဲဖွဲရွာတဲ့နေ့တစ်နေ့",
            "🌬 လေအေးအေးတိုက်နေတဲ့နေ့တစ်နေ့",
            "🌙 မိုးသက်လေပြင်းတိုက်နေတဲ့နေ့တစ်နေ့"
        ],
        moods: [
            "Happy",
            "Lonely",
            "Psycho",
            "Psycho"
        ]
    },


    {
        question: "အားလပ်ချိန်ရရင် ဘာလုပ်ချင်လဲ?",
        options: [
            "သူငယ်ချင်းတွေနဲ့ ထွက်လည်ချင်တယ်",
            "စာဖတ်ချင်တယ်",
            "ရုပ်ရှင် / Series ကြည့်ချင်တယ်",
            "အိပ်ပြီး အနားယူချင်တယ်"
        ],
        moods: [
            "Happy",
            "Lonely",
            "Psycho",
            "Sad"
        ]
    },


    {
        question: "ဒီနေ့ အပြင်ထွက်ချင်လား၊ အိမ်မှာပဲနေချင်လား?",
        options: [
            "အပြင်ထွက်ပြီး လျှောက်လည်ချင်တယ်",
            "ကော်ဖီဆိုင်သွားချင်တယ်",
            "အိမ်မှာပဲ အေးအေးဆေးဆေးနေချင်တယ်",
            "ဘယ်မှမသွားဘဲ အနားယူချင်တယ်"
        ],
        moods: [
            "Happy",
            "Psycho",
            "Lonely",
            "Sad"
        ]
    },


    {
        question: "တစ်ယောက်တည်းနေချင်လား၊ သူငယ်ချင်းတွေနဲ့နေချင်လား?",
        options: [
            "သူငယ်ချင်းတွေနဲ့ ပျော်ပျော်ပါးပါးနေချင်တယ်",
            "မိသားစုနဲ့ အချိန်ကုန်ဆုံးချင်တယ်",
            "တစ်ယောက်တည်း အေးဆေးနေချင်တယ်",
            "ဘယ်သူနဲ့မှ မတွေ့ချင်ဘူး"
        ],
        moods: [
            "Happy",
            "Happy",
            "Lonely",
            "Sad"
        ]
    },


    {
        question: "အခုအချိန်မှာ အားပေးစကားတစ်ခွန်းလိုနေတယ်လို့ ခံစားရလား?",
        options: [
            "အရမ်းလိုတယ်လို့ခံစားရတယ်",
            "နည်းနည်းလိုတယ်လို့ခံစားရတယ်",
            "မလိုပါဘူး",
            "မသေချာဘူး"
        ],
        moods: [
            "Sad",
            "Broken",
            "Happy",
            "Lonely"
        ]
    },


    {
        question: "အခုအချိန်မှာ စကားများများပြောချင်လား၊ တိတ်တိတ်နေချင်လား?",
        options: [
            "လူတွေနဲ့ စကားပြောချင်တယ်",
            "နည်းနည်းပဲ ပြောချင်တယ်",
            "တိတ်တိတ်လေးနေချင်တယ်",
            "တစ်ယောက်တည်းပဲ နေချင်တယ်"
        ],
        moods: [
            "Happy",
            "Lonely",
            "Lonely",
            "Sad"
        ]
    },


    {
        question: "ဒီနေ့ စိတ်အေးချမ်းနေတယ်လို့ ခံစားရလား?",
        options: [
            "အေးချမ်းတယ်လို့ခံစားရတယ်",
            "အတော်လေး အေးချမ်းတယ်လို့ခံစားရတယ်",
            "သိပ်မအေးချမ်းဘူးလို့ခံစားရတယ်",
            "လုံးဝ စိတ်ရှုပ်နေတယ်လို့ခံစားရတယ်"
        ],
        moods: [
            "Psycho",
            "Happy",
            "Broken",
            "Sad"
        ]
    },


    {
        question: "ခရီးတစ်ခုသွားရမယ်ဆိုရင် ဘယ်ကိုရွေးမလဲ?",
        options: [
            "🏖 ကမ်းခြေကိုသွားချင်တယ်",
            "⛰ တောင်ပေါ်‌‌ဒေသကိုသွားချင်တယ်",
            "🌲 သဘာဝတောအုပ်ကိုသွားချင်တယ်",
            "🌆 မြို့ကြီးကိုသွားချင်တယ်"
        ],
        moods: [
            "Happy",
            "Excited",
            "Psycho",
            "Happy"
        ]
    },
    {
        question: "ဆုံးဖြတ်ချက်ချတဲ့အခါ ဘာကို ပိုအားထားလဲ?",
        options: [
            "စိတ်ခံစားချက်ကို ပိုအားထားပြီးဆုံးဖြတ်ချက်ချတယ်",
            "အကြောင်းပြချက်နဲ့ သေချာစဉ်းစားပြီးဆုံးဖြတ်ချက်ချတယ်",
            "စိတ်ခံစားချက်နှင့်အကြောင်းပြချက် နှစ်မျိုးလုံးကို မျှတအောင်သုံးပြီးဆုံးဖြတ်ချက်ချတယ်",
            "တခြားသူရဲ့ အကြံဉာဏ်ကို နားထောင်ပြီးဆုံးဖြတ်ချက်ချတယ်"
        ],
        moods: [
            "Love",
            "Lonely",
            "Happy",
            "Psycho"
        ]
    }

];


/* =========================================
   MOOD INFORMATION
========================================= */

const moodInfo = {

    Happy: {
        emoji: "😊",
        message: "You seem to be feeling Happy!",
    },

    Sad: {
        emoji: "😢",
        message: "You seem to be feeling Sad.",
    },

    Lonely: {
        emoji: "😌",
        message: "You seem to be feeling Lonely.",
    },

    Psycho: {
        emoji: "🌿",
        message: "You seem to be feeling Psycho.",
    },

    Excited: {
        emoji: "⚡️",
        message: "You seem to be feeling Excited!",
    },

    Broken: {
        emoji: "😣",
        message: "You seem to be feeling Broken.",
    },

    Love: {
        emoji: "💕",
        message: "You seem to be feeling Love."
    }

};


/* =========================================
   VARIABLES
========================================= */

let currentQuestion = 0;

let selectedMood = "";

let moodScores = {

    Happy: 0,

    Sad: 0,

    Lonely: 0,

    Psycho: 0,

    Excited: 0,

    Broken: 0,

    Love: 0

};


/* =========================================
   GET HTML ELEMENTS
========================================= */

const startScreen =
    document.getElementById("start-screen");

const quizScreen =
    document.getElementById("quiz-screen");

const loadingScreen =
    document.getElementById("loading-screen");

const resultScreen =
    document.getElementById("result-screen");


const startButton =
    document.getElementById("start-btn");

const nextButton =
    document.getElementById("next-btn");

const restartButton =
    document.getElementById("restart-btn");

const musicButton =
    document.getElementById("music-btn");
    const recommendationScreen =
    document.getElementById("recommendation-screen");

const backButton =
    document.getElementById("back-btn");

const exitButton =
    document.getElementById("exit-btn");

const songImage =
    document.getElementById("song-image");

const songMood =
    document.getElementById("song-mood");

const songList =
    document.getElementById("song-list");


const questionNumber =
    document.getElementById("question-number");

const progressPercent =
    document.getElementById("progress-percent");

const progressBar =
    document.getElementById("progress-bar");


const questionText =
    document.getElementById("question");

const optionsContainer =
    document.getElementById("options");


const loadingBar =
    document.getElementById("loading-bar");

const loadingPercent =
    document.getElementById("loading-percent");


const resultEmoji =
    document.getElementById("result-emoji");

const resultMood =
    document.getElementById("result-mood");

const resultMessage =
    document.getElementById("result-message");


/* =========================================
   START QUIZ
========================================= */

startButton.addEventListener(
    "click",
    function () {

        startScreen.classList.add("hide");

        quizScreen.classList.remove("hide");

        currentQuestion = 0;

        resetScores();

        showQuestion();

    }
);


/* =========================================
   RESET SCORES
========================================= */

function resetScores() {

    moodScores = {

        Happy: 0,

        Sad: 0,

        Lonely: 0,

        Psycho: 0,

        Excited: 0,

        Broken: 0,

        Love: 0

    };

}


/* =========================================
   SHOW QUESTION
========================================= */

function showQuestion() {

    const current =
        questions[currentQuestion];


    /* Question number */

    questionNumber.textContent =
        "Question " +
        (currentQuestion + 1) +
        " / " +
        questions.length;


    /* Progress */

    const progress =
        Math.round(
            ((currentQuestion + 1)
            / questions.length) * 100
        );


    progressPercent.textContent =
        progress + "%";


    progressBar.style.width =
        progress + "%";
        /* Question text */

    questionText.textContent =
        current.question;


    /* Clear old options */

    optionsContainer.innerHTML = "";


    /* Reset selected option */

    selectedMood = "";


    /* Disable next */

    nextButton.disabled = true;

    nextButton.style.opacity = "0.45";


    /* Create options */

    current.options.forEach(
        function (option, index) {

            const label =
                document.createElement("label");


            label.classList.add("option");


            /* Radio input */

            const radio =
                document.createElement("input");

            radio.type = "radio";

            radio.name = "answer";

            radio.value = index;


            /* Custom radio circle */

            const circle =
                document.createElement("span");

            circle.classList.add(
                "radio-circle"
            );


            /* Text */

            const text =
                document.createElement("span");

            text.classList.add(
                "option-text"
            );

            text.textContent = option;


            /* Add elements */

            label.appendChild(radio);

            label.appendChild(circle);

            label.appendChild(text);


            /* Click */

            label.addEventListener(
                "click",
                function () {

                    selectOption(
                        label,
                        index
                    );

                }
            );


            optionsContainer.appendChild(
                label
            );

        }
    );

}


/* =========================================
   SELECT OPTION
========================================= */

function selectOption(
    selectedLabel,
    selectedIndex
) {

    const allOptions =
        document.querySelectorAll(
            ".option"
        );


    /* Remove old selection */

    allOptions.forEach(
        function (option) {

            option.classList.remove(
                "selected"
            );

        }
    );


    /* Add selected */

    selectedLabel.classList.add(
        "selected"
    );


    /* Check radio */

    const radio =
        selectedLabel.querySelector(
            'input[type="radio"]'
        );


    radio.checked = true;


    /* Get mood */

    selectedMood =
        questions[currentQuestion]
            .moods[selectedIndex];


    /* Enable next */

    nextButton.disabled = false;

    nextButton.style.opacity = "1";

}


/* =========================================
   NEXT BUTTON
========================================= */

nextButton.addEventListener(
    "click",
    function () {

        /* Check selection */

        if (selectedMood === "") {

            alert(
                "Please select an option first."
            );

            return;

        }


        /* Add mood score */

        moodScores[selectedMood]++;


        /* Go next */

        currentQuestion++;


        /* Reset selection */

        selectedMood = "";


        /* More questions */

        if (
            currentQuestion <
            questions.length
        ) {

            showQuestion();

        }

        /* Quiz finished */

        else {

            startAnalyzing();

        }

    }
);

/* =========================================
   ANALYZING SCREEN
========================================= */

function startAnalyzing() {

    quizScreen.classList.add("hide");

    loadingScreen.classList.remove("hide");


    loadingBar.style.width = "0%";

    loadingPercent.textContent = "0%";


    let progress = 0;


    const loading =
        setInterval(
            function () {

                progress++;


                loadingBar.style.width =
                    progress + "%";


                loadingPercent.textContent =
                    progress + "%";


                if (progress >= 100) {

                    clearInterval(loading);


                    setTimeout(
                        function () {
                            showResult();

                        },
                        300
                    );

                }

            },
            20
        );

}


/* =========================================
   GET HIGHEST MOOD
========================================= */

function getHighestMood() {

    let highestMood = "Happy";

    let highestScore = -1;


    for (
        const mood in moodScores
    ) {

        if (
            moodScores[mood] >
            highestScore
        ) {

            highestScore =
                moodScores[mood];

            highestMood =
                mood;

        }

    }


    return highestMood;

}


/* =========================================
   SHOW RESULT
========================================= */

function showResult() {

    const highestMood =
        getHighestMood();


    const info =
        moodInfo[highestMood];


    /* Hide loading */

    loadingScreen.classList.add(
        "hide"
    );


    /* Show result */

    resultScreen.classList.remove(
        "hide"
    );


    /* Result */

    resultEmoji.textContent =
        info.emoji;


    resultMood.textContent =
        highestMood;


    resultMessage.textContent =
        info.message;


    /* Mood-specific glow */

    applyMoodGlow(highestMood);

}


/* =========================================
   MOOD GLOW
========================================= */

function applyMoodGlow(mood) {

    const card =
        document.querySelector(
            ".container"
        );


    card.style.transition =
        "box-shadow 0.8s ease";


    if (mood === "Happy") {

        card.style.boxShadow =
            "0 25px 70px rgba(250, 204, 21, 0.25)";

    }

    else if (mood === "Sad") {

        card.style.boxShadow =
            "0 25px 70px rgba(96, 165, 250, 0.25)";

    }

    else if (mood === "Lonely") {

        card.style.boxShadow =
            "0 25px 70px rgba(139, 92, 246, 0.3)";

    }

    else if (mood === "Psycho") {

        card.style.boxShadow =
            "0 25px 70px rgba(74, 222, 128, 0.2)";

    }

    else if (mood === "Excited") {

        card.style.boxShadow =
            "0 25px 70px rgba(249, 115, 22, 0.3)";

    }

    else if (mood === "Broken") {

        card.style.boxShadow =
            "0 25px 70px rgba(239, 68, 68, 0.25)";

    }

    else if (mood === "Love") {

        card.style.boxShadow =
            "0 25px 70px rgba(236, 72, 153, 0.35)";

    }

}


/* =========================================
   TAKE QUIZ AGAIN
========================================= */

restartButton.addEventListener(
    "click",
    function () {

        /* Reset everything */

        currentQuestion = 0;

        selectedMood = "";

        resetScores();


        /* Reset progress */

        progressBar.style.width = "0%";

        progressPercent.textContent =
            "0%";


        /* Hide result */

        resultScreen.classList.add(
            "hide"
        );


        /* Show quiz */

        quizScreen.classList.remove(
            "hide"
        );


        /* Show first question */

        showQuestion();

    }
);


/* =========================================
   FIND MY MUSIC
========================================= */

musicButton.addEventListener(
    "click",
    function () {

        const mood = getHighestMood();

        showRecommendations(mood);

    }
);
function showRecommendations(mood) {

    const recommendations = {

        Happy: {
            title: "Happy Vibes 🎉",
            songs: [
                ["Beauty and the beat", "Justin Beiber", "artists/justin.jpg","audio/happyJ.mp3"],
                ["Count on me", "Bruno March", "artists/brono3.jpg"],
                ["Good Time", "Owle City", "artists/happy2.jpg"],
                ["Can't Stop the Feeling!", "Justin Timberlake", "artists/happy1.jpg"]

            ]
        },

        Sad: {
            title: "Songs for Your Heart 💙",
            songs: [
                ["ဟိုတုန်းကအိမ်", "ဝိုင်းစုခိုင်သိန်း", "artists/ooo.jpg","audio/sad"],
                ["Let Her Go", "Passenger", "artists/sad1.jpg"],
                ["Another Love", "Tom Odell", "artists/sad2.jpg"],
                ["All I Want", "Kodaline", "artists/sad3.jpg"]
            ]
        },

        Lonely: {
            title: "Lonely & Peaceful 🌙",
            songs: [
                ["ဟိုတုန်းကအိမ်", "ဝိုင်းစုခိုင်သိန်း", "artists/ooo.jpg","audio/sad"],
                ["Experience", "Ludovico Einaudi", "artists/justin.jpg"],
                ["Weightless", "Marconi Union", "artists/justin.jpg"],
                ["Bloom", "The Paper Kites", "artists/justin.jpg"]
            ]
        },

        Psycho: {
            title: "Relax & Unwind 🌿",
            songs: [
                ["Beauty and the beat", "Justin Beiber", "artists/justin.jpg","audio/happyJ.mp3"],
                ["Ocean Eyes", "Billie Eilish", "artists/justin.jpg"],
                ["Better Together", "Jack Johnson", "artists/justin.jpg"],
                ["Bloom", "The Paper Kites", "artists/justin.jpg"]
            ]
        },

        Excited: {
            title: "Energy Boost ⚡",
            songs: [
                ["Beauty and the beat", "Justin Beiber", "artists/justin.jpg","audio/happyJ.mp3"],
                ["Thunder", "Imagine Dragons", "artists/justin.jpg"],
                ["Titanium", "David Guetta", "artists/justin.jpg"],
                ["Hall of Fame", "The Script", "artists/justin.jpg"]
            ]
        },

        Broken: {
            title: "Relax Your Mind 🌧️",
            songs: [
                ["ဟိုတုန်းကအိမ်", "ဝိုင်းစုခိုင်သိန်း", "artists/ooo.jpg","audio/sad"],
                ["Clair de Lune", "Claude Debussy", "artists/justin.jpg"],
                ["Holocene", "Bon Iver", "artists/justin.jpg"],
                ["The Night We Met", "Lord Huron", "artists/justin.jpg"]
            ]
        },

        Love: {
            title: "Love Moments 💕",
            songs: [
                ["Beauty and the beat", "Justin Beiber", "artists/justin.jpg","audio/happyJ.mp3"],
                ["All of Me", "John Legend", "artists/allme.jpg"],
                ["Until I Found You", "Stephen Sanchez", "artists/justin.jpg"],
                ["Beautiful in White", "Shane Filan", "artists/justin.jpg"]
            ]
        }

    };


    const data = recommendations[mood];

    if (!data) return;


    /* Hide result */

    resultScreen.classList.add("hide");


    /* Show recommendation */

    recommendationScreen.classList.remove("hide");


    /* Mood title */

    songMood.textContent = data.title;


    /* Clear old cards */

    songList.innerHTML = "";


    /* Create 4 horizontal cards */

    data.songs.forEach(function(song, index) {

        const card =
            document.createElement("div");

        card.classList.add("song-card");


        /* Image */

        const image =
            document.createElement("img");

        image.classList.add(
            "song-card-image"
        );

        image.src = song[2] || "artists/justin.jpg";
        image.onerror = function () {
            this.src = "artists/justin.jpg";
        };
        image.alt = song[0];


        /* Information */

        const title =
            document.createElement("div");

        title.classList.add(
            "song-title"
        );

        title.textContent =
            song[0];


        const artist =
            document.createElement("div");

        artist.classList.add(
            "song-artist"
        );

        artist.textContent =
            song[1];


        /* Play button */

        const play =
            document.createElement("button");

        play.classList.add(
            "song-play"
        );
        play.textContent = "▶";


        play.addEventListener("click", function () {
            const songData = {
                title: song[0],
                artist: song[1],
                audioSrc:
                    "audio/" +
                    song[0]
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/^-|-$/g, "") +
                    ".mp3",
                fallbackAudioSrc:
                    (window.audioFallbacks || [])[index % 6] ||
                    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            };

            const playlist =
                data.songs.map(function (item, i) {
                    return {
                        title: item[0],
                        artist: item[1],
                        audioSrc:
                            "audio/" +
                            item[0]
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "-")
                                .replace(/^-|-$/g, "") +
                            ".mp3",
                        fallbackAudioSrc:
                            (window.audioFallbacks || [])[i % 6] ||
                            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                    };
                });

            if (
                window.parent &&
                window.parent !== window &&
                typeof window.parent.playMoodSong === "function"
            ) {
                window.parent.playMoodSong(
                    songData,
                    playlist,
                    index
                );
            } else {
                const audio =
                    new Audio(songData.audioSrc);

                audio.play().catch(() => {
                    audio.src =
                        songData.fallbackAudioSrc;
                    audio.play().catch(() => {});
                });
            }
        });

        /* Add elements */

        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(artist);
        card.appendChild(play);

        songList.appendChild(card);

    });

}
/* =========================================
   TRY AGAIN
========================================= */

backButton.addEventListener("click", function () {

    /* Hide recommendation page */
    recommendationScreen.classList.add("hide");

    /* Reset quiz */
    currentQuestion = 0;

    selectedMood = "";

    resetScores();

    /* Reset progress */
    progressBar.style.width = "0%";

    progressPercent.textContent = "0%";

    /* Show quiz */
    quizScreen.classList.remove("hide");

    /* Show Question 1 */
    showQuestion();
    const homeBackButton=document.getElementById('home-back-btn');
    homeBackButton.addEventListener("click",function(){
        window.location.href="home.html";
    });

});
