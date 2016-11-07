#PS3 MDDN 342 2016

NOTE: Apologies for the long loading times on the sketches; p5's OBJ loading appears to be fairly unoptimised and WebGL still seems to cause browsers issues. I find that Safari runs into memory usage problems, and so I recommend Chrome for viewing.

The idea for my generator was to represent the weather in the form of a picture depicting that weather. I originally drew inspiration from a painting that I've seen of a single tree on a hill in each of the four seasons; I wanted to try to recreate that using actual weather data.

I started by modelling the scene that I wanted to make within Maya; I made use of the Paint Effects tool to generate the tree and grass, and sculpted a simple hill myself. My intention was that I could use these models and then alter the materials and whether each model was rendered to produce different kinds of scenes. I also thought to produce different sky colours through simple vertical gradients, and made a rain texture that could be drawn with varying opacity depending on how intense the scene is. At the point of submission, I've been unable to get the rain texture to draw over the rest of the scene due to rendering bugs, so it's drawn over the background instead.

Due to the nature of my approach, the set of possible outputs is fairly constrained; I'm adjusting a range of parameters based on the input data to produce unique combinations, but there's no possible individual element that's completely unique.

For an artefact to be successful, it would ideally:

- Be a reasonable match for the actual weather - in other words, if you look out the window it should look similar to the render. The produced output is fairly effective at that in my opinion – last Friday, the rain intensity and sky hues almost exactly matched what I saw when I looked outside.
- Be visually appealing and interesting on its own.
- Be visually cohesive – for instance, a clear sky at midday should give a brightly lit scene.
- Give a clear indication of the weather – the visuals on their own should give you enough of an idea at a glance without needing to check the text.
- The text should match the weather while fitting the tone of the image – I want something more romanticised and indistinct than the scientific accuracy of the input data.

In many cases, the constraints directly follow from that. A bad artefact might:

- Have wildly disparate visual elements that bear no correlation to the actual weather.
- Be visually ugly or muddy.
- Have text that exceeds the Twitter character limit – the final product can actually exceed the limit, but only in very specific and rare circumstances.
- Produce content that's inappropriate, either in general or to the specific context – given the constrained parameters, this is rather hard to do.
- Look overly similar to another artefact that was produced with data from a fairly different forecast.

In order to ensure variation, I made sure that I was using a large amount of the data retrieved from the weather API and, where possible, mapping it continuously rather than having discrete intervals with branching if statements. I also made the decision to pull in the time of day for the sky colour and lighting conditions, so that a fine day at midday should look quite different from a fine day in the afternoon or at dusk. 

I was a little concerned at first that the images would end up looking too similar in spite of this; however, in practice I find the results to be sufficiently differentiated to my eyes; the blend of time and day and cloudiness goes a long way to ensuring distinct backgrounds and lighting, which have a massive impact on the resultant image.

The range of parameters that affect the final output are:

* The season
* The time of day
* How cloudy the sky is
* The volume of rain in the past three hours
* The volume of snow in the past three hours
* The humidity

In further work, making the wind have an impact on the rendered image might be an effective thing to try.

In future, it would be interesting to have people be able to tweet a place name at the bot and have it respond with an image for that place, rather than always using Wellington's weather (especially since there's comparatively not that much variation in our weather).

---

## Purview Entries:

- The 'initial_prototype' entry, which has models loaded into a scene with a gradient background working – my initial attempt at the basic layout of the scene. Note that the preview thumbnail is incorrect for the content.
- 'autumn_scene' depicts a rainy autumn sunset, and was my first attempt at trying to use the scene to portray a set of weather conditions using prebaked data.
- In 'closed_bot' I added a second 'winter' scheme, in addition to the 'rainy_autumn' scene from the previous iteration. I had the scene rendering based on the colours and parameters described in a hard-coded 'schemes' dictionary.
- 'open_bot' was my starting point for creating a scene based on weather information from the OpenWeatherMap API.
- The 'final' entry, which is the completed Twitterbot you're viewing right now.