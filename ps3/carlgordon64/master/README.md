PS3 MDDN 342 2016

Final Twitter Bot - Survival Maze

Part 2 -

The Artifact my generator makes is a procedural survival story set in a maze. The hero of the story is a character who is endlessly looking for a way out.
Our hero's only chance at surviving is by running between shelters, searching for food while dodiging dangerous creatures at every turn. The maze itself is works on a real-time day and night cycle with weather events controlled by real local weather conditions. The concrete properties that drive the events within the story are:

Character Position (x,y),Monster 1 Position (x,y),Monster 2 Position (x,y), Shelter Position (x,y), Food / Lifepoints Position (x,y)

These properties are initally set to randomized values within the maze however if the character comes within a controlled pixel radius of any of the objects he jumps to them to investigate causing various interactions with the objects.  

time of day is represented in a cycle of four stages of the day: Early-morning, Morning, Afternoon and Night. This was a design consideration that I developed to break up the monotony of the generated artifact. I also added a zoom function to randomly zoom in on the maze to change the scenery slightly.

weather is sourced from YahooWeather API for Wellington city and the climate of the maze is set to local temperature + conditions.

-how will I make sure the artifact has good properties?

I have used some extra constraints to determine the results of the artifact. There is a random spin array with values 1 - 10 that helps provides controlled randomness for determining the text events in the story. The generated text uses Tracery to assist in forming a paragraph that makes sense. This is also randomized and driven by arrays of potential text options. 

GREEN BOT.
Because this version of my bot uses Yahoo Weather to control condition variables within the maze / storyline the open data coming in should enrich the randomness of the artifact making it a green bot.



