/* function bot() {
  this.url = 'https://query.yahooapis.com/v1/public/yql?q=select%20item.forecast%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22wellington%2Cnz%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
  this.weatherData;
  this.temperatures = [];
} */
 // images for the background
var closed_images = [
  "o1.jpg",
  "o2.jpg",
  "o3.jpg",
  "o4.jpg"
]

// 10 day high temperature forecast
var closed_data = [
  [20, 22, 24, 22, 24, 22, 20, 15, 10, 15],
  [30, 29, 27, 25, 25, 23, 22, 22, 23, 20],
  [10, 12, 10, 12, 10, 12, 10, 12, 10, 12]
]	

var hits_pb = [
   [1, 3, 5, 10, 4, 2]	,
   [0, 3, 10, 15, 4, 1],
   [9, 5, 12, 20, 3, 7]
]
var pre_baked = [
  ["US","President","Obama","Congress"]	
]

function bot() {
  // make this true once image has been drawn
  this.have_drawn = false;
  

  // helper function to draw an owl
  this.hawk = function(x, y, c, c2, s) {
    push();
    translate(x, y);
    scale(s);  // Set the createCanvas
    stroke(c2); // Set the gray value
    strokeWeight(70);
    line(0, -35, 0, -40); // Body
    noStroke();
    fill(c);
    rect(-17.5, -65, 35, 35); // Left eye dome
    rect(17.5, -65, 35, 35);  // Right eye dome
    arc(0, -65, 70, 70, 0, PI);  // Chin
    fill(c2);
    ellipse(-14, -65, 8, 8);  // Left eye
    ellipse(14, -65, 8, 8);   // Right eye
    quad(0, -58, 4, -51, 0, -44, -4, -51); // Beak
	quad(0, -58, 4, -51, 0, -44, -4, -60);//wing
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
   // println(image_name);

    this.img = loadImage(image_name);
  }

  this.setup = function() {
    // chose a random set of data from the list of data
    this.temperatures = random(closed_data);
	this.hits = random(hits_pb);
	this.heads = pre_baked;
    //println(this.temperatures);
  }

  this.grammar = {
    "animal": ["Sparrow","Hawk","night-watcher"],
    "reaction": ["Smiling","Perplexed","Excited","Wistful","Enigmatic"],
    "timeunit": ["Day", "Night", "Midday"]
  }

  this.respond = function() {
	 
    // draw the background image
    image(this.img, 0, 0, width, height);

    // chose how many owls to draw
    var num_hawks = Math.floor(focusedRandom(5, 11, 3, 7));

    // draw the owls based on the data in temperatures
    var spacing = 400 / num_hawks;
    for (i=0; i<num_hawks; i++) {
      var xpos = 35 + spacing * i;
      var col = color(255, 214, 29);
	  var col2 = color(120, 60, 4);
      var scalar = focusedRandom(0.15, 0.75, 2);
      this.hawk(xpos, 220 - 2 * this.hits[i], col, col2, scalar);
	  //var size = this.temperatures[i];
	  //textSize(size);
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