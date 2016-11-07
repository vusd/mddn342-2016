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

//Initialized pokemon Number
  this.dexNumber = 1;
  this.rngVersion;

//  this.twitchchatterData;
  
  this.pokeData; // ALL information reguarding pokemon information sprites etc
  // this.Vscale = 16;
  this.dexData; // ALL information reguarding pokemon dex entries diescriptions etc

//Arraylist of current pokemon details
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

    this.pokeid = random(1, 721);
    this.pokeid = Math.round(this.pokeid);

    this.pokeData = loadJSON(this.pokeNameurl + this.pokeid + '/');
    // this.twitchchatterData = loadJSON(this.twitchLiveUrl);
    this.dexData = loadJSON(this.dexEntryUrl + this.pokeid + '/');

    //preload Random Version Control
    this.rngVersion = random(closed_versions);


    console.log(this.pokeid);
  }

  this.setup = function() {
    //setup json events
    var nameData = this.pokeData;
    var descriptionData = this.dexData;
    
    //get sprite and dex sections from json
    var sprite = nameData["sprites"];
    var dexEntry = descriptionData["flavor_text_entries"];
    
    var language = "en";
    
    //assign data array with all entry sepecific items
    for(var i = 0; i < dexEntry.length; i++){
      var versionData = dexEntry[i]["version"];
      var text_entry = dexEntry[i]["flavor_text"];
      var languageData = dexEntry[i]["language"];

      var data = [
        versionData["name"] , languageData["name"], text_entry
      ]
      
      this.pokemon.push(data);


      //If the rng closed data equals a version in the array and its languege is english display dex entry
        if(this.rngVersion == this.pokemon[i][0] && this.pokemon[i][1] == language){

          console.log(this.pokemon[i][0] + ":   " + this.pokemon[i][2]);
          detail = this.pokemon[i][2];

          //split description into sentances 
          var detailSplit = detail.split(".");


          //assign new description data from split (depends on amount of sentances)
          var rngEntry;
          rngEntry = Math.round(random(0, detailSplit.length-1));
          console.log(rngEntry);
          //if array contains an entry with "";
          if (detailSplit[rngEntry] == null) {
            rngEntry = Math.round(random(0, detailSplit.length-2));
            console.log(rngEntry);
          }else{

          }

          detail = detailSplit[rngEntry];

        }else{

        }
      
    }

    
 
    console.log(this.rngVersion);
    console.log(detailSplit);

    var thingy = nameData;

    //assign array of specific details about the pokemon chosen
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
    this.img.resize(220, 440);
    for(y = 0; y < this.img.height; y++){
      for(x = 0; x < this.img.width; x++){

        var index = (x + y * this.img.width) * 24;

        var r = this.img.pixels[index+4];
        var g = this.img.pixels[index+8];
        var b = this.img.pixels[index+3];
    

        pixels[index+9] = r;
        pixels[index+1] = g;
        pixels[index+2] = b;
        pixels[index+8] = 255;
      }
    }
    updatePixels();
    tint(0, 60);
    image(this.img, width/2, height/2, 220, height);
  
     // construct the message
    var grammar = tracery.createGrammar(this.grammar);
    var seed = "#timeunit# #reaction# #emotion# #prediction#";
    // var message = grammar.flatten(seed);
    var message = "Did you know: " + detail;
      return message;
  }
}
