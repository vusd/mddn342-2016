var closedImages = [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg",
    "image4.jpg",
    "image5.jpg"
];

var closedData = [
    "Aim for the stars, or something",
    "At least you tried your best",
    "At the end of the day there's always toast",
    "If at first you don't swim, cry",
    "You can't judge a fish by its humour"
];

function bot() {
    // Has the image finished drawing?
    this.finished = false;
    
    // The Flickr API key
    this.apiKey = "3e5954b4fbe5a56d910af5d2a01a92c5";
    
    // The Flickr search URL to use (append search term)
    this.url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + this.apiKey + "&per_page=1&format=json&safe_search=1&content_type=1&nojsoncallback=1&text="; // "landscape"
    
    // Store the Flickr search response
    this.flickrData;
    
    // Flickr image URL
    this.image;
    
    // Store the generated message
    this.message;
    
    // Temporary keywords to pull from
    this.keywords = [
        "landscape",
        "sunset",
        "beach",
        "tropical"
    ];
    
    // Is the bot finished?
    this.isDone = function() {
        return this.finished;
    }

    // Load external images and data
    this.preload = function() {
        var image_name = random(closedImages);
        println(image_name);

        // load the image the variable img
        this.image = loadImage(image_name)
        
//        console.log("preload()");
//        
//        // Get the image
//        $.ajax({
//			url: this.url + "landscape",
//			type: 'GET',
//			success: function (response) {
//                var photoData = response.photos.photo[0];
//                var farm = response.photos.photo[0].farm;
//                var server = response.photos.photo[0].server;
//                var id = response.photos.photo[0].id;
//                var secret = response.photos.photo[0].secret;
//
//                var imageUrl = 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '_b.jpg';
//                
//                this.image = loadImage(imageUrl);
//                image(this.image);
//
//                console.log("Image received: " + imageUrl);
//                console.log(this.image);
//			},
//			timeout: 5000
//        });
//        
//        this.image = loadImage("rainy.jpg");
//        
//        console.log("preload() done");
    }

    // Format data and generate text
    this.setup = function() {
        console.log("setup()");
                
        
        
        console.log("setup() done");
    }
    
    // Draw to canvas and generate response text
    this.respond = function() {
        //console.log("respond()");
        
        image(this.image, 0, 0);
        text("hello", 0, 0);
        
        return random(closedData);        
    }
}