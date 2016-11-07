PS3 MDDN 342 2016

This is my first experiment changing bot.js to output something different. It displays the frequency of letters in a passage of text.

### Rough process
- Get a random paragraph of [Bacon Ipsum](http://baconipsum.com/) using their API
- Remove all non-alphabetic characters (numbers, special characters, etc)
- Count frequency of each letter in text
- Display the frequency of each letter as the size of each inner circle
- Return the first sentence as the message

### Note
This requires a server to run. I used Python's simple http server. In python 2.0, cd to the directory and type `python -m SimpleHTTPServer` and visit [localhost:8000](http://localhost:8000/) or the specified port.
