var closed_versions = [
  "alpha-sapphire", "omega-ruby", "y", "x", "black-2", "white-2", "black", "white",
  "heart-gold", "soul-silver", "platinum", "pearl", "diamond", "leafgreen", "firered",
  "emerald", "sapphire", "ruby", "crystal", "silver", "gold", "yellow", "blue", "red"
];

var detail;
function bot() {
  this.twitchLiveUrl = 'http://tmi.twitch.tv/group/user/rush/chatters'
  
  this.pokeNameurl = 'http://pokeapi.co/api/v2/pokemon/';
  this.spriteUrl;
  this.dexEntryUrl = 'https://pokeapi.co/api/v2/pokemon-species/';

  // this.pokeImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + this.dexNumber + '.png'
  // this.pokeUrl = null;
  // this.twitchUrl = 'http://tmi.twitch.tv/group/user/rush/chatters';

  this.dexNumber = 1;

  this.twitchchatterData;
  

  this.pokeData;
  this.Vscale = 16;
  this.dexData;
 

  // this.pokeData = {};

  this.pokemon = [];
  this.pokeid = 40;
  // this.spriteWidth = 220;
  this.spriteSize = 220;
  this.haveDrawn = false;

  this.grammar = {
    "name": [],

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
    this.dexData = loadJSON(this.dexEntryUrl + this.pokeid + '/');

    // console.log(this.pokeData);
  }

  this.setup = function() {
    var nameData = this.pokeData;
    var descriptionData = this.dexData;
    
    
    var sprite = nameData["sprites"];
    var dexEntry = descriptionData["flavor_text_entries"];
    
    var language = "en";
    var rngVersion = random(closed_versions);
    
    for(var i = 0; i < dexEntry.length; i++){
      var versionData = dexEntry[i]["version"];
      var text_entry = dexEntry[i]["flavor_text"];
      var languageData = dexEntry[i]["language"];

      var data = [
        versionData["name"] , languageData["name"], text_entry
      ]
      this.pokemon.push(data);



      //If the rng closed data equals a version in the array and its languege is english
      if(rngVersion === this.pokemon[i][0] && this.pokemon[i][1] === language){
        console.log(this.pokemon[i][0] + ":   " + this.pokemon[i][2]);
        detail = this.pokemon[i][2];
      }else if(this.pokemon[i][0].indexOf(rngVersion)){
        console.log("shit");
      }
      
     
    }
 
   
  console.log(rngVersion);


    var thingy = nameData;

    var pair = [ 
      thingy["name"] , sprite["front_default"]
    ]
    // this.pokemon.push(pair); 
    

    this.spriteUrl = pair[1];

    this.thumb = createImg(this.spriteUrl);
    this.img = loadImage(this.spriteUrl);
    
    
    console.log(this.pokemon);
    console.log(dexEntry);
  }


  this.isDone = function() {
    return true;
  }

  this.respond = function() {
    imageMode(CENTER);
    
    
    this.img.loadPixels();
    
    loadPixels();
    this.img.resize(640, 440);
    for(y = 0; y < height; y++){
      for(x = 0; x < width; x++){

        var index = (x + y * this.img.height) * 4;
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
    // var message = grammar.flatten(seed);
    var message = detail;
    return message;
  }
}
