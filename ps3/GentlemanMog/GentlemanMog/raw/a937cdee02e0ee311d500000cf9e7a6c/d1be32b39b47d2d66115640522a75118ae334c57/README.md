PS3 MDDN 342 2016

#Updates#
Updated Graphical Display, this now displays more like the old "whos that pokemon" segment of the anime.

Detailed message now displays the a random fact within the discription string.

Loaded sprite is now a silhouette.

rearranged dicription message to split the dex entry into sentences then output a randon fact

#Bugs/things to do#
The bot doesn't determine if the randomized version variable is within the pokemon dex entry array e.g. If version "yellow" exsists inside the dex entries.

The bot doesn't re-roll the detail variable that determines the display message if the randomized variable out puts the text "" which is a result of the dex entry spliting the end of the full description.

Currently the description is being split apart via "." and doesnt facter in spaces either side nor does it split at "," if the entry contains only the end "."

The randomized pokemon data is not dertermined by anything just a random number.