var closed_images = [
  "kappa.png",
  "pogchamp.jpg",
  "wutface.jpg",
  "biblethump.jpg"
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
    translate(x, y-40);
    scale(s);  // Set the createCanvas
    stroke(g); // Set the gray value
    image(this.twt);
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
    this.twt = loadImage("twitch.png");
    
  }

  this.setup = function() {
    // chose a random set of data from the list of data
    this.temperatures = random(closed_data);
    println(this.temperatures);
  }

  this.respond = function() {
    // draw the background image
    image(this.img);

    // chose how many owls to draw
    var num_owls = Math.floor(focusedRandom(5, 11, 3, 7));

    // draw the owls based on the data in temperatures
    var spacing = 400 / num_owls;
    for (i=0; i<num_owls; i++) {
      var xpos = 35 + spacing * i;
      var gray = int(focusedRandom(0, 102, 3))
      var scalar = focusedRandom(0.15, 0.75, 2);
      this.owl(xpos, 220-2*this.temperatures[i], gray, scalar);
    }

    // set have_drawn to true since we have completed
    this.have_drawn = true;

    // return the message
    var message = "Twitch Streaming: " + num_owls.toString() + " Hour/s ";
    return message;
  }
}

