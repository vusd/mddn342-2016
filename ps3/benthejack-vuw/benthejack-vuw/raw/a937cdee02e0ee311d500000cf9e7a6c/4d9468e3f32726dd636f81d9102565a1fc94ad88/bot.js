// images for the background
var quotes = null;

var closed_images = [
  "penis1.png",
  "penis2.png",
  "penis3.png",
  "penis4.png",
  "penis5.png",
  "penis6.png",
  "penis7.png",
  "penis8.png",
  "penis9.png"
];


function bot() {

  // make this true once image has been drawn
  this.have_drawn = false;

  // return true if image has been drawn
  this.isDone = function() {
    return this.have_drawn;
  }

  // load all external images or data
  this.preload = function() {
    // chose a random image from the list
    var image_name = random(closed_images);
    
    if(quotes == null) {
       quotes = loadJSON('quotes.json');
    }

    toiletFont = loadFont("toilet_font.TTF");

    println(image_name);

    // load the image the variable img
    this.img = loadImage(random(closed_images));
  }

  this.setup = function() {
    // chose a random set of data from the list of data
  }

  this.respond = function() {
    // draw the background image


   image(this.img, 0, 0, width, height);
   textSize(20);
   textAlign(CENTER);
   textFont(toiletFont);
   var chosen_quote = Math.floor(random(closed_images.length));
   var actual_quote = quotes[chosen_quote];
   text(actual_quote, 0, 0,width, height);

   
    return actual_quote;
  }
}
