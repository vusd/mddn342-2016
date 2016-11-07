/* function bot() {
  this.url = 'https://query.yahooapis.com/v1/public/yql?q=select%20item.forecast%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22wellington%2Cnz%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
  this.weatherData;
  this.temperatures = [];
} */
 // images for the background
var closed_images = [
  "obama-a.jpg",
  "obama-b.jpg",
  "obama-c.jpg",
  "obama-d.jpg"
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
  this.owl = function(x, y, g, s) {
    push();
    translate(x, y);
    scale(s);  // Set the createCanvas
    stroke(g); // Set the gray value
    strokeWeight(70);
    line(0, -35, 0, -60); // Body
    noStroke();
    fill(255-g);
    rect(-17.5, -65, 35, 35); // Left eye dome
    rect(17.5, -65, 35, 35);  // Right eye dome
    arc(0, -65, 70, 70, 0, PI);  // Chin
    fill(g);
    ellipse(-14, -65, 8, 8);  // Left eye
    ellipse(14, -65, 8, 8);   // Right eye
    quad(0, -58, 4, -51, 0, -44, -4, -51); // Beak
    pop();
  }

  // return true if image has been drawn
  this.isDone = function() {
    return this.have_drawn;
  }

  // load all external images or data
  this.preload = function() {
    // chose a random image from the list
    var image_name = random(closed_images);
    println(image_name);

    // load the image the variable img
    this.img = loadImage(image_name)
  }

  this.setup = function() {
    // chose a random set of data from the list of data
    this.temperatures = random(closed_data);
    println(this.temperatures);
  }

  this.grammar = {
    "animal": ["bird","animal","creature","hawk","night-watcher"],
    "reaction": ["smiling","perplexing","exciting","wistful","enigmatic"],
    "timeunit": ["day", "night"]
  }

  this.respond = function() {
    // draw the background image
    image(this.img);

    // chose how many owls to draw
    var num_owls = Math.floor(focusedRandom(5, 11, 3, 7));

    // draw the owls based on the data in temperatures
    var spacing = 400 / num_owls - 2;
    for (i=0; i<num_owls; i++) {
      var xpos = 35 + spacing * i;
      var gray = int(focusedRandom(0, 102, 3))
      var scalar = focusedRandom(0.15, 0.75, 2);
      this.owl(xpos, 220-2*this.temperatures[i], gray, scalar);
    }

    // set have_drawn to true since we have completed
    this.have_drawn = true;

    // construct the message
    var grammar = tracery.createGrammar(this.grammar);
    var seed = " #timeunit# #reaction# #animal.s#";
    var message = grammar.flatten(seed);
    return message;
  }
}