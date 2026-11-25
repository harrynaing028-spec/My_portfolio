# Mood To Music

A music discovery project built with HTML, CSS, and vanilla JavaScript. Choose a mood, take a quiz for recommendations, or explore seven artists and their playlists. A shared player keeps a listening session active as you move between screens.

## Run locally

From the extracted project directory, run:

```sh
python -m http.server 8000
```

Open **http://localhost:8000/**. On Windows, you can also place the folder in XAMPP’s `htdocs`, start Apache, and open **http://localhost/mood-to-music/**. The app runs as a static site. The login screen supports a guest session, and profile and listening data stay in the browser.

## Try the project

- Select **Continue as Guest** and open an artist from the home screen. Pick a track, then return to the artist directory while the shared player is active.
- Open the mood selector and move the slider to explore different playlists.
- Start the mood quiz, answer the questions, and open the recommended songs.
- Use the profile and settings screens to explore listening history and appearance preferences.

## YouTube search

The search screen uses the YouTube Data API and the YouTube iframe player. To enable live search, copy `config/youtube.example.js` to `config/youtube.js` and replace the placeholder with your YouTube Data API v3 key. The local configuration is ignored by Git. Configure the key for the website where the browser will use it. If deploying a static demo, supply the configuration on that host too.

Some artwork, fonts, and sample streams load from external services. Local audio includes demonstration tracks. Some catalog entries from the original project have no matching recording and rely on fallback playback where available.

## Project layout

| Location | Responsibility |
| --- | --- |
| `index.html`, `player.html` | Login and the persistent player shell |
| Other root HTML pages | Individual screens. The shell loads them in its frame. |
| `artist.html`, `scripts/artists/` | Shared artist layout, catalog data, directory navigation, and artist playback |
| `scripts/app/` | Session, navigation, appearance, shared screen interactions, listening library, and startup |
| `scripts/shared/audio.js` | Audio filename lookup and default fallbacks |
| `scripts/` | Page-specific interactions and the shared player controller |
| `styles/` | Shared and screen-specific stylesheets |
| `artists/`, `audio/` | Original artwork and bundled recordings used by the app |
| `config/` | Example configuration for YouTube search |

To update an artist’s biography, tracks, or gallery, edit their entry in `scripts/artists/catalog.js`. The same layout renders all seven profiles.
