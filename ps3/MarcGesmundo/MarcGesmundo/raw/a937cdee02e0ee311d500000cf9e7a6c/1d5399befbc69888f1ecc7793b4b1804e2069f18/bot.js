function bot() {
  this.url = 'https://mcapi.ca/query/mc.minesuperior.com/info'
  //this.image_url = 'http://www.greylynnweather.net/jpgwebcam.jpg'
  this.minecraftData;
  this.have_drawn = false;

  this.draw = function(x, y, g, s) {
    push();
    translate(x, y);
    scale(s);  // Set the createCanvas
    //body
    fill(0, 200, 0);
    rect(0, 0, 50, 50);
    //eyes
    fill(0);
    rect(10, 10, 10, 10);
    rect(30, 10, 10, 10);
    fill(0, 125, 0);
    //pattern
    noStroke();
    rect(0, 0, 10, 10);
    rect(40, 0, 10, 10);
    fill(0, 100, 0);
    rect(10, 0, 10, 10);
    rect(30, 0, 10 , 10);
    fill(0, 175, 0);
    rect(20, 0, 10, 10);
    fill(0, 125, 0);
    rect(0, 10, 10, 10);
    rect(40, 10, 10, 10);
    fill(0, 150, 0);
    rect(20, 10, 10, 10);
    rect(0, 20, 10, 10);
    rect(40, 20, 10, 10);
    fill(0, 175, 0);
    rect(10, 20, 10, 10);
    rect(30, 20, 10 , 10);
    fill(0, 100, 0);
    rect(20, 30, 10, 10);
    rect(0, 30, 10, 10);
    rect(40, 30, 10, 10);
    fill(0, 125, 0);
    rect(10, 30, 10, 10);
    rect(30, 30, 10 , 10);
    fill(0, 150, 0);
    rect(20, 30, 10, 10);
    rect(20, 40, 10, 10);
    rect(0, 40, 10, 10);
    rect(40, 40, 10, 10);
    fill(0, 150, 0);
    rect(10, 30, 10, 10);
    rect(30, 30, 10 , 10);
    fill(0, 125, 0);
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
    for (i=0; i<players; i++) {
      var xpos = 0 + spacing * i;
      var gray = int(focusedRandom(0, 102, 3))
      var scalar = focusedRandom(0.15, 0.75, 2);
      var ypos = focusedRandom(0, 200, 0.5);
      this.draw(xpos, ypos, gray, 0.5);
      
    }
    this.have_drawn = true;
    var message = "" + this.minecraftData.players.online+ " Creepers will blow you up! Run!";
    return message;
  }
}
