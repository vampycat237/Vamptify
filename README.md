# vamptify
hihi welcome to vampycat237's silly little spicetify theme, currently called Vamptify!
Vamptify includes the regular theme stuff - user.css and color.ini - but it also has a little extension to help it do some fancy stuff like setting the background of the lyrics page to the song's album cover, and... tinting the spotify green graphics to match the theme colors. yup.
this document is here to walk you through setting up the theme so it works properly and such :o should be pretty straightforward!!

# setup instructions
without further ado, here are the setup instructions! [make sure you have install spicetify installed first](https://spicetify.app/docs/getting-started#installation)

- extract VamptifyTheme.zip to a new folder in spicetify's Themes directory (https://spicetify.app/docs/development/themes)
- pick a color scheme! open up colors.ini with anything that can open text files (notepad will work just fine), and look for the stuff in [brackets] - those are the names of the colorschemes! right below the name is a description of what it should look like.
- open up powershell (you can either search the start menu or do Windows+R and type "powershell"!)
- enter the following one line at a time, replacing <your-color-scheme> with the name of the color scheme you choose (no brackets):

spicetify config current_theme Vamptify
spicetify config color_scheme <your-color-scheme>
spicetify apply

- and you should be all good!
- (if spicetify suggests you do another command first before any step, go ahead and do it, then come back to the step!)

# notes
oh and just to note here - the color scheme "vibe" is very much a work in progress. eventually there will be a pink on black theme, but i genuinely forgot i had intended vibe to be that so it's not. that. oops.
with that in mind, i'm like, *sort of* open to color scheme suggestions, but i'm not likely to incorporate them unless a. i like them and/or b. you make it yourself (forking the repo and adding to colors.ini, or even just giving me like. actual hex codes idk.)