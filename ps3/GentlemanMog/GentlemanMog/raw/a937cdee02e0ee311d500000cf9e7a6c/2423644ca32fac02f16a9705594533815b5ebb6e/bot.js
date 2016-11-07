

function bot() {
  this.twitchLiveUrl = 'http://tmi.twitch.tv/group/user/rush/chatters'
  
  this.pokeNameurl = 'http://pokeapi.co/api/v2/pokemon/';
  this.spriteUrl;

  // this.pokeImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + this.dexNumber + '.png'
  // this.pokeUrl = null;
  // this.twitchUrl = 'http://tmi.twitch.tv/group/user/rush/chatters';

  this.dexNumber = 1;
  this.twitchchatterData;
  

  this.pokeData;
  this.Vscale = 16;
  this.pokeData2;
  this.users = [];

  // this.pokeData = {};

  this.pokemon = [];
  this.pokeid = 40;
  // this.spriteWidth = 220;
  this.spriteSize = 220;
  this.haveDrawn = false;

  this.grammar = {
    "emotion": ["happy", "sad", "proud"],
    "reaction": ["vexing","perplexing","exciting","wistful","enigmatic"],
    "prediction": ["prediction", "forecast", "prognostication"],
    "timeunit": ["day", "night"]
  }
  

  // function isNumber(n){
  //   return !isNaN(parseFloat(n));
  // }

  // this.cleanup = function(name){
  //   return name.toLowercase().replace('♀', ' Female').replace('♂', ' Male');
  // };


  this.preload = function() {

    this.pokeid = random(1, 720);
    this.pokeid = Math.round(this.pokeid);

    this.pokeData = loadJSON(this.pokeNameurl + this.pokeid + '/');
    // this.twitchchatterData = loadJSON(this.twitchLiveUrl);
    

    // console.log(this.pokeData);
  }

  this.setup = function() {
    var nameData = this.pokeData;
    
    
    var sprite = nameData["sprites"];


    var thingy = nameData;

    var pair = [ 
      thingy["name"] , sprite["front_default"]
    ]
    this.pokemon.push(pair); 
    

    this.spriteUrl = pair[1];

    this.thumb = createImg(this.spriteUrl);
    this.img = loadImage(this.spriteUrl);
    

    
    
    console.log(this.pokemon[0]);
  }


  this.isDone = function() {
    return true;
  }

  this.respond = function() {
    imageMode(CENTER);
    
    
    this.img.loadPixels();
    
    loadPixels();

    for(y = 0; y < height; y++){
      for(x = 0; x < width; x++){
        var index = (x + y * width) * 4;
        var r = this.img.pixels[index];
        var g = this.img.pixels[index+1];
        var b = this.img.pixels[index+2];
    

        pixels[index+0] = r;
        pixels[index+1] = g;
        pixels[index+2] = b;
        pixels[index+3] = 255;
      }
    }
    updatePixels();

    image(this.img, width/2, height/2, 220, height);
  
     // construct the message
    var grammar = tracery.createGrammar(this.grammar);
    var seed = "#timeunit# #reaction# #emotion# #prediction#";
    var message = grammar.flatten(seed);
    return message;
  }
}
