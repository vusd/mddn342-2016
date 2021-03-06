

function bot() {

    angleMode(DEGREES);
  // make this true once image has been drawn
  this.have_drawn = false;

  this.streets=function(ax1,ay1,ax2,ay2,colorstreet){

  noFill()
  stroke(255)
  strokeWeight(random(170,180))
  r1=-random(50,120);
  r2=random(50,120);
  i=0
    controlx1=round(ax1+random(r1,r2)*cos(random(0,360)))
    controly1=round(ay1+random(r1,r2)*sin(random(0,360)))
    controlx2=round(ax2+random(r1,r2)*cos(random(0,360)))
    controly2=round(ay2+random(r1,r2)*sin(random(0,360)))
    strokeWeight(random(2,9))
    bezier(ax1,ay1,controlx2,controly2,controlx1,controly1,ax2,ay2) 
    //ellipse(ax1,ay1,5,5)
    //ellipse(ax2,ay2,5,5)

}


  this.blocks = function(){
var linecolors = [
  [222,86,74],
  [89,198,213],
  [238,236,166]
]
    background(255);
      citycol=round(random(170,210));
      for(var i=0;i<10;i++){
          for(var j=0;j<10;j++){
            noStroke();
            push();
            translate((i*random(22))+110,(j*random(11))+55);
            rotate(round(random(0,90)));
            fill(citycol);
            sizebig=focusedRandom(40,60,55,45);
            rect(0,0,sizebig,sizebig);
            translate(random(20),random(20));
            sizesmall1=random(2,20);
            sizesmall2=random(2,20);
            noStroke();
            fill(linecolors[(round(random(2)))]);
            rect(0,0,sizesmall1,sizesmall2);
            pop();
            pop();
      }
    }
      this.streetgrid();
  }

  this.streetgrid=function(){
    for(var i=0;i<random(5);i++){
      xt1=0;
      yt1=random(220);
      xt2=440;
      yt2=random(220);
      this.streets(xt1,yt1,xt2,yt2,0);
    }
    for(var i=0;i<random(5);i++){
      xt1=random(440);
      yt1=0;
      xt2=random(440);
      yt2=220;
      this.streets(xt1,yt1,xt2,yt2,0);
    }

  }

  // return true if image has been drawn
  this.isDone = function() {
    return this.have_drawn;
  }
  this.preload = function() {}
  this.setup = function() {

  }

  this.grammar = {
    "sentance": ["#init##fin#"],
    "init": ["Yloik","Glon","Quay","Dread","Mol","Kru","Iklo","Eepru","Pall","Grime","Beak","Aether","Chro"],
    "fin": ["us", "ing","berg","er","dale","glen","haven","bourne","ford"]
  }

  this.respond = function() {

    this.blocks();

    // set have_drawn to true since we have completed
    this.have_drawn = true;

    // construct the message
    var grammar = tracery.createGrammar(this.grammar);
    var seed = " #sentance# ";
    var message = grammar.flatten(seed);
    return message;
  }




}