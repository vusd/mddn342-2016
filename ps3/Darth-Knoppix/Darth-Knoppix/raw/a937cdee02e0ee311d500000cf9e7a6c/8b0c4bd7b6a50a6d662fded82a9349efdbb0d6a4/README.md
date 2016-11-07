#PS3 MDDN 342 2016

##ISSUES

~ NO ISSUES ~

##SOLVED

- Player's pokemon draws without Y Offset, can't detect transparent pixels due
  to security issues because of images being requested from another domain.


-----
###Idea
-----

My idea is to use the pokemon data from corpora (https://github.com/dariusk/corpora/blob/master/data/games/pokemon.json).
I saw this and thought it could be interesting to show a battle between two pokemon
like in the games however it would be through the twitter bot.

I have some basic image loading working and random pokemon being selected.

I would like to eventually have a complete system where a battle can occur over
the course of a few posts. Some stretch goals include pokemon selection by poll
through twitter and eventually supporting a 'campaign' where the pokemon levels up.

This can get very complex very quickly but I am interested to see how people respond
to this idea and I want to see how far I can push it.

The artifact is a image of a typical battle screen in the Pokemon games, the properties
are as follows:
- Enemy Pokemon/Competitor
  - Health
  - Level
- Player Pokemon

The Pokemon will be randomly selected along with some basic stats i.e. level and health.
The stage and level will be determined by weather data. I would like to adjust the level
based on the number of #pokemon_name, found on twitter however the API is not powerful enough.
By adding weather data, It allows for greater variation however I would have liked to add more
relevant data through twitter or a more user interactable medium.

-----

Added a stage, attempting to get offset for the player's pokemon to work correctly
by seeing what pixel rows are transparent - not working yet

-----

- Added firebase to `index.html` so I can start storing info for a campaign.
- Changed theme from 'Emerald' to 'Black & White' to giver better sprites therefore eliminating previous issue (Still using Emerald BG becuase it is 2D)

-----

- Cleaned up some stats retreival for annoying names i.e. Mr. Mime (Removed '.')
- Added Level and can type numbers on screen using pokemon font

-----

- Text working (Mostly), need to add gender and look at punctuation

-----

- Added weather based stage select
