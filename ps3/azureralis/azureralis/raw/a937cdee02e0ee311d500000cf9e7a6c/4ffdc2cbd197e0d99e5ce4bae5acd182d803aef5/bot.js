var image_name;
var openimg;
var windowsize = 150;
var framesize = 8;
var pix;
var loaded = false;

function bot() {
  this.have_drawn = false;
  this.image_url = 'http://loremflickr.com/1080/720/art'

  this.creature = function(x, y, s) {
    push();
    noStroke();
    ellipseMode(CENTER);
    translate(x, y);
    scale(s);  // Set the createCanvas
    //Shadow
    fill(75, 80);
    ellipse(0 ,60/s , 75, 15);
    //Body
    fill(200);
    ellipse(0 ,0 , 75, 75);
    fill(250);
    ellipse(0 ,-2/s , 73, 73);
    //Eye
    var eyeposx = floor(random(-10, 10));
    fill(75)
    ellipse(eyeposx ,0 , 35, 35);
    //Iris
    fill(25)
    ellipse(eyeposx,0 , 15, 15);
    pop();
  }

  this.window = function(x ,y){
    push();
    rectMode(CENTER);
    noStroke();
    fill(75);
    rect(x, y+3, windowsize,windowsize);
    image(pix, x-windowsize/2, y-windowsize/2);
    fill(125);
    rect(x+windowsize/2-framesize/2, y, framesize, windowsize);
    rect(x-windowsize/2+framesize/2, y, framesize, windowsize);
    rect(x, y+windowsize/2-framesize/2, windowsize, framesize);
    rect(x, y-windowsize/2+framesize/2, windowsize, framesize);
    pop();

  }

  this.plant = function(x ,y, height){
    push();
    noStroke();
    colorMode(HSB);
    translate(x, y);
    push();
    colorMode(RGB);
    fill(50, 80);
    ellipse(0, 0, 50, 15);
    pop();
    push();
    stroke(8, 58, 34);
    strokeWeight(5);
    line(0, -20, 0, -height);
    pop();
    fill(10, 79, 58);
    quad(18, 0, 26, -26, -26, -26, -18, 0);
    push();
    translate(0, -2);
    fill(10, 79, 80);
    quad(18, 0, 26, -26, -26, -26, -18, 0);
    pop();
    scale(1);
    fill(76, 55, 60);
    ellipse(0, -height, 50, 50);
    pop();
  }

  this.drawbg = function(hue){
    push();
    noStroke();
    colorMode(HSB);
    fill(hue, 61 ,91);
    rect(0, 0, width, height*0.8);
    fill(hue-3, 56, 100);
    rect(0, height*0.8, width, height*0.2);
    pop();
  }

  this.created = function(){
    graphics = createGraphics(openimg.width/2, openimg.height/2);
    graphics.image(openimg, 0, 0, graphics.width, graphics.height);
  
    pix = graphics.get(floor(random(graphics.width-150)), floor(random(graphics.height-150)), 150, 150);
    loaded = true;
  }

  // return true if image has been loaded
  this.isDone = function() {
    return this.loaded;
  }

  // load all external images or data
  this.preload = function() {

  }

  this.setup = function() {
    // chose a random set of data from the list of data
    openimg = createImg(this.image_url, this.created);
  }

  this.grammar = {
    "description": ["strange","unusual","confused","aloof","menacing", "excited", "indifferent", "absent", "keen", "silent", "noisey"],
    "type": ["traveller","local","suspect","organism","carbon-based lifeform", "visitor", "enthusiast", "observer"],
    "reaction": ["enjoying", "disliking", "appreciating"],
    "first": ["John", "Steve", "Thomas", "Jack", "Jake", "Jackson", "Ben", "Tom", "Doug", "Chris", "Amy", "Sophie", "Lucy", "Adam", "Sarah", "Samantha", "Lewis", "Sacha", "Taylor", "Alex", "James"],
    "last": ["Jack", "Preston", "Grey", "Smith", "Bond", "Williams", "Dubois", "Hansen", "Jensen", "Johansson", "Müller", "Borg", "Novák", "Milevski", "Ozturk", "Ivanov"],
    "title": ["Untitled", "The", "Or", "Perhaps", "Wander", "Unless", "Imagine"],
    "medium": ["Acrylic", "Oil", "Water Colour", "Ink", "Pencil", "Crayon", "Marker", "Etching"],
    "material":["Wood", "Canvas", "Leather", "Marble", "Stainless Steel", "Plastic", "Paper", "Ice", "Cardboard", "the Ground"]
  }

  this.respond = function() {
    if(loaded){
      var winx = random(80, 360);
      if(winx > 220){
        var plantx = random(80, 220);
      }else if (winx < 220){
        var plantx = random(220, 360);
      }
      var planty = random(-5,20);
      var hue = floor(random(1, 360));
      var pop = floor(random(5));
      var crex = floor(random(60,100));

      this.drawbg(hue);
      this.window(winx, 90);
      this.plant(plantx, 180+ planty, 90);
      for(var i = 0; i < pop; i++){
        var crey = floor(random(-5, 5));
        var scalar = focusedRandom(0.4, 0.75, 2);
        this.creature(random(crex, 100)*(i+1), 140+crey, scalar);
      }

      // construct the message
      var grammar = tracery.createGrammar(this.grammar);
      if(pop == 1){
        var seed = "" + pop +" #description# #type# #reaction# " + "1." + "#first# #last# | #title# |" + " (" + floor(random(1800, 2200)) + ") " + "#medium# on #material# 150px x 150px"  ;
      }else if(pop > 1){
        var seed = "" + pop +" #description# #type#s #reaction# " + "1." + "#first# #last# | #title# |" + " (" + floor(random(1800, 2200)) + ") " + "#medium# on #material# 150px x 150px"  ;
      } 
      else if (pop == 0){
        var seed = "There seems to be noone here today";
      }
      var message = grammar.flatten(seed);
      return message;
    }
  }
}
