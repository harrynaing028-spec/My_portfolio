const artistId = new URLSearchParams(location.search).get("id");
const artistProfile = Object.hasOwn(artistCatalog, artistId)
    ? artistCatalog[artistId]
    : artistCatalog.justin;

function goToArtistList() {
    if (window.parent !== window && typeof window.parent.goToPage === "function") {
        window.parent.goToPage("artists.html");
    } else {
        window.location.href = "artists.html";
    }
}

function renderProfile(profile) {
    document.title = profile.title;
    document.querySelectorAll(".top-bar-name").forEach(el => el.textContent = profile.displayName);
    document.querySelectorAll(".top-bar-handle").forEach(el => el.textContent = profile.handle);
    document.querySelectorAll(".avatar-small img").forEach((img, i) => img.src = profile.avatars[i]);
    Object.assign(document.querySelector("#mainImage"), profile.portrait);
    document.querySelector(".profile-title").textContent = profile.heading;
    document.querySelector(".profile-desc").textContent = profile.bio;
    document.querySelector(".stat-label strong").textContent = profile.listeners;
    document.querySelectorAll(".stat-label")[1].textContent = profile.topTracks;
    document.querySelector("#playerTrackName").textContent = profile.playerTitle;
    document.querySelector("#playerTrackArtist").textContent = profile.playerArtist;

    const template = document.querySelector("#track-template");
    profile.tracks.forEach((track, index) => {
        const row = template.content.firstElementChild.cloneNode(true);
        row.dataset.track = index;
        row.classList.toggle("active", index === 2);
        row.querySelector("img").src = track.cover;
        row.querySelector(".playlist-title").textContent = track.title;
        row.querySelector(".playlist-artist").textContent = track.artist;
        row.querySelector("button").dataset.track = index;
        template.before(row);
    });
    template.remove();

    const grid = document.querySelector(".gallery-grid");
    profile.gallery.forEach(photo => {
        const item = document.createElement("div");
        item.className = "gallery-item";
        const image = new Image();
        image.src = photo.src;
        image.alt = photo.alt;
        item.append(image);
        if (photo.label) {
            const label = document.createElement("span");
            label.className = "gallery-label";
            label.textContent = photo.label;
            item.append(label);
        }
        grid.append(item);
    });
}

renderProfile(artistProfile);
