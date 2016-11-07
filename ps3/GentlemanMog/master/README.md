Online Chatbot Project

##Fun Fact Pokemon Generator##
This artifact produces a random fact on a random pokemon from a random version of the game, and also generates the fact based on the detailed description of that pokemon. This pulls from the pokeApi which is a datatbase full of eveything pokemon, It's just a neat way to learn fun facts about the world of pokemon.

##Constraints##
There were various constraints I had to abide by.
There were a versions that didnt exsist in the pokemon entry, this created various amounts of bugs.

Splitting the descriptions into sentances were, and still are, that didn't split up nicely. e.g. if the discription contained a space at the end of the final full stop it would display nothing. Sometimes there were no full stops inbetween the start and end of the descriptions, however I couldn't acomidate for that as the data entries looked to be hand written.

Most pokemon didn't have other sprites, other than the front so I couldn't randomize that.

Since the version names were hand-written and not automated, the version names would be different from the randomized version name as the rng version is static, e.g. black-2 could be also written as black2

##Solution##
To accomidate for the bad artifacts I would have to use an external database that can seperate the names/description sections that are not entire sentances, or should be sentances, e.g. Seperate entryes that consist of two word rather than one "thisisnotaSentance" would write "this is not a sentance".
I would also have the databases dynamically loaded (which i tried to do outside of preload) so that I am only pulling from one json file e.g. get url inside a json file and load that json section.
I would also have the randomized version have dynamic entries in the array rather than static ones that I have types so that there is always a valid version name match.
