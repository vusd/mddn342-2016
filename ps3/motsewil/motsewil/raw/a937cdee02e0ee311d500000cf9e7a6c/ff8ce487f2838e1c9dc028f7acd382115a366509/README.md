Generic Movie Generator - MDDN 342 PS3

Summary : This bot is built for twitter so that it can generate a fake movie title using a tracery grammar, it will then use a set of predefined images to build a poster and connects to an imdb API to gather a movie review for the fake movie.

Part 1 : Initial Ideas

This project initially had me stumped, I wasn't sure what I could potentially use a twitter bot for practically. And couldn't think of a hugely original bot for entertainment purposes either, I bounced several ideas off of friends (without exploring fully first how the bot.js worked) which included
Banter Bot : One that responds to tweets with the hashtag "#madlads" with "What an absolute ledge"
Shot bot : One that periodically tweets and retweets #screenshot saturday images
ballbot : One that tweets Football slang in a similar manner to the joke form the IT crowd.

I ended up creating the ballbot in a simplistic manner, I never intended to go forward further with this bot idea as it seemed very limited. However, I used the concept to navigate my understanding of the bot.js file as I made it alter the drawings and text for the tweets.

Part 2 : What am I making?

I decided with commit #2 what I was going to make, a bot that would make up fake movie titles. The idea came simply from discussing with people the generic nature of Hollywood blockbuster titles and taglines. Uncertain how to make the bot green, but still keen on making a bot that could fake film titles. I experimented strongly with tracery and used cheapbotsdonequick.com to play around with the tracery grammar.


I don't think a list of what makes a bad artifact is necessarily all that useful, as it would change depending on what the generator is planning to make. 
but the ultimate key I feel, is relevance of constraints.
Initially I made a simplistic bot in cheapbotsdonequick that made movie titles based on random adjectives, verbs and nouns but each constraing (noun/verb/adjective) weren't relevant to each other and so they created boring titles. By boring I mean that they were neither funny nor real sounding which was my intention, so I had to pull the constraints in a tighter and more relevant way in order to create nice sounding titles. 
You can see in my grammar.js file that I seperated variables such as Entity, Verb, Noun etc so that they were relevant to the type of movie they were faking. Essentially the optimisation for randomizing things is to focus your randomisation in a way that is specific to your generation.

Part 3 : Add External Data

I wanted to pool in actual reviews for the tweet text for this section. I generally think that user generated reviews are not particularly good most of the time... Otherwise they'd be film critics. And User reviews are obviously based on that users individual bias, horror fans are more likely to forgive a bad horror movie and give it a favourable review. I used this unofficial API http://imdb.wemakesites.net/ to search for films by searching for film companies based on the genres they make and then randomly pick a film from that company. Then pull up a user review and display it on a tweet, I even managed to implement it such that it takes the star rating and masks over a 5 star rating image to display the appropriate amount of stars on the poster.

Adding the external data did not effect my opinion on my own constraints necessarily, as the review is separate to the title, although it did make me consider that I could pull variables from my constraints and use them to modify the review (Swap out the real title for my fake title etc).
