PS3 MDDN 342 2016

==================
|     ISSUES     |
==================

~ NO ISSUES ~

==================
|     SOLVED     |
==================

- Player's pokemon draws without Y Offset, can't detect transparent pixels due
  to security issues because of images being requested from another domain.

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

-----

Added a stage, attempting to get offset for the player's pokemon to work correctly
by seeing what pixel rows are transparent - not working yet

-----

- Added firebase to `index.html` so I can start storing info for a campaign.
- Changed theme from 'Emerald' to 'Black & White' to giver better sprites therefore
  eliminating previous issue (Still using Emerald BG becuase it is 2D)
