var CrayonColours;
var GemstoneList;
var TeaList;
     var crayonName;

      // setting up imdb
     var closed_companies = 
             ["co0215519", //indian painbrush
              "co0048420", //Ghibli
              "co0366724",  //realitism films
              "co0142446",  // mandate pictures
              "co0040322",  // mr. mudd
              "co0378199"   // Diroriro (crystal fairy and the magical cactus)
            ] 
;



var orig_colour_options= [
  "color(89,214,255)",
  "color(255,241,89)",
  "color(255,89,186)"
]

var colour_options = [
  {"red": 255, "green": 255, "blue": 255},
  {"red": 89, "green": 214, "blue": 255},
  {"red": 255, "green": 241, "blue": 89},
  {"red": 255, "green": 89, "blue": 186}

]

// 10 day high temperature forecast
var closed_data = [
  [20, 22, 24, 22, 24, 22, 20, 15, 10, 15],
  [30, 29, 27, 25, 25, 23, 22, 22, 23, 20],
  [10, 12, 10, 12, 10, 12, 10, 12, 10, 12]
]

function bot() {

  var colRand;
  // make this true once image has been drawn
  this.have_drawn = false;

  
  // return true if image has been drawn
  this.isDone = function() {
    return this.have_drawn;
  }

  // load all external images or data
  this.preload = function() {

     this.crayonColours = loadJSON('crayon.json');
     this.GemstoneList = loadJSON('gemstone.json');
     this.TeaList = loadJSON('tea.json');
     this.getReview();
  
  }

   //Locates a random movie from a company that specialises in the appropriate genre. and pulls its review http://imdb.wemakesites.net/ using this api
   // this is coped code from tom lewis.
  this.getReview = function() {
    var bot = this;
    $.ajax({
        url: "http://imdb.wemakesites.net/api/" + random(closed_companies),
        crossDomain: true,
        dataType: "jsonp",
        success: function(data) {
          bot.movie = random(data.data.filmography).title;
        }
    });
  }


  this.randomCrayon = function(){
    var c = this.crayonColours;
    c = random(c);
   // c = color( c.hex.toString() );
    return c;
  }

//this is just closed data from the top
  this.randomColour = function(){
    var c = random(colour_options);
    var colour = color(c.red, c.green, c.blue);
   return colour;
  }

  this.Gradient = function(x, y, w, h, c1, c2){

   for (var i = y; i <= y+h; i++) { var inter = map(i, y, y+h, 0, 1);
    var c = lerpColor(c1, c2, inter); stroke(c); line(x, i, x+w, i); } 
  }


  this.setup = function() {
    this.temperatures = random(closed_data);
    this.baseColour

    
  }
	this.setGradent = function(){

    var crayon1 = this.randomCrayon();
    this.colour1 = color(crayon1.hex.toString());
    this.crayonName1 = crayon1.color;
     var crayon2 = this.randomCrayon();
    this.colour2 = color(crayon2.hex.toString());
    this.crayonName2 = crayon2.color;

	}

	this.getGem = function(){
		var gem = this.GemstoneList;
		gem = random(gem.gemstones);

		return gem;
	}

	this.getTea = function(){

		var tea = this.TeaList;
		tea = random(tea.teas);
		return tea;
	}
	

	this.drawCup = function(){
			push();
    translate(220, 110);
   // scale(s);  // Set the createCanvas
  //  stroke(g); // Set the gray value
    
 
 	rotate(-PI/2.75);
 	stroke(this.colour1);
    noFill();
    strokeWeight(18);
     arc(30, 74, 90, 90, 0, PI);

     rotate(PI/2.75);
	strokeWeight(2);
	   fill(this.colour2);
    //ellipse(0, 0, 100, 100); 
    arc(0, -50, 200, 250, 0, PI,CHORD);
   


    //arc(290, 60, 80, 80, PI, TWO_PI+HALF_PI); 
    //arc(320, 600, 160, 80, QUARTER_PI, PI+QUARTER_PI);
   // quad(0, -58, 4, -51, 0, -44, -4, -51); // Beak
    pop();


	}
  this.makeMessage = function(){

 //   var m = "orihegorhaepghrpiuehtgiuhreipguhrpiuehagpiuhipgurhapiudfhgipuahfgiuhraeiuhgrgytghiuqabeqrgiupabgfiuygareiupghareiuphgiuaprehgpiuahgiuprhaepiguhafipudghiuphregiuhaiuhgriuhreaipuhgiupheraiughaieuphgfipuaerhgiuhareiupghiuraehgiuaerhgipuraehgiupreahgiupaheriupghaiuerhgiuarehgipreahgipuaerhgpiuaehrgpiuerahgipuheragpiuhreapiughpiageurhgipreuahgaeiruphgriuahgriuh";
    var m = "#TeacupGeneration recommends: " + this.crayonName1 + " " + this.crayonName2 + " with " + this.getTea() +" tea in a " + this.getGem() + " cup";
   if( this.movie !== undefined ) {
      m += " while watching: " + this.movie;
        this.have_drawn = true; 
    
   }
    m += "!";     
  
    if(m.length <= 140){
 
    return m;
 }
 else{

  m = "#TeacupGeneration recommends: " + this.crayonName1 + " " + this.crayonName2 + " with " + this.getTea() +" tea in a " + this.getGem() + " cup!";
 this.have_drawn = true; 
return m;
}


  }


 this.respond = function() {
 	this.setGradent();

  	this.getGem();
  	

    this.Gradient(0,0,440,220,this.colour1,this.colour2);

    this.drawCup();


    var message = this.makeMessage();
 //   console.log(message.length);
     
if(message !== undefined){

  return message;}

  }

}