PS3 MDDN 342 2016

# Bogus Science Generator

##### Artifact

My generator makes bogus scientific breakthrough claims.
This is in the form of some text overlayed on a relevant image to represent a
clickbait-style news item.

**Positive Qualities include:**
1. Image related to text.
2. A syntactically accurate sentence/statement.
3. A funny or surprising correlation between cause and effect

**Undesirable Qualities include:**
1. Malformed Sentences / bad formatting
2. Sentences which don't make sense

Techniques used to achieve desired output.
Using tracery to create sentences should give interesting and surprising results
if done well. This will include tokenising / breaking down sentences and into
useable sub components eg. items, animals, diseases, causes and effects.

An important consideration is to pluralise all items so as to create a general
syntax which will work syntactically in most/all situations.

Limiting the grammar to compatible sub components eg. eating clothes, with #action# #thing# where the action
makes some sense in relation to the thing.

##### Adding inputs
Initially I wanted to make the bot open through the use of sentence analysis APIs and existing news headlines. This turned out to not be feesible with most headlines due to the language used / limitations of the APIs.

I extracted the search terms using a language api to label the nouns (mashape text-api).
To make the closed bot into an open one I then used an external image API -
loremflickr which allowed me to query on the extracted nouns.

##### Contribution to discussion
https://github.com/vusd/p5bot/issues/8




---------
