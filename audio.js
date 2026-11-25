/* =========================================================
   MOOD TO MUSIC - AUDIO FILE HELPER
   ========================================================= */

window.MTM_AUDIO_BASE = "audio/";

window.slugifyAudioName = function (title, artist) {
    return [title || "track", artist || "artist"]
        .join("-")
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        + ".mp3";
};

window.getLocalAudioSrc = function (title, artist) {
    return window.MTM_AUDIO_BASE + window.slugifyAudioName(title, artist);
};

window.audioFallbacks = [
    "audio/babyJustin.mp3",
    "audio/justin(A).mp3",
    "audio/babyJustin.mp3",
    "audio/babyJustin.mp3",
    "audio/babyJustin.mp3",
    "audio/babyJustin.mp3"
];
