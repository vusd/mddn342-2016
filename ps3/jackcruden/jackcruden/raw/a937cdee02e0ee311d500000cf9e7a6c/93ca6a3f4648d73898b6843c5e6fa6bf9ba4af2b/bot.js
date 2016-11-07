var debug = false;

var theImage;

var closedFonts = [
    "font1.ttf",
    "font2.ttf",
    "font3.ttf",
    "font4.ttf",
    "font5.ttf"
];

var nouns;
var adjectives;
var verbs;

var imageKeywords = [
    "landscape",
    "scenery",
    "hills",
    "waterfall",
    "sunset",
    "tropical"
];

function randomWord(data) {
    if (typeof random(data) === 'string') {
        return random(data);
    } else {
        return random(data).word;
    }
}

function bot() {
    // Has the image finished drawing?
    this.have_drawn = false;
    
    // The font to use
    this.font;
    
    this.structures = [
        "always look on the [a] [n] of [n]s",
        "without [n]s there couldn't be [n]s",
        "at the end of the day, at least there's [n]s",
        "[a] [n]s make the world go round",
        "[n] is found when you [v] [n]",
        "believe in [n]s",
        "[v] hard, [v] big",
        "[v] it. [v] it. [v] it.",
        "[v] the life you dream",
        "[v] is my happy place",
        "[v], it's easier than [v]",
        "you deserve [a] [n]s",
        "don't call it a [n], call it a [n]",
        "nobody deserves [a] [n]s",
        "[v] doesn't help, if it's your soul that is tired",
        "we were like [n]s",
        "even the most [a] [n] can [v]"
    ];
    
    // Is the bot finished?
    this.isDone = function() {
        return this.have_drawn;
    }
    
    // Load external images and data
    this.preload = function() {
        console.log("preload()");
        
        var freq = 1000000;
        
        // Load the words
        nouns = loadJSON("http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=noun&minCorpusCount="+freq+"&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=4&maxLength=8&limit=100&api_key=969074d1d952767b09272094ec200bb89b9f2b93080b93f41");
        adjectives = loadJSON("http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=adjective&minCorpusCount="+freq+"&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=4&maxLength=8&limit=100&api_key=969074d1d952767b09272094ec200bb89b9f2b93080b93f41");
        verbs = loadJSON("http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=verb&minCorpusCount="+freq+"&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=4&maxLength=8&limit=100&api_key=969074d1d952767b09272094ec200bb89b9f2b93080b93f41");
        
        // Load the image
        var pictureData = loadJSON("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3e5954b4fbe5a56d910af5d2a01a92c5&per_page=1&format=json&safe_search=1&content_type=1&nojsoncallback=1&text=" + randomWord(imageKeywords), this.loadPictureURL);
        
        // Load the font
        this.font = loadFont(random(closedFonts));
        
        console.log("preload() done");
    }
    
    this.loadPictureURL = function(response) {
        console.log("loadPictureURL()");
                
        var photoData = response.photos.photo[0];
        var farm = response.photos.photo[0].farm;
        var server = response.photos.photo[0].server;
        var id = response.photos.photo[0].id;
        var secret = response.photos.photo[0].secret;

        var imageUrl = 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '_b.jpg';
        
        console.log("Image url: " + imageUrl);

        loadImage(imageUrl, function(img) {
            theImage = img;
        });

        console.log("loadPictureURL() done");
    }
    
    // Initial
    this.setup = function() {
        console.log("setup()");
                             
//        console.log(nouns);
//        console.log(adjectives);
//        console.log(verbs);
        
        console.log("setup() done");
    }
    
    // Draw to canvas and generate response text
    this.respond = function() {
        if (debug) console.log("respond()");

        // Construct message
        var message = '';
        var structure = random(this.structures);
        var words = structure.split(" ");
        $.each(words, function(i, word) {
            if (word.indexOf("[") < 0) {
                message += word;
            } else if (word.indexOf("[n]") >= 0) {
                var newWord = randomWord(nouns);
                message += newWord
                if (word.indexOf("s") >= 0 && newWord.indexOf("s") != newWord.length-1) {
                    message += "s";
                }
            } else if (word.indexOf("[a]") >= 0) {
                var newWord = randomWord(adjectives);
                message += newWord;
                if (word.indexOf("s") >= 0 && newWord.indexOf("s") != newWord.length-1) {
                    message += "s";
                }
            } else if (word.indexOf("[v]") >= 0) {
                var newWord = randomWord(verbs);
                message += newWord;
                if (word.indexOf("s") >= 0 && newWord.indexOf("s") != newWord.length-1) {
                    message += "s";
                }
            }
            
            // Insert space
            message += " ";
            
            //console.log(nouns);
        });
                
        // Draw the image
        image(theImage, 0, 0, 440, 220);
        
        // Draw the text backdrop
        noStroke();
        fill(color(0, 120));
        var third = Math.round(random(0, 2));
        rect(0, height/3*third, width, Math.max(height/3*third, height/3));
        
        // Set text style
        textSize(25);
        fill(255); // White
        textAlign(CENTER, CENTER);
        if (random() > 0.5) textStyle(ITALIC);
        textFont(this.font);
                
        // Draw the text
        text(message, 20, height/3*third, width-20, Math.max(height/3*(third-1), height/3));
        
        // We have finished drawing
        this.have_drawn = true;
        
        return message;
    }
}