//Sprites taken from http://www.spriters-resource.com/game_boy_advance/pokemonfireredleafgreen/sheet/3866/

function bot() {
  this.url          = 'pokemon.json';
  this.stageSheet   = loadImage('battleBG_sheet.png');
  this.rawData      = {};
  this.pokemon      = {};
  this.temperatures = [];
  this.pokemonCount = 0;
  this.competitor   = null;
  this.myPokemon    = null;
  this.have_drawn   = false;
  this.stage        = null;
  this.dSpriteWidth = 64;

  this.character = function(x, y, g, s) {
  };

  // Choose a pokemon
  this.choosePokemon = function(type){
    console.log('Choosing a pokemon...');
    var choice;
    var pokemonCount = this.pokemonCount;

    chooseRandom = function(count){
      var number = round(random(count));
      return number;
    };

    if(type === 'RANDOM') {
      choice = chooseRandom(pokemonCount);
    }

    return this.pokemon[choice];
  };

  this.getSprite = function(name, type){
    //Make sure the URL is valid
    var cleanName = name.toLowerCase().replace(/\s/g, '-').replace('♀', '-f').replace('♂', '-m').replace('.', '').replace("'", '');
    //COnstruct the url to retrieve sprite from web
    var url = "https://img.pokemondb.net/sprites/emerald/" + type + "/" + cleanName + ".png";
    console.log(url);
    return createImg(url);
  };

  this.drawStage = function(name){
    var offset = 0;
    var stageWidth = 240;
    // Choose location of stage depending on type
    if(name === 'normal'){
      offset = 0;
    }else if(name === 'grass'){
      offset = stageWidth * -1;
    }else if(name === 'ice'){
      offset = stageWidth * -2;
    }else if(name === 'earth'){
      offset = stageWidth * -3;
    }else if(name === 'water'){
      offset = stageWidth * -4;
    }else if(name === 'steel'){
      offset = stageWidth * -5;
    }else if(name === 'dragon'){
      offset = stageWidth * -6;
    }else if(name === 'poison'){
      offset = stageWidth * -7;
    }else if(name === 'bug'){
      offset = stageWidth * -8;
    }else if(name === 'ghost'){
      offset = stageWidth * -9;
    }

    image(this.stageSheet, offset,0);
  };

  this.preload = function() {
    this.rawData = loadJSON(this.url);
  };

  this.setup = function() {
    this.rawData = this.rawData.pokemon;
    for(var item = 0; item < 151; ++item){
      this.pokemon[this.rawData[item].id] = this.rawData[item];
      this.pokemonCount += 1;
    }

    // Setup pokemon
    // Choose pokemon
    this.competitor  = this.choosePokemon('RANDOM');
    this.myPokemon   = this.choosePokemon('RANDOM');

    // Get backgrounds
    this.myPokemon.backImage    = this.getSprite(this.myPokemon.name, 'back-normal');
    this.competitor.frontImage  = this.getSprite(this.competitor.name, 'normal');

    // Set offset to place on the canvas correctly
    this.myPokemon.x_offset   = 32;
    this.myPokemon.y_offset   = 60;
    this.competitor.x_offset  = 140;
    // this.competitor.y_offset

    // Get transparent pixels
    // New Canvas
    var myPokemonCanvas     = document.createElement('canvas');
    myPokemonCanvas.id      = 'pokecanvas';
    myPokemonCanvas.width   = 64;
    myPokemonCanvas.height  = 64;
    document.body.appendChild(myPokemonCanvas);
    var context = myPokemonCanvas.getContext('2d');
    var img = new Image();
    img.src = this.myPokemon.backImage.elt.src;
    img.onload = function() {
      context.drawImage(img, 0, 0);
    };

    var imgAsDataURL = myPokemonCanvas.toDataURL("image/png");

    // Save image into localStorage
    try {
        localStorage.setItem("mypokemon", imgAsDataURL);
    }
    catch (e) {
        console.log("Storage failed: " + e);
    }

    var localImage = new Image();
    localImage.src = localStorage.getItem("mypokemon");

    localImage.onload = function() {
      context.drawImage(localImage, 0, 0);
      var transparent = true;
      var sum = 0;
      var row_i = 63;

      while(transparent){
        sum = context.getImageData(0,row_i,64,1).data.reduce(function(pv, cv) { return pv + cv; }, 0);
        console.log(row_i + ':' + sum);
        if(sum !== 0 || row_i < 0){
          transparent = false;
        }
        row_i--;
      }

      context.fillStyle="red";
      context.fillRect(0,63,63,1);
    };

    context.drawImage(img, 0, 0);

    console.log(this.myPokemon.name + ' VS ' + this.competitor.name);
    console.log('SETUP END');
  };

  this.isDone = function() {
    console.log('DONE');
    text("loading", 100, 100);
    return this.have_drawn;
  };

  this.respond = function() {
    if (this.myPokemon.backImage.width <= 0) {
      return "loading";
    }
    this.have_drawn = true;

    // Draw main elements
    scale(1.83);
    this.drawStage('grass');
    //Draw my Pokemon
    image(this.myPokemon.backImage, this.myPokemon.x_offset, this.myPokemon.y_offset);

    //Draw the competitor
    image(this.competitor.frontImage, this.competitor.x_offset, this.competitor.y_offset);
    var message = "Have you heard about the good news?";
    return message;
  };
}
