PS3 MDDN 342 2016

For PS3 I decided to make a bot which generates an album (with an artist, and a list of tracks).
It uses Tracery to make a (hopefully) somewhat believable band/singer name, an album name, and then some number of track names.

Instead of using Flickr directly, I'm using loremflickr.com to get images. For some reason javascript won't let me use any of p5.js's methods for getting pixel colour values when I load in an image externally. Because of this I can't do what I originally planned to do and make the text appear in a low-contrast area of the image, or change the text colour to make it more readable against the background. As a workaround I've put a black shadow underneath the white text.