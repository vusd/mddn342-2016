// images for the background
var closed_images = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg"
]

// 10 day high temperature forecast
var closed_data = [
  "Let go of your dreams",
  "Just stay down",
  "Things don't get better",
  "Life is short",
  "Things fall apart"
  ]

var sImg;

function bot() {
  // make this true once image has been drawn
  this.have_drawn = false;

    // helper function to draw an owl
    this.ship = function(x, y) {
    push();
    translate(x, y);
    rectMode(CENTER);
    fill(255);
    stroke(0);
    strokeWeight(2);
    triangle(0,-50,9,-21,-9,-21);
    rect(0,0,20,40);
    fill(255,70,1,175);
    strokeWeight(0);
    triangle(-13,40,-9,20,9,20);
    triangle(13,40,-9,20,9,20);
    triangle(0,50,7,20,-7,20);
    fill(97,158,255,175);
    strokeWeight(2);   
    ellipse(0,0,15,15);
  pop();
  }
  
  // return true if image has been drawn
  this.isDone = function() {
    return this.have_drawn;
  }

  // load all external images or data
  this.preload = function() {
    // chose a random image from the list
    var spaceData = loadJSON("http://api.open-notify.org/astros.json", this.getData, 'jsonp');
    //Changable Img
    var spaceImg = 'https://api.nasa.gov/planetary/apod?api_key=vQSr8wmvI04yACO8Rharqa9vvdFzNiRyYrN4BWja'
    var imgData = loadJSON(spaceImg, this.getImage);
   
  }

  this.getImage = function(data){

    this.something = data;
    sImg = createImg(something.url);

  }

  this.getData = function(data){

    spaceData = data;
    println(spaceData.people[1].name);
  }

  this.setup = function() {


  }

  this.respond = function() {
    // draw the background image
    image(sImg, 0 , 0, 440, 220);

    var num_ships = spaceData.number;
    var spacing = 440 / num_ships;
    for (i = 0; i < num_ships; i++) {
      var xpos = 70 + spacing * i;
      this.ship(xpos, height/2);
    }

    // set have_drawn to true since we have completed
    this.have_drawn = true;
    var nameSt = "";
    for (i=0; i < spaceData.number; i ++){
        nameSt = nameSt + spaceData.people[i].name + ", ";
    }
    // return the message
    var message = "there are currintly " + spaceData.number + " people in space these people are " + nameSt;
    return message;
  }
}