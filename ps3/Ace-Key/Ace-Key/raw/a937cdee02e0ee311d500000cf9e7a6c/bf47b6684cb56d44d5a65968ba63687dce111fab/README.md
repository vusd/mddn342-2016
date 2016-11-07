PS3 MDDN 342 2016 - Obamabot Closed Iteration - 1

An Obamabot that uses some internal images of current US president Obama with some prebaked data to manipulate the imagery and 
text. The news site I am looking at using is the News API which creates a JSON query of multiple news sites. For this site, I 
have an api key that gives me access to the numerous data points.
The prebaked data is both strings and numbers that define the hits relating to the tags, 
as well as what key words I am searching for. Here I am assigning pre-baked data to both the internal images (of Obama)
and the created images of a hawk. These are based on the hits of the key_words.

My final manipulation will be that of the text that will appear, which I will probably randomise using headings from the top
articles mentioning US, president etc. At the moment it is just using tracery for some pre-determined sentences.

I want to get this to work first because there is a lot of data in the News API.
At least as a closed system I can control for factors that an open system may have issues with, such as latency or missing
data points.



