#Painterly Weatherbot

NOTE: Apologies for the long loading time. I find that Safari runs into memory usage problems, and so I recommend Chrome for viewing.

This sketch is a weatherbot, meant to pictorially represent the weather in different locations around the world. I originally drew inspiration from a painting that I've seen of a single tree on a hill in each of the four seasons; I wanted to try to recreate that using actual weather data. The idea is that it can generate an image at regular intervals and post it on Twitter.

The scene is a 3D render, making use of a few 3D models that change colour depending on the incoming weather data, along with a dynamically generated sky gradient and a rain texture.

The aims for this sketch were that it shoudl:

- Be a reasonable match for the actual weather - in other words, if you look out the window it should look similar to the render. The produced output is fairly effective at that in my opinion – one rainy day, the rain intensity and sky hues almost exactly matched what I saw when I looked outside.
- Be visually appealing and interesting on its own.
- Be visually cohesive – for instance, a clear sky at midday should give a brightly lit scene.
- Give a clear indication of the weather – the visuals on their own should give you enough of an idea at a glance without needing to check the text.
- The text should match the weather while fitting the tone of the image – I want something more romanticised and indistinct than the scientific accuracy of the input data.

The range of parameters that affect the final output are:

- The season
- The time of day
- How cloudy the sky is
- The volume of rain in the past three hours
- The volume of snow in the past three hours
- The humidity

In further work, making the wind have an impact on the rendered image might be an effective thing to try.

It would also be interesting to have people be able to tweet a place name at the bot and have it respond with an image for that place, rather than always using Wellington's weather (especially since there's comparatively not that much variation in our weather).