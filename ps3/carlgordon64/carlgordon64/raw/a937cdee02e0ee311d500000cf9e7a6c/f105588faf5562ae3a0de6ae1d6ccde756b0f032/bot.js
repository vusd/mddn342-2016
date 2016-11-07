function bot() {
  this.url = 'https://query.yahooapis.com/v1/public/yql?q=select%20item.forecast%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22wellington%2Cnz%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
  this.weatherData;
  this.temperatures = [];
var daycount = 0;
var seeded =0;
var hp=0;
/*
  this.owl = function(x, y, g, s) {
    push();
    translate(x, y);
    scale(s);  // Set the createCanvas
    stroke(g); // Set the gray value
    strokeWeight(70);
    line(0, -35, 0, -65); // Body
    noStroke();
    fill(255-g);
    ellipse(-17.5, -65, 35, 35); // Left eye dome
    ellipse(17.5, -65, 35, 35);  // Right eye dome
    arc(0, -65, 70, 70, 0, PI);  // Chin
    fill(g);
    ellipse(-14, -65, 8, 8);  // Left eye
    ellipse(14, -65, 8, 8);   // Right eye
    quad(0, -58, 4, -51, 0, -44, -4, -51); // Beak
    pop();
  }*/
 //filters to decide story plot
 var spinarray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var spin = random(spinarray);
var spin2 = random(spinarray);
var spin3 = random(spinarray);

this.stats = function(){


}


  this.preload = function() {
    this.weatherData = loadJSON(this.url);
  }

  this.setup = function() {
    var results = this.weatherData["query"]["results"]["channel"];
    for(var i=0;i<results.length;i++) {
      var forecast = results[i]["item"]["forecast"]
      var pair = [
        parseInt(forecast["low"], 10), parseInt(forecast["high"], 10)
      ]
      this.temperatures.push(pair)
    }
    /*
    for(i=0;i<10;i++) {
      this.temperatures.push([40, 40]);
    }
    */

    console.log(this.temperatures);
  }

  this.isDone = function() {
    return true;
  }
  this.grammar = {
    "travelState": ["travelling","investigating"],
    "animal": ["bird","animal","creature","owl","night-watcher"],
    "reaction": ["vexing","perplexing","exciting","wistful","enigmatic"],
    "prediction": ["prediction", "forecast", "prognostication"],
    "timeunit": ["day", "night"],
    "gender": ["he","she","it"],
    "verb": ["leaped","crouched","hid","jumped","slid"],
    "adjective": ["furiously", "crazily", "quietly"],
    "direction": ["up", "down", "around"],
    "location": ["place", "dining hall", "garden"],
    "risk": ["nothing to lose.", "everything to lose.", "everything to gain.","everything to lose."],
    "ending": ["but it only lead to another door.", "luckily there was an opening.", "there was no possible way out.","the way back was long forgotten."]
  }
  this.maze= function(){
    background(0,60,0);
      strokeWeight(1);
      push();
      //options limit number of maze
 var options = [1, 2, 3,4];
 //scale should be set to 2 or less when travelling and 3 when investigating something 
     //travelling or investigating boolean

      for( y=0; y < height; y+=20){
    for( x=0; x < width; x+=20){
      var tile_selection = random(options);
      if(tile_selection == 1){
        stroke(0,130,0);
        for(h=0; h<=10; h++){
          for(h2=0; h2<=2; h2++){
        line(x+h2,y+h,x+20+h2,y+20+h);
      }
      }
      } else {
        stroke(0,100,0);
        for(j=0; j<=10; j++){
          for(j2=0; j2<=2; j2++){
        line(x+20+j2,y+j,x+j2,y+20+j);
      }
      }
     }
   }
  } 

  pop();

}
this.character= function(){
//character colour could change on respawn?
    fill(255,80,0);
    stroke(255);
  strokeWeight(6);
  line(0,0,0,0+9);
  strokeWeight(2);
  line(0-7,0+3,0+7,0+3);
  line(0-3,0+13,0+3,0+13);
  strokeWeight(1);
  ellipse(0,0-2,10,10);
  }
  this.respond = function() {
        var travel = [1,2,3,4,5,6];
    var travelspin = random(travel);
    //calculates scale of the maze and character for zoom ins
    if (travelspin <4) {
var zoom = 1.3;

    }else{
var zoom = 2.3;
    }
    push();
scale(zoom);
this.maze();
pop();
push();
  var charX = 10+random(width-20);
  var charY = 10+random(height-40);
  translate(charX,charY);
  scale(zoom/2);
this.character();
pop();
this.stats();
    var num_owls = Math.floor(focusedRandom(5, 11, 3, 7));
    var spacing = 400 / num_owls;
    for (i=0; i<num_owls; i++) {
      var xpos = 35 + spacing * i;
      var gray = int(focusedRandom(0, 102, 3))
      var scalar = focusedRandom(0.15, 0.75, 2);
     // this.owl(xpos, 220-2*this.temperatures[i][1], gray, scalar);
      //this.plant(xpos, 220-2*this.temperatures[i][1], scalar);

}
// set have_drawn to true since we have completed
    this.have_drawn = true;

var genderRand1 = ["male", "female", "unknown"]; 

 var activegen1 = random(genderRand1);
//decicive conditionals for the story
//gender
 if(activegen1=="male"){
 var activegen = "he";
 var hp=140;
 }else if(activegen1=="female"){
var activegen = "she";
var hp=160;
 }else if(activegen1=="unknown"){
var activegen = "it";
var hp=150;
 }
 //storymode
 if(spin<"5"){
var storymode = 1;
}else{
  var storymode = 0;
}
 //
 textSize(14);
 push();
 //position health bar
translate(width/2,0);
   //HEALTH BAR
   noStroke();
   fill(255);
   text(hp,45,height-27);
stroke(255);
fill(255);
for(j=0;j<=hp;j++){
ellipse(40+j,height-17,8,8);
fill(200,0,0);
ellipse(40+j,height-17,5,5);
}
//hearticon
fill(0,0,0);
noStroke();
fill(255);
ellipse(30,height-18,30,30);
fill(200,0,0);
stroke(200,0,0);
ellipse(24,height-20,10,10);
ellipse(36,height-20,10,10);
ellipse(30,height-15,10,10);
strokeWeight(5);
line(38,height-19,30,height-10);
line(21,height-19,30,height-10);
pop();
noStroke();

 // construct the message
    var grammar = tracery.createGrammar(this.grammar);



    

   // var seed = "" + num_owls + " #timeunit# #adjective# #animal.s# #prediction#";
    var seed2 = " as soon as "+activegen+" saw the #animal.s# ";
    var seed = activegen + " #verb# #adjective# #direction# towards the #location#";
    var end = "#ending#";
    var seed3 = activegen + " knew "+activegen+" had #risk#" ;
    var message = grammar.flatten(seed);
    var opener = grammar.flatten(seed2);
    
    var body = grammar.flatten(seed3);
    var conclusion = grammar.flatten(end);

    var d = new Date();
var n = d.getHours();
if(n=>20){
//8pm onwards
daycount=1;
}

var temp =(this.temperatures[i][1])-32*0.5556;


    return opener + "" +message+ "<br> " +body+ "<br> "+conclusion+"<br> Temprature: "+temp+ "<br> Days survived: "+  daycount+"<br> time survived: "+n;
    

    /*
    var message = "" + num_owls + " day weather owl forecast.";
    return message;*/
  }
}

