
var closed_dates = [
  "Coming January",
  "Coming this December",
  "Coming Soon",
  "Coming this valentines day",
  "Coming straight to VHS"
];

var closed_companies = {
  "horror" : ["co0137447", //Twisted pictures
              "co0098315",  //Blumhouse
              "co0084207"], //Vertigo
  "scifi" : ["co0009119", //Amblin entertainment
              "co0159111"],
  "romcom" : ["co0005073"] //Universal (Will produce inconsistent results)
};

var backgroundColors = [
  "#CEA8F4",
  "#A3FEBA",
  "#9999FF" ,
  "#FF9797",
  "#B89AFE"
];

var images = {
};

var timer = 0;
//this system is currently overly complex, but allows for individual drawings rather than just image loads
var drawObjects = {
  "blob" : function(x){
    noStroke();
    fill("#997379");
    ellipse(x,100,80);
    fill("#89676c");
    ellipse(x+10,120,60);
    fill("#997379");
    ellipse(x+18,70,45);
  },
  "hunter" : function(x){
    imageMode(CENTER);
    image(images.beartrap, x, 100);
  },
  "nurse" : function(x){
    imageMode(CENTER);
    image(images.nurse, x, 100);
  },
  "wraith" : function(x){
    imageMode(CENTER);
    image(images.wraith, x, 100);
  },
  "reaper" : function(x){
    imageMode(CENTER);
    image(images.reaper, x, 100);
  },
  "alice" : function(x){
    imageMode(CENTER);
    image(images.alice, x, 100);
  },
  "anastasia": function(x){
    imageMode(CENTER);
    image(images.anastasia, x, 100);
  },
  "christian": function(x){
    imageMode(CENTER);
    image(images.christian, x, 100);},
  "jack": function(x){
    imageMode(CENTER);
    image(images.jack, x, 100);
  },
  "timothy": function(x){
    imageMode(CENTER);
    image(images.timothy, x, 100);
  },
  "the heart emoji": function(x){
    imageMode(CENTER);
    image(images.heart, x, 100);
  },
  "the wink emoji": function(x){
    imageMode(CENTER);
    image(images.wink, x, 100);
  },
  "the rose": function(x){
    imageMode(CENTER);
    image(images.rose, x, 100);
  },
  "the holiday": function(x){
    imageMode(CENTER);
    image(images.rose, x, 100);
  },
  "man": function(x){
    imageMode(CENTER);
    image(images.man, x, 100);},
  "woman": function(x){
    imageMode(CENTER);
    image(images.woman, x, 100);},
  "robot": function(x){
    imageMode(CENTER);
    image(images.robot, x, 100);},
  "mars": function(x){
    imageMode(CENTER);
    image(images.mars, x, 100);},
  "beyond": function(x){
    imageMode(CENTER);
    image(images.space, x, 100);},
  "the black lagoon" : function(x){
    imageMode(CENTER);
    image(images.lagoonBlack, x, 100);},
  "the grand lagoon" : function(x){
    imageMode(CENTER);
    image(images.lagoonGold, x, 100);},
  "the eternal lagoon" : function(x){
    imageMode(CENTER);
    image(images.lagoonBlue, x, 100);},
  "the golden lagoon" : function(x){
    imageMode(CENTER);
    image(images.lagoonGold, x, 100);},
  "the deep lagoon" : function(x){
    imageMode(CENTER);
    image(images.lagoonBlue, x, 100);},
};

var masks = []


function bot() {

  // make this true once image has been drawn
  this.have_drawn = false;

  // return true if image has been drawn
  this.isDone = function() {
    return this.have_drawn;
  }

  // load all external images or data
  this.preload = function() {
    // chose a random image from the list

    this.movieFont = loadFont('Orbitron Medium.ttf');
    this.taglineFont = loadFont('Roboto-Regular.ttf');
    this.traceryResult = tracery.createGrammar( grammar ).flatten("#origin#");
    this.genre =  this.traceryResult.split('$SPLIT$')[1];

    this.review = this.getReview( this.genre );

    this.starImg = loadImage("star.png");
    masks = [];
    for(var i = 1; i < 11; i++){
      masks[i] = loadImage("starMask-"+i+".png");
    }
    images.beartrap = loadImage("bear-trap.png");
    images.nurse = loadImage("nurse.png");
    images.wraith = loadImage("wraith.png");
    images.reaper = loadImage("reaper.png");

    //*Designed by Freepik from www.flaticon.com* //MAKE SURE YOU CREDIT THIS
    images.alice = loadImage("alice.png");
    images.anastasia = loadImage("anastasia.png");
    images.timothy = loadImage("timothy.png");
    images.christian = loadImage("christian.png");
    images.jack = loadImage("jack.png");
    images.rose = loadImage("rose.png");
    images.man = loadImage("man.png");
    images.woman = loadImage("woman.png");
    images.robot = loadImage("robot.png");
    images.mars = loadImage("mars.png");
    images.space = loadImage("space.png");

    //Icon made by http://www.flaticon.com/authors/madebyoliver from www.flaticon.com 
    images.heart = loadImage("heart.png");
    images.wink = loadImage("wink.png");


    //Icon made by http://www.flaticon.com/authors/alfredo-hernandez from www.flaticon.com
    images.lagoonBlue = loadImage("lagoonBlue.png");
    images.lagoonBlack = loadImage("lagoonBlack.png");
    images.lagoonGold = loadImage("lagoonGold.png");

  }

  this.setup = function() {
    // return the message
    var title,
        tagline;

    this.title = this.traceryResult.split(':')[0];
    this.tagline = this.traceryResult.split(':')[1].split('$SPLIT$')[0];
    this.drawObjectOne = this.traceryResult.split('$SPLIT$')[2].toLowerCase();
    this.drawObjectTwo = this.traceryResult.split('$SPLIT$')[3].toLowerCase();
    timer = 0;
  }

  this.drawPoster = function(title, tagline){
    background(random(backgroundColors));
    textAlign(CENTER);
    //textFont(this.movieFont);
    noStroke();
    fill(0);
    textSize(20);
    text(title, 220,30);
    //imageMode(CENTER);
    //image(this.starImg, 220,130);
    textSize(12);
    text(tagline,220,180);
    text( random(closed_dates) , 220,200);

    drawObjects[this.drawObjectOne](150);
    drawObjects[this.drawObjectTwo](300);


  }

  //Locates a random movie from a company that specialises in the appropriate genre. and pulls its review http://imdb.wemakesites.net/ using this api
  this.getReview = function( genre ) {
    var companies;
    $.getJSON(
        "http://imdb.wemakesites.net/api/" + random( closed_companies[ genre ] ) ,
        function(response){
          companies = response;
        }
      );
    console.log(companies);
    var film = loadJSON("http://imdb.wemakesites.net/api/" + random( companies.data.filmography ).id);
    this.review = film.data.review;
    this.titleID = film.data.id;
    this.generatebitlyLink();
  }

  this.generatebitlyLink = function(){
    var imdbURL = "http://www.imdb.com/title/" + this.titleID + "/";
    var bot = this;
    var func = function(response){
      bot.shortURL = response;
      bot.shortURL = bot.shortURL.substring(7)
    }
    $.getJSON(
        "http://api.bitly.com/v3/shorten?callback=?", 
        { 
            "format": "json",
            "apiKey": "R_97be122193404c19a84555a90e98cc0d",
            "login": "o_6v25k0dh8d",
            "longUrl": imdbURL
        },
        function(response)
        {
            func(response.data.url);
        }
    );
  }

  this.respond = function() {
    
    var message = this.title;
    this.drawPoster( this.title, this.tagline );
    
    message += "\nNo reviews found";
    if(timer > 1000){
      return message;
    }

    if ( this.review === undefined ) {
      timer++;
      return message;
    }else {
      if(this.review === null){
        this.review = undefined;
        this.getReview(this.genre);
        return message;
      }
      this.have_drawn = true;
    }
    message = this.title;

    if(this.review.rating !== null){
      message += "\n" + this.review.rating;
    }
    message += "\n"
    var index = 0;
    while(message.length < 100){
      message += this.review.text.split('.')[index];
      index++;
    }

    message = message.substr(0,100);
    message += "...";
    message += "\nSee more: " + this.shortURL;
    if(this.review.rating !== null){
     this.starImg.mask( masks[ parseInt( this.review.rating.substring(0,2) ) ]);
      var starRating = image(this.starImg, 220, 50);
    }




    return message;
  }

  
}


