var image_name;

// images for the background
var closed_images = [
  "spring",
  "summer",
  "autumn"
]

// 10 day high temperature forecast
var closed_data = [
  [20, 22, 24, 22, 24, 22, 20, 15, 10, 15],
  [30, 29, 27, 25, 25, 23, 22, 22, 23, 20],
  [10, 12, 10, 12, 10, 12, 10, 12, 10, 12]
]

function bot() {
  // make this true once image has been drawn
  this.have_drawn = false;

  // helper function to draw an owl
  this.creature = function(x, y, g, s) {
    push();
    translate(x, y);
    scale(s);  // Set the createCanvas
    image(this.creature_img);
    pop();
  }

  // return true if image has been drawn
  this.isDone = function() {
    return this.have_drawn;
  }

  // load all external images or data
  this.preload = function() {
    // chose a random image from the list
    image_name = random(closed_images);

    println(image_name);

    // load the image the variable img
    this.img = loadImage(image_name + ".png")
    this.creature_img = loadImage("strangelittleguy.png");
  }

  this.setup = function() {
    // chose a random set of data from the list of data
    this.temperatures = random(closed_data);
    println(this.temperatures);
  }

  this.grammar = {
    "description": ["strange","unusual","confused","aloof","menacing"],
    "type": ["travellers","locals","suspects","organisms","carbon-based lifeforms"],
    "reaction": ["enjoying", "disliking", "appreciating"]
  }

  this.respond = function() {
    // draw the background image
    image(this.img);

    // chose how many owls to draw
    var num = Math.floor(focusedRandom(5, 11, 3, 7));

    // draw the owls based on the data in temperatures
    var spacing = 400 / num;
    for (i=0; i<num; i++) {
      var xpos = 35 + spacing * i;
      var ypos = focusedRandom(10, 20, 20);
      var gray = int(focusedRandom(0, 102, 3))
      var scalar = focusedRandom(0.3, 0.75, 2);
      this.creature(xpos, 230-3*ypos, gray, scalar);
    }

    // set have_drawn to true since we have completed
    this.have_drawn = true;

    // construct the message
    var grammar = tracery.createGrammar(this.grammar);
    var seed = "" + num + " #description# #type# #reaction# " + image_name;
    var message = grammar.flatten(seed);
    return message;
  }
}
