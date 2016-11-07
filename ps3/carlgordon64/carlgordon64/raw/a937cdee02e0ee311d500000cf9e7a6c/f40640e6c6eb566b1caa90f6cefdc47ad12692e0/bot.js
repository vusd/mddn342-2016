function bot() {
  this.url = 'https://query.yahooapis.com/v1/public/yql?q=select%20item.forecast%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22wellington%2Cnz%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
  this.weatherData;
  this.temperatures = [];
var daycount = 0;
var seeded =0;

var findShelter = false;
var x;
var y;
var easing = 0.05;
var night;
 var d = new Date();
var n = d.getHours();
if(n=>18){
//6pm onwards
daycount=1;

}
var hp=100;
  var charX2;
  var charY2;

  var charX;
  var charY;

  var zombX;
  var zombY;

  var foodX;
  var foodY;
  var findFood = false;

var shelterX;
var shelterY;

  var chaserdiffX;
  var chaserdiffY;

  var zombiediffX;
  var zombiediffY;

  var shelterdiffX;
  var shelterdiffY;

var fooddiffX;
var fooddiffY;
 
   var inspire = ["you live on to fight another day","Nothing can touch you"];
 var death=random(inspire);

var isHidden=false;
var isDead=false;
var isDetect=false;

   var hidden = [""];
 var ninja=random(hidden);
  //status
   var incognito = ["they can't see me here","I think it's safe here","the path ahead looks safe"];
     var inshelter = ["Its nice in here","I might have to stay a while","i better rest up here for a bit"];
     var eating = ["the food protects you temporarily","time to rest up"];

   var insight = ["they are getting closer","you come face to face with the beast","I can hear heavy breathing nearby","you're being hunted","a silent croaking sound stops you in your tracks.","You spot a pair of eyes gazing at you through the corn..","I can hear something tracking my scent"];
   var attack = ["it swipes at you with long claws","it leaps out and bites you with sharp fangs","you feel a quick swipe at your legs!"];
//chaser collision
var risk =random(incognito);

  var collision = false;
 //filters to decide story plot
 var spinarray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var spin = random(spinarray);
var spin2 = random(spinarray);
var spin3 = random(spinarray);
//early-morning shades
var day1 = color(0,111,73);
var day2 = color(18,84,56);
var day3 = color(32, 47, 30);
//morning shades
var day4 = color(86, 111, 0);
var day5 = color(64, 74, 20);
var day6 = color(28, 48, 25);
//afternoon shades
var day7 = color(0, 128, 0);
var day8 = color(0, 100, 0);
var day9 = color(20, 70, 0);
//night shades
var day10 = color(0, 53, 52);
var day11 = color(19, 72, 69);
var day12 = color(0, 40, 46);
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

    console.log(this.temperatures);
  }

  this.isDone = function() {
    return true;
  }
  this.grammar = {
    "travelState": ["travelling","investigating"],
    "animal": ["bird","animal","creature","sun","night-watcher","shadowy-figure"],
    "reaction": ["vexing","perplexing","exciting","wistful","enigmatic"],
    "prediction": ["prediction", "forecast", "prognostication"],
    "timeunit": ["day", "night"],
    "gender": ["he","she","it"],
    "describe": ["he","she","it"],
    "verb": ["leaped","crouched","hid","jumped","slid","sprinted","tiptioed","crawled","sprawled"],
    "adjective": ["furiously", "crazily", "quietly","hastely","on all fours"],
    "direction": ["up", "down", "around"],
    "observation": ["but its too early to run away", "but there were signs of struggle","It was an exhausting night.","I'm sure i'll come by some shelter soon","my bones were too frozen to run far","the air was ice cold","there was an eeire silence in the corn"],
     "observation2": ["the sun started flooding the maze","the icy gorund was sterting to melt","its a miracle I survived the night","the ground is wet with dew", "I must escape today","there are strange footprints in the dew","but today was the day","there was a musty odour in the air","shivers went down my spine"],
      "observation3": ["I should find shelter immediately", "but my instincts told me RUN!","but anything could be waiting around the next turn.","but how did I wake up here?","I'm sure i'll come by some shelter soon","there was a musty odour in the air","shivers went down my spine"],
       "observation4": ["but there is something creeping around out here", "but the sign read 'go back now'","but how did I wake up here?","I'm sure i'll come by some shelter soon","there was a musty odour in the air","shivers went down my spine"],
           "deathstring": ["The creature drags you into the hedge", "I should have gone back","It was all a dream","I guess this is it","shivers went down my spine"],
              "hidestring": ["They wont see me","Im a ghost"],
                 "detectstring": ["I really dont feel safe here","I think the corn has eyes"],
    "location": ["bushes", "creepers", "garden","hedge","next turn","last safe place","shadows"],
    "chance": ["there was a glimpse at escapse", "there was a bright light shining up ahead","there were strange markings in the dirt"],
    "risk": ["nothing to lose.", "everything to lose.", "everything to gain.","everything to lose.","a slim chance at getting out","a slim chance at getting out","eaten away at my faith","chased me long enough","nowhere to run"],
    "ending": ["but it only lead to more maze.","when suddenly... it all made sense.", "and luckily there was an opening.", "there was no possible way out.","but there was no way through the hedge.","the way back was long forgotten.","it was as if escape was never an option","I was put here for a reason","there was nothing but hedge for miles.","I must be getting close to an exit!"]
  }
 
  this.maze= function(){
    //conditionals to workout time
    //colour scheme will change along with survival risks

//TIME CYCLE
    //night
    if(n<=5){
    background(day3);
    var mazewall1 = day1;
    var mazewall2 = day2;
    night="early-morning";
  }
    if(n>5&&n<=11){
    background(day6);
    var mazewall1 = day4;
    var mazewall2 = day5;
    night="morning";
  }
    if(n>11&&n<=17){
      background(day9);
    var mazewall1 = day7;
    var mazewall2 = day8;
    night="afternoon";
  }
   if(n>17){
    background(day12);
    var mazewall1 = day10;
    var mazewall2 = day11;
    night="night";
  }
//
      
      push();
      //move start ponts of the maze rows up and off the screen
      translate(0,-10);
      //options limit complexity of the maze
 var options = [1, 2,3];
 //scale should be set to 2 or less when travelling and 3 when investigating something 
     //travelling or investigating boolean
for( y=0; y < height; y+=20){
    for( x=0; x < width; x+=20){
      var tile_selection = random(options);
      if(tile_selection == 1){
        stroke(mazewall1);
        for(h=0; h<=10; h++){
          for(h2=0; h2<=2; h2++){
            strokeWeight(1);
        line(x+h2,y+h,x+20+h2,y+20+h);

      }
      }
      stroke(40);
      strokeWeight(0.5);
      line(x,y,x+20,y+20);
      } else {
        stroke(mazewall2);
        for(j=0; j<=10; j++){
          for(j2=0; j2<=2; j2++){
            strokeWeight(1);
        line(x+20+j2,y+j,x+j2,y+20+j);
      }
      }
      strokeWeight(0.5);
      stroke(40);
       line(x+20,y,x,y+20);
     }
   }
  } 

  pop();

}
this.character= function(){
//character colour could change on respawn?
  stroke(0, 103, 187);
  //legs
  strokeWeight(2);
  line(-3, 3, -3, 13);
  line(3, 3, 3, 13);
  strokeWeight(2);
  //neck
  stroke(255, 212, 185);
  line(0, -11, 0, 0);

  //head
  noStroke();
  fill(255, 212, 185);
  rect(-4, -19, 8, 10);

  //body
  noStroke();
  fill(0, 103, 187);
  ellipse(0, 4, 14, 14);

  //clothes
  fill(80);

  //eyes
  fill(255);
  strokeWeight(1);
  ellipse(-3, -12, 4, 2.5);
  ellipse(3, -12, 4, 2.5);
  fill(25);
  ellipse(-3, -12, 2, 2);
  ellipse(3, -12, 2, 2);
  stroke(0, 103, 187);

 }

  
  //MONSTER CHARACTER / CHASER
  this.monster= function(){
       stroke(40);
  //legs
  strokeWeight(2);
  line(-3,3,-3,13);
  line(3,3,3,13);
   strokeWeight(1);
  //body
   fill(94,99,79);
  ellipse(0,0-2,12,14);
  //head
  stroke(40);
   fill(94,99,79);
  ellipse(0,0-12,9,10);
  //clothes
  fill(80);
  
  //eyes
  fill(255);
  ellipse(-3,-12,4,2.5);
  ellipse(3,-12,4,2.5);
  fill(25);
  ellipse(-2,-12,2,2);
  ellipse(2,-12,2,2);
      stroke(80);
 //arms
  strokeWeight(2);
  line(-5,-5,-10,-3);
   line(5,-5,10,-3);
  }
  //END MONSTER
    //FOOD RESOURCE
  this.food= function(){
      fill(200, 0, 0);
  stroke(200, 0, 0);
  ellipse(-1, 1, 10, 10);
  ellipse(11, 1, 10, 10);
  ellipse(5, 5, 10, 10);
  strokeWeight(5);
  line(-3, 3, 5, 13);
  line(13, 3, 5, 13);
}
   //SHELTER
  this.shelter= function(){
    fill(56,54,33);
    stroke(94,99,79);
  strokeWeight(3);
  for(o=0;o<=20;o++){
  rect(0-o,0-o,40,40);
}

 fill(40);
   stroke(80);
   noStroke();
  beginShape();
  //bot l
vertex(10, 40);
//bot r
vertex(30, 40);
//top r
vertex(15, 25);
//top l
vertex(-5, 25);
endShape();
//line details
stroke(20);
//inside door line
line(10, 38,10, 27);
strokeWeight(1);
line(-2, 40,-22, 20);
line(40, 40,22, 20);
//floor line
line(41, 0,41, 40);
//
line(40, -2,22, -20);
//roof line
line(-22, -20,-22, 20);

line(-22, -21,20, -21);
//smaller
line(-18, -18,-18, 18);
line(-18, -18,18, -18);

line(0, 41,40, 41);





  fill(255);
}
  this.respond = function() {
        var travel = [1,2,3,4,5,6];
    var travelspin = random(travel);
    //calculates scale of the maze and character for zoom ins
    if (travelspin <4) {
      //travelling true
var zoom = 1.3;

    }else{
      //travelling false
var zoom = 2.3;
    }
     //storymode
 //storymode helps decide when shelter/food/monster gets drawn
 if(spin>="4"&&spin<="8"){
var storymode = 2;
}
 if(spin<="3"){
var storymode = 1;
}
 if(spin>="9"){
var storymode = 0;
}
 //
    push();
scale(zoom);
this.maze();

pop();
push();
//could decrease these width and height ranges to simulate fatigue or injuries
//lower ranges limit the area the character can travel each turn 
  charX2 = 10+random(width-20);
  charY2 = 10+random(height-40);
  translate(charX2,charY2);
  scale(zoom/2);
this.character();
pop();

//ZOMBIE SPAWN
//logic for deciding when to draw zombies 
if(storymode==2||storymode==1){
push();
//zombie ranges should be decreased with character ranges to increase the zombies likliness of attacking
 charX = 10+random(width-20);
   charY = 10+random(height-40);
   if(chaserdiffX<50&&chaserdiffY<50){
translate(charX2,charY2);
if (findShelter==false&&findFood==false) {
hp=50;

collision = true;
risk =random(attack);
}else{
  hp=100;

collision = false;
risk =random(eating);
}
  

  }
  else{
  translate(charX,charY);
}
  scale(zoom/2);
this.monster();
pop();

}else{
  charX = 300;
   charY = 300;
}
//ZOMBIE 2
//logic for deciding when to draw zombies 
if(spin<=5){
push();
zombX = 10+random(width-20);
  zombY = 10+random(height-40);
  if(zombiediffX<50&&zombiediffY<50){
translate(charX2,charY2);
if (findShelter==false&&findFood==false) {
hp=50;

 collision = true;
 risk =random(attack);
}else{
  hp=100;

collision = false;
risk =random(eating);
}
  }else{
  translate(zombX,zombY);
}
  scale(zoom/2);
this.monster();
pop();

}else{
 zombX = 300;
  zombY = 300;
}

//FOOD SPAWN
if(spin>1){
push();
//these ranges control the likliness of consuming food / potion
  foodX = 10+random(width-20);
  foodY = 10+random(height-40);
  if(fooddiffX<50&&fooddiffY<50){
translate(charX2,charY2);
findFood=true;
 risk =random(eating);

}else{
  translate(foodX,foodY);
}
  scale(zoom/3);
this.food();
pop();
}

//logic for deciding when to draw shelter
//draw shelter
if(spin>6){
push();
//these ranges control the likliness of finding shelter
   shelterX = 10+random(width-20);
   shelterY = 10+random(height-40);
   if(shelterdiffX<50&&shelterdiffY<50){
  translate(charX2,charY2);
  findShelter=true;
  risk =random(inshelter);
}else{
  translate(shelterX,shelterY);
}
  var deg = 45;
  var rad = radians(deg);
  rotate(rad);
  scale(zoom/2);
this.shelter();
pop();
}
    var num_owls = Math.floor(focusedRandom(5, 11, 3, 7));
    var spacing = 400 / num_owls;
    for (i=0; i<num_owls; i++) {
      var xpos = 35 + spacing * i;
      var gray = int(focusedRandom(0, 102, 3))
      var scalar = focusedRandom(0.15, 0.75, 2);
}


var genderRand1 = ["male", "female", "unknown"]; 

 var activegen1 = random(genderRand1);
//decicive conditionals for the story
//gender
 if(activegen1=="male"){
 var activegen = "he";
 }else if(activegen1=="female"){
var activegen = "she";
 }else if(activegen1=="unknown"){
var activegen = "it";

 }

 textSize(14);
 push();
 //position health bar
translate(-10,0);
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
// set have_drawn to true since we have completed
    this.have_drawn = true;

 // construct the message
    var grammar = tracery.createGrammar(this.grammar);
    var seed2 = " as soon as "+activegen+" saw the #animal# ";
    if(night=="early-morning"){
     var seed4 = "#observation#";
   }
    else if(night=="morning"){
     var seed4 = "#observation2#";
   }
    else if(night=="afternoon"){
     var seed4 = "#observation3#";
   }
    else if(night=="night"){
     var seed4 = "#observation4#";
   }
     var seed5 = "#chance#";
    var seed = activegen + " #verb# #adjective# #direction# to the #location#";
    var end = "#ending#";
    var seed3 = activegen + " knew "+activegen+" had #risk#" ;
    var message = grammar.flatten(seed);
    var opener = grammar.flatten(seed2);
    var observe = grammar.flatten(seed4);
     var hope = grammar.flatten(seed5);
    
    var body = grammar.flatten(seed3);
    var conclusion = grammar.flatten(end);

   

//food distance
 if (charX2 > foodX){
     fooddiffX= charX2-foodX;
 }
  else{
     fooddiffX= foodX-charX2;
  }
  //shelter y distance
 if (charY2 > foodY){
     fooddiffY= charY2-foodY;
 }
  else{
     fooddiffY= foodY-charY2;
  }
   var spottedFood = ["they can't see me here","I think it's safe here","the path ahead looks safe"];
  



 //shelter distance
 if (charX2 > shelterX){
     shelterdiffX= charX2-shelterX;
 }
  else{
      shelterdiffX= shelterX-charX2;
  }
//shelter y distance
   if (charY2 > shelterY){
     shelterdiffY= charY2-shelterY;
 }
  else{
      shelterdiffY= shelterY-charY2;
  }
   spottedShel = ["they can't see me here","I think it's safe here","the path ahead looks safe"];
  



 
//CHASER DISTANCE TRACKER
 //monster x distance
 if (charX2 > charX){
     chaserdiffX= charX2-charX;
 }
  else{
      chaserdiffX= charX-charX2;
  }
//monster y distance
   if (charY2 > charY){
     chaserdiffY= charY2-charY;
 }
  else{
      chaserdiffY= charY-charY2;
  }
//


//need to define the state of the chaser to: incognito, insight or attack based on the distance between him and our character
//ZOMBIE & CHASER DETECTION PARAMETERS

   //very-close Y and semi-close X
 if(zombiediffX<90&&zombiediffX>0 || chaserdiffX<90&&chaserdiffX>0 ){

  if(zombiediffY<90&&zombiediffY>0 || chaserdiffY<90&&chaserdiffY>0 ){
risk =random(insight);
/*
var detectseed = "#detectstring#";
detect = grammar.flatten(detectseed);
isDetect=true;
*/
 }
}else{
  risk =random(incognito);
  /*
  var hideseed = "#hidestring#";
ninja = grammar.flatten(hideseed);
isHidden=true;
*/
}
if(zombiediffX<50&&zombiediffY<50  || chaserdiffX<50&&chaserdiffY<50){
  
risk =random(attack);


}
 //ZOMBIE DISTANCE TRACKER
 //zombie x distance
 if (charX2 > zombX){
     zombiediffX= charX2-zombX;
 }
  else{
     zombiediffX= zombX-charX2;
  }
//zombie y distance
   if (charY2 > zombY){
     zombiediffY= charY2-zombY;
 }
  else{
     zombiediffY= zombY-charY2;
  }


//stats
//return " Temprature:"+"<br> Days survived: "+  daycount+"<br> hours survived: "+n+"<br> Nighttime?: "+night+"<br> shelter x dist: "+shelterdiffX+"<br> shelter y dist: "+shelterdiffY+"<br> chaser x dist: "+chaserdiffX+"<br> chaser y dist: "+chaserdiffY+"<br> zombie x dist: "+zombiediffX+"<br> zombie y dist: "+zombiediffY+"<br> food x dist: "+fooddiffX+"<br> food y dist: "+fooddiffY+"<br> zombie attack: "+collision+"<br> shelter: "+findShelter+"<br> food pickup: "+findFood+"<br> storymode: "+storymode;
 //paragraph
    // return " "+risk+"<br> "+observe+"<br> "+opener + "" +message+ "<br> " +body+ "<br> "+hope+"<br>"+conclusion+"<br>"+ninja+"<br>"+death;
/*
  if(isDetect==true){
return(conclusion+"<br>"+detect);
}
if(isHidden==true){
return(observation+"<br>"+risk+"<br>"+ninja);
}
if(isDead==true){
return(death);
}
*/
  //console status
  return " Detection: "+risk+"<br> Days survived: "+  daycount+"<br> hours survived: "+n+"<br> Nighttime?: "+night+"<br> shelter x dist: "+shelterdiffX+"<br> shelter y dist: "+shelterdiffY+"<br> chaser x dist: "+chaserdiffX+"<br> chaser y dist: "+chaserdiffY+"<br><br> zombie x dist: "+zombiediffX+"<br> zombie y dist: "+zombiediffY+"<br> food x dist: "+fooddiffX+"<br> food y dist: "+fooddiffY+"<br> zombie attack: "+collision+"<br> shelter: "+findShelter+"<br> food pickup: "+findFood+"<br> storymode: "+storymode;
 
  }
}

