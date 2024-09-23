// NAME: Vampy Theme Helper
// AUTHOR: vampycat237
// DESCRIPTION: Paired extension for Vamptify, provides necessary functionality for the theme :3

/** Publically accessible parts of this extension can be interfaced with here.*/
const VamptifyTheme = {
    /** Holds strings displayed to user. For ease of translation / editing.*/
    strings: {
        // NOTIFICATIONS

        /** Notify the user that they are using an old version of the theme. */
        notification_old_version: "You're running an old version of Vamptify.",
        /** 
         * Ask the user, casually, if they want to update the theme.
         * This is the display text for the update link in the notification bar.
         */
        notification_update: "Update Vamptify?",


        // MENU ITEMS

        /** Menu button text. Indicate to the user they can update their theme if they click here. */
        menu_update: "Update Vamptify"
    }
}

(function vampyHelper() {
    /**
     * Map that holds the tint values!
     * format: theme-name, [brightness, hue-rotate, saturation]
     */
    const tintValues = new Map();
    //format: theme-name, [brightness, hue-rotate, saturation]
    tintValues.set('cybermoth', [1.75, '-52.75deg', 0.58]);
    tintValues.set('moth-to-flame', [3.00, '-115.75deg', 0.90]);
    tintValues.set('moonlit-waves', [1.75, '52.75deg', 0.80]);
    tintValues.set('sun-at-night', [3.00, '-115.75deg', 0.90]);

    // placeholder tint values
    tintValues.set('vibe', [3.00, '-115.75deg', 0.90]); // moth-to-flame
    tintValues.set('leaf', [1.75, '-52.75deg', 0.58]); // cybermoth
    tintValues.set('beyond-our-stars', [1.75, '52.75deg', 0.80]); // moonlit-waves

    /** Spotify image URI used if the currently playing song's cover art can't be found.*/
    const defaultCoverArt = "spotify:image:ab67616d00001e02382ddf73e0132cecf399c718";

    /** Release version of this theme. */
    const themeVersion = "1.1.0a";
    // 1.0.5 -> 1.1.0, as there are API changes (some strings are translatable and can be accessed externally)

    /** Log signature. Identifies log statements created by this extension. */
    const signature = "[vampytify] ";

    /** Reference to the Menu button for updating the theme.*/
    var menuUpdateBtn;

    /**
     * Sets the CSS properties for tint values based on the color scheme.
     * If the tint values cannot be found, this function does nothing.
     */
    function setFilterProperties() {
        //checks if key exists - if not, let it default to however css assigns it
        if (!tintValues.has(Spicetify.Config.color_scheme)) {
            warn("no filter property values found for " + Spicetify.Config.color_scheme);
            return;
        }
        //key exists, so we use that!
        document.documentElement.style.setProperty('--spice-filter-brightness', tintValues.get(Spicetify.Config.color_scheme)[0]);
        document.documentElement.style.setProperty('--spice-filter-hue-rotate', tintValues.get(Spicetify.Config.color_scheme)[1]);
        document.documentElement.style.setProperty('--spice-filter-saturation', tintValues.get(Spicetify.Config.color_scheme)[2]);

        log("filter properties set for " + Spicetify.Config.color_scheme);
    }

    /**Sets the Lyrics background to the album cover of the current song.*/
    function setLyricsBackgroundImage() {

        // grab the current song's album cover via track metadata, and sets it as the lyrics background image url
        document.documentElement.style.setProperty('--spice-imgurl-lyrics', "url("+getAlbumCover()+")");
    }

    /**
     * Fetches the URI of the album cover of the currently playing song.
     * @returns {String} A Spotify image URI
     * */
    function getAlbumCover() {
        // Preferred method: Fetch image from song metadata.

        // Spicetify now stores currently playing track in the Queue.
        // Try getting it from the queue
        if (Spicetify.Queue) {
            log("fetching album cover from Queue");
            // This is type ProvidedTrack which extends ContextTrack.
            const track = Spicetify.Queue.track;
            // Access the metadata of the ContextTrack to get the large image.
            return track.contextTrack.metadata.image_large_url;
        }

        // Fall back on grabbing image from the playbar, or default image.
        else {
            log("fetching album cover from playbar");
            // Retrieve album cover elements. These are img elements whose src is the album art.
            const coverArtImages = document.getElementsByClassName("cover-art-image");

            /* 
             * This might return playlist or album cover images that aren't being played.
             * This is most likely to occur if there's no song being played.
             */
            // If there are cover art elements, grab one.
            if (coverArtImages.length > 0 || !coverArtImages[0].src) {
                // There may be multiple - just choose the first one.
                return coverArtImages[0].src;
            }
            // There is no song playing right now, and no cover art on screen - return the default cover art URI.
            else {
                warn("failed to fetch album cover, using default cover art");
                return defaultCoverArt;
            }
        }
    }

    /** Changes the default app title. Needs Spicetify.AppTitle to be initialized. */
    async function setAppTitle() {
        await Spicetify.AppTitle.set("Vamptify " + themeVersion);
        Spicetify.AppTitle.sub();
    }

    /**
     * TODO
     * Checks if the current Vamptify version is up-to-date.
     * */
    function checkForUpdate() {
        // TODO: Check if Vamptify version is up-to-date.
        if (false) {
            // Show a notification to the user that their theme is out of date
            Spicetify.showNotification(`${VamptifyTheme.strings.notification_old_version} <a href="https://github.com/vampycat237/Vamptify/releases/latest">${VamptifyTheme.strings.notification_update}</a>`)
        }
    }

    /**
     * Adds a button in the user menu which provides a link to the latest update
     * */
    function insertUpdateMenuButton() {
        menuUpdateBtn = new Spicetify.Menu.Item(
            VamptifyTheme.strings.menu_update,
            true,
            () => {
                Spicetify.showNotification(`<a href="https://github.com/vampycat237/Vamptify/releases/latest">${VamptifyTheme.strings.notification_update}</a>`)
            }
        )
    }

    /**
     * Gets everything up and running!
     * Waits until the Spicetify API objects it needs are ready, then assigns tint values and adds the event listener for song changes.
     * */
    function init(delay = 100) {
        // make sure we're ready to start
        if (!(Spicetify.Config && Spicetify.Player && Spicetify.AppTitle)) {
            // try again in a bit, stop this attempt tho!
            setTimeout(init, delay + 100);
            return;
        }
        setFilterProperties();

        // If there's a song open already, load that album cover bg!
        // TODO: Current song is no longer in Player. Come up with some workaround
        if (Spicetify.Player.data) setLyricsBackgroundImage();
        else { 
            log("setting timeout to load lyrics background image")
            setTimeout(setLyricsBackgroundImage, delay + 800)
        }

        // Set up event listener for the lyrics background :>
        Spicetify.Player.addEventListener("songchange", () => { setLyricsBackgroundImage() });

        // Do this last, since it has to await a promise. I forget if those pause execution, so we play it safe
        setAppTitle();
    }


    /** Shorthand for console.log that prefixes logs with a signature. */
    function log(msg) {
        console.log(signature + msg);
    }
    /** Shorthand for console.warn that prefixes logs with a signature. */
    function warn(msg) {
        console.warn(signature + msg);
    }


    // Init sets its own timeout, can safely be called at any time.
    init();
})();