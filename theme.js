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
    tintValues.set('vibe', [3.00, '-115.75deg', 0.90]);

    /**
     * Sets the tint values in the CSS.
     * Will quit if it doesn't have a value stored for the color_scheme.
     * @returns
     */
    function assignTintValues() {
        //checks if key exists - if not, let it default to however css assigns it
        if (!tintValues.has(Spicetify.Config.color_scheme)) {
            return;
        }
        //key exists, so we use that!
        document.documentElement.style.setProperty('--spice-filter-brightness', tintValues.get(Spicetify.Config.color_scheme)[0]);
        document.documentElement.style.setProperty('--spice-filter-hue-rotate', tintValues.get(Spicetify.Config.color_scheme)[1]);
        document.documentElement.style.setProperty('--spice-filter-saturation', tintValues.get(Spicetify.Config.color_scheme)[2]);
    }

    /**Sets the Lyrics background to the album cover of the current song.*/
    function setLyricsBackgroundImage() {
        // grab the current song's album cover via track metadata, and sets it as the lyrics background image url
        document.documentElement.style.setProperty('--spice-imgurl-lyrics', "url("+Spicetify.Player.data.track.metadata.image_xlarge_url+")");
    }

    /**Gets everything up and running!*/
    function init(delay = 100) {
        // make sure we're ready to start
        if (!Spicetify.Config || !Spicetify.Player) {
            // try again in a bit, stop this attempt tho!
            setTimeout(init, delay + 100);
            return;
        }
        assignTintValues();

        // If there's a song open already, load that album cover bg!
        if (Spicetify.Player.data) setLyricsBackgroundImage();

        // Set up event listener for the lyrics background :>
        Spicetify.Player.addEventListener("songchange", () => { setLyricsBackgroundImage() });
    }

    // Init sets its own timeout, so hopefully we won't have to mess with it!
    init();

    // Init is on a timeout to make sure everything can start up first.
    //setTimeout(init, 500);
})();