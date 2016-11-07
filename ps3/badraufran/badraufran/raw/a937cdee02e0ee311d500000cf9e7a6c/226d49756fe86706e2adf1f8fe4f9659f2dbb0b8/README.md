PS3 MDDN 342 2016

This is a Twitter bot which generates marble images. It takes a sample from a marble image, gets a colour palette from the COLOURlovers API, and applies the colours to the marble image. Every output is unique with a different image and colours every time.

### What did I make?
The artefact of my generator is a uniquely coloured marble image. The concrete properties (good qualities) of each output are a unique beautiful colour palette and an interesting marble-like look (swirly with bands of colour).

The constraints (bad artefacts) are blank/empty images, a boring or ugly colour palette, smudgy large areas of colour, and images which don't look like marble.

To ensure my generator produces a wide range of artefacts, I sample my marble from large images which has a mix of areas that are interesting and areas that are blank, boring, or ugly. To ensure it produces artefacts with more good properties than bad, the majority of the marble images it sample are interesting and are marble-like. To ensure I get a good colour palette, I find a random popular colour palette in their 'top' category. There is enough results that it would take a long time (or luck) to get repeating colour palettes. Even if the palette repeats, the marble should be different.

### Adding external data
In order to make this closed bot a green bot, I needed to get a colour palette from an API. I found COLOURlovers offered a nice API and implemented that. For my closed bot, I was extracting a colour palette from an image which was tedious. It also gave me problems with Cross Origin security errors when I tried to get images from an API. So I changed the way I get colour palettes to directly getting them online. This is a much more elegant solution. It also guarantees I will get nice colours because they are curated.