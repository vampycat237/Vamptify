// NAME: Vampy Theme Helper
// AUTHOR: vampycat237
// DESCRIPTION: Paired extension for Vamptify, provides necessary functionality for the theme :3

(function vampyHelper() {
    /**Map that holds the tint values!
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

    const defaultCoverArt = "spotify:image:ab67616d00001e02382ddf73e0132cecf399c718";

    /**
     * Sets the CSS properties for tint values based on the color scheme.
     * If the tint values cannot be found, this function does nothing.
     * @returns
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
     * @returns {String}
     * */
    function getAlbumCover() {
        // Preferred method: Fetch image from song metadata.

        // OUTDATED?
        // Use Spicetify Player to get to the currently playing song.
        if (Spicetify.Player && Spicetify.Player.data) {
            log("fetching album cover from Player");
            return Spicetify.Player.data.item.album.images[3].url;
        }

        // QUEUE is described in docs, but doesn't seem to be implemented.
        // If that fails, try getting it from the queue
        else if (Spicetify.Queue) {
            log("fetching album cover from Queue");
            // This is type ProvidedTrack which extends ContextTrack.
            const track = Spicetify.Queue.track;
            // Access the metadata of the ContextTrack to get the large image.
            return track.metadata.image_large_url;
        }

        // If all else fails, grab image from the playbar.
        else {
            log("fetching album cover from playbar");
            // Retrieve album cover elements. These are img elements whose src is the album art.
            const coverArtImages = document.getElementsByClassName("cover-art-image");

            // If there are cover art elements, grab one.
            if (coverArtImages.length > 0 || !coverArtImages[0].src) {
                // There may be multiple - just choose the first one.
                return coverArtImages[0].src;
            }
            // There is no song playing right now - return the default cover art URI.
            else {
                warn("failed to fetch album cover, using default cover art");
                return defaultCoverArt;
            }
        }
    }

    /**
     * Gets everything up and running!
     * Waits until the Spicetify API objects it needs are ready, then assigns tint values and adds the event listener for song changes.
     * */
    function init(delay = 100) {
        // make sure we're ready to start
        if (!Spicetify.Config || !Spicetify.Player) {
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
            setTimeout(setLyricsBackgroundImage, delay + 800) }

        // Set up event listener for the lyrics background :>
        Spicetify.Player.addEventListener("songchange", () => { setLyricsBackgroundImage() });
    }

    /** Shorthand for console.log that prefixes logs with a signature. */
    function log(msg) {
        console.log("vamptify: " + msg);
    }
    /** Shorthand for console.warn that prefixes logs with a signature. */
    function warn(msg) {
        console.warn("vamptify: " + msg);
    }

    // Init sets its own timeout, can safely be called at any time.
    init();
})();