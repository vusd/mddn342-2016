var image_name;
var windowsize = 100;

// images for the background
var closed_images = [
  "image1",
  "image2",
  "image3",
  "image4"
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
    noStroke();
    ellipseMode(CENTER);
    translate(x, y);
    scale(s);  // Set the createCanvas
    fill(150);
    ellipse(0 ,60 , 75, 15);
    fill(250);
    ellipse(0 ,0 , 75, 75);
    fill(75)
    ellipse(10 ,-5 , 35, 35);
    fill(25)
    ellipse(12 ,-7 , 15, 15);
    pop();
  }

  this.window = function(x ,y, frame){
    push();
    rectMode(CENTER);
    noStroke();
    fill(255);
    image(this.img, x-windowsize/2, y-windowsize/2);
    fill(75);
    rect(x+windowsize/2, y, 5, windowsize);
    rect(x-windowsize/2, y, 5, windowsize);
    rect(x, y+windowsize/2, windowsize, 5);
    rect(x, y-windowsize/2, windowsize, 5);
    pop();

  }

  this.drawbg = function(){
    push();
    noStroke();
    println("background")
    colorMode(HSB);
    fill(4, 61 ,91);
    rect(0, 0, width, height*0.8);
    fill(9, 56, 100);
    rect(0, height*0.8, width, height*0.2);
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
    this.img = loadImage(image_name + ".png");
  }

  this.setup = function() {
    // chose a random set of data from the list of data
    this.temperatures = random(closed_data);
    println(this.temperatures);
  }

  this.grammar = {
    "description": ["strange","unusual","confused","aloof","menacing"],
    "type": ["traveller","local","suspect","organism","carbon-based lifeform"],
    "reaction": ["enjoying", "disliking", "appreciating"]
  }

  this.respond = function() {
    // draw the background image
    var winx = random(80, 360);

    this.drawbg();
    this.window(winx, 90, this.img);
    this.creature(80, 140, 245, 1);


    // set have_drawn to true since we have completed
    this.have_drawn = true;

    // construct the message
    var grammar = tracery.createGrammar(this.grammar);
    var seed = "1 #description# #type# #reaction# " + image_name;
    var message = grammar.flatten(seed);
    return message;
  }
}
