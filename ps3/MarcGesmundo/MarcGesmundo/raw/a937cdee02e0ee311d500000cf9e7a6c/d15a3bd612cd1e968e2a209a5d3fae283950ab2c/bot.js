function bot() {
  this.url = 'https://mcapi.ca/query/mc.minesuperior.com/info'
  //this.image_url = 'http://www.greylynnweather.net/jpgwebcam.jpg'
  this.minecraftData;
  this.have_drawn = false;

  this.draw = function(x, y, s, c) {
    push();
    translate(x, y);
    scale(s);  // Set the createCanvas
    r1 = 0;
    r2 = 0;
    r3 = 0;
    r4 = 0;
    g1 = 100;
    g2 = 125;
    g3 = 150;
    g4 = 175;
    b1 = 0;
    b2 = 0;
    b3 = 0;
    b4 = 0;
    if(c == 1){
      r1 = g1;
      r2 = g2;
      r3 = g3;
      r4 = g4;
      g1 = 0;
      g2 = 0;
      g3 = 0;
      g4 = 0;
    } 
    else if( c == 3){
      b1 = g1;
      b2 = g2;
      b3 = g3;
      b4 = g4;
      g1 = 0;
      g2 = 0;
      g3 = 0;
      g4 = 0;
    }
   
    //eyes
    fill(0);
    rect(10, 10, 10, 10);
    rect(30, 10, 10, 10);
    fill(0, g2, 0);
    //pattern
    noStroke();
    rect(0, 0, 10, 10);
    rect(40, 0, 10, 10);
    fill(r1, g1, b1);
    rect(10, 0, 10, 10);
    rect(30, 0, 10 , 10);
    fill(r4, g4, b4);
    rect(20, 0, 10, 10);
    fill(r2, g2, b2);
    rect(0, 10, 10, 10);
    rect(40, 10, 10, 10);
    fill(r3, g3, b3);
    rect(20, 10, 10, 10);
    rect(0, 20, 10, 10);
    rect(40, 20, 10, 10);
    fill(r4, g4, b4);
    rect(10, 20, 10, 10);
    rect(30, 20, 10 , 10);
    fill(r1, g1, 0);
    rect(20, 30, 10, 10);
    rect(0, 30, 10, 10);
    rect(40, 30, 10, 10);
    fill(r2, g2, b2);
    rect(10, 30, 10, 10);
    rect(30, 30, 10 , 10);
    fill(r3, g3, b3);
    rect(20, 30, 10, 10);
    rect(20, 40, 10, 10);
    rect(0, 40, 10, 10);
    rect(40, 40, 10, 10);
    fill(r4, g4, b4);
    rect(10, 30, 10, 10);
    rect(30, 30, 10 , 10);
    fill(r2, g2, b2);
    rect(20, 30, 10, 10);
    //mouth
    fill(0);
    rect(20, 30, 10, 10);
    rect(10, 30, 10, 10);
    rect(30, 30, 10, 10);
    rect(10, 40, 10, 10);
    rect(30, 40, 10, 10);
    rect(20, 20, 10, 10);
    pop();

  }

  this.isDone = function() {
    return this.have_drawn;
  }

  this.preload = function() {
    this.minecraftData = loadJSON(this.url);
  }

  this.setup = function() {
    //this.img = createImg(this.image_url);
    var results = this.minecraftData["ping"];
    
  }

  this.respond = function() {
    //if(this.img.width <= 0) {
      //text("loading", 100, 100);
      //return "loading";
    //}
    //image(this.img, 0, 0, 440, 220);
    var players = this.minecraftData.players.online
    background(0, players, 125);
    var spacing = 400 / players;
    if (players >= this.minecraftData.players.max){
      players = this.minecraftData.players.max;
    }
    for (i=0; i<players; i++) {
      //var xpos = 0 + spacing * i;
      var xpos = random(0, 400);
      var ypos = random(0, 190);
     // var col = focusedRandom(1, 2, 3);
      var col = int(focusedRandom(1, 4));
      var scale = random(0.3, 1);
      this.draw(xpos, ypos, scale, col);
      
    }
    this.have_drawn = true;
    var message = "" + players+ " Creepers will blow you up! Run!";
    return message;
  }
}
//Part 4
//Proposed extension capability 
//Add more creatures from the game to add variety and be able to give a string of 
//each amount of creatures that adds up to the total amount of creatures
//I want to add an animation of creepers exploding


