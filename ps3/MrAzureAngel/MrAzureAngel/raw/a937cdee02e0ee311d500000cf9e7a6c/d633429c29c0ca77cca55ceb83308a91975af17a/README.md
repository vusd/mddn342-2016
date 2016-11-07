PS3 MDDN 342 2016

GVR - AKA - MrAzureAngel

This is my final entry for project 3 for Creative Coding 3
----------------------------------------------------------

What my bot does : 
Using a JSON file on spaceapi.net containing over 200 links to api's of the status
of hackerspaces, my bot chooses a random one of those and tells you what their status
is (active or inactive, open or close) based on their JSON file. It also prints out their
logo and a shot from their cam.
Sadly due to limitations of my knowledge I was unable to get past letting the browser access
this second level of JSON files without it giving me a restricted access error message.
I attempted to store the URL file locally as well as converting the target url's and
replacing all \/ with //, but it would not work. In the end I used 1 of the URL's and 
hard coded it into the bot just to it will work. It will still provide live info as they
update their status, but it wont pick a random one sadly. 
Lastly, my bot checks the current image of the day according to NASA (as this is a hack
space bot) and places it as the background live.

Initial thoughts
-----------------

I came into this project like a dog wearing a labcoat and the lab being on fire. I have
never really worked much with JSON, APIs or anything like that. but I found the project
interresting. I wish I had more time to devote to it, but after this project it looks
like i will have more time to continue on some of the ideas. 

Part 2 : What am I making?
--------------------------

I wanted to create a simple bot that would post a random thought about what a person's status
could be and then show helpful images for that state. I used a basic online image return site
and chose a few catagories (constraints) for the topics. Each topic would have a hard coded response and then reveal a bunch of images related to it. What I found was that sometimes the same image would be loaded and sometimes the website would not return an image, making the post less valuable as intended artifact. Using more scenarios and generating more images could fix this and make it more interresting. 

Part 3 : Excitement of external data
-------------------------------------

For my first test I grabbed 4 random images (free ones) of Chuck Norris and made an API call to grab a random joke to print as the message. I then wanted to take it a step further and access more complex data sources. I found a site that lists hackerspaces and their details, location, contact details etc etc. I am not too sure of the legality of using physical addresses for these, so I decided to only use their logo, a cam image and their name and current status. My new and final bot would return a random hackerspace from the list of over 200 and display their status as the message. It would then place 2 images over the background image (A simple image of the day from NASA for the space theme) one of the cam and one of the logo.
My earlier constraints were too focussed on random images within a catagory that may or may not be relevant. For example, the "feeling sad" state would show you pictures of cats, but sometimes those cats were angry or annoyed and not very good to cheer you up. With adding very specific imagery, the bot makes more sense. 
The text that the bot responds with is more relevant as well, giving information that changes rather than obviously scripted responses. I could have taken this a lot further, but I am not knowledgeable enough yet with data manipulation of this sort. Look forward to learning though!
