# vamptify
hihi welcome to my first spicetify theme, currently called Vamptify!
this theme's main goal is to suit my personal tastes - fun colors, a bit more compact than modern spotify.
It also adds a few spin animations, including a "record spin" animation on the play button and user avatars. Turning on reduced motion should disable this!
Some buttons, most notably the back/forward history buttons, are moved from their default position because i didn't like where they were.

Vamptify includes a little extension which you'll probably want to enable! The extension does the following:
- sets the background of the lyrics page to the current song's album cover
- tells the theme how to tint the spotify green graphics to match your colorscheme

# setup instructions
without further ado, here are the setup instructions! [make sure you have spicetify installed first](https://spicetify.app/docs/getting-started#installation)

- extract the .zip to a new folder in spicetify's Themes directory (https://spicetify.app/docs/development/themes)
- pick a color scheme! open up colors.ini with anything that can open text files (notepad will work just fine), and look for the stuff in [brackets] - those are the names of the colorschemes! right below the name is a description of what it should look like.
- open up powershell (you can either search the start menu or do Windows+R and type "powershell"!)
- enter the following one line at a time, replacing \<your-color-scheme\> with the name of the color scheme you choose (no brackets):

<code>spicetify config current_theme Vamptify
 spicetify config color_scheme \<your-color-scheme\>
 spicetify config inject_theme_js 1
 spicetify apply</code>

- and you should be all good!
- (if spicetify suggests you do another command first before any step, go ahead and do it, then come back to the step!)

# color schemes
included:
- <code>cybermoth</code> (default, dark): light green and pink on dark purple
- <code>moth-to-flame</code> (dark): gold on dark, warm purple
- <code>moonlit-waves</code> (dark): blue on dark, cool purple
- <code>vibe</code> (dark): pink and blue on dark purple? WIP
- <code>sun-at-night</code> (midnight): gold on black. WIP - currently no tint value
- <code>leaf</code> (medium): soft greens
- <code>beyond-our-stars</code> (medium): soft periwinkle with light pinky purple and blue

potential future ideas:
- pink and black
- something orange

i'm like, *sort of* open to color scheme suggestions, but i'm not likely to incorporate them unless a. i like them and/or b. you make it yourself (forking the repo and adding to colors.ini, or even just giving me like. actual hex codes idk.)

# bugs
if spicetify is not acting correctly while using this theme, please let me know by making an issue!
i sometimes neglect to update my spicetify for a long time so i sometimes miss breaking API changes.