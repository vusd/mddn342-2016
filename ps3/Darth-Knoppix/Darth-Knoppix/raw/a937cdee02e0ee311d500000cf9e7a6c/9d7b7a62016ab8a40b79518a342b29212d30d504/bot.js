//Sprites taken from http://www.spriters-resource.com/game_boy_advance/pokemonfireredleafgreen/sheet/3866/
//UI taken form http://www.spriters-resource.com/game_boy_advance/pokemonfireredleafgreen/sheet/33690/
//New Sprites come form http://floatzel.net/
//Getting stats from https://github.com/stefankendall/pokemondatacollector

function bot() {
  this.url          = 'pokemon.json';
  this.statsUrl     = 'https://raw.githubusercontent.com/stefankendall/pokemondatacollector/master/base_stats.json';
  this.stageSheet   = loadImage('battleBG_sheet.png');
  this.UI           = loadImage('battleUI.png');
  this.basicData    = {};
  this.statsData    = {};
  this.pokemon      = {};
  this.temperatures = [];
  this.pokemonCount = 0;
  this.competitor   = null;
  this.myPokemon    = null;
  this.have_drawn   = false;
  this.stage        = null;
  this.dSpriteWidth = 96;

  // Check if number
  function isNumber(n) {
    return !isNaN(parseFloat(n));
  }

  // Clean the name and remove non ascii characters
  this.cleanName = function(name){
    return name.toLowerCase().replace(/\s/g, '-').replace('♀', '-f').replace('♂', '-m').replace('.', '').replace("'", '');
  };

  // Draw string as pokemon font
  this.type = function(sentence, location){
    sentence = sentence.toUpperCase();
    var letter = '';
    var row = 124;
    var posStart = 171;       // Letters start here (X)
    var charImage = {width: 5, padding: 2};
    var letterXPos = 0;
    var halfAlphaOffset = 0;

    for(var pos = 0; pos < sentence.length; ++pos){
      letter = sentence[pos];
      // Check if past J, change offset
      if(letter.charCodeAt(0) >= 74){
        halfAlphaOffset = 2;
      }else{
        halfAlphaOffset = 0;
      }
      //Is a letter or number
      if (isNumber(letter)) {
        row = 159;
        letterXPos = posStart + ((parseInt(letter)) * (charImage.width + charImage.padding));
      }else{
        letterXPos = posStart + ((letter.charCodeAt(0) - 65) *  (charImage.width + charImage.padding)) - halfAlphaOffset;
        // console.log(letter.charCodeAt(0));
      }
      image(this.UI, letterXPos, row, charImage.width, 8, location.x + (pos * charImage.width), location.y, charImage.width, 8);
    }
  };

  // Give pokemon stats
  this.setupPokemon = function(pokemon) {
    if(pokemon.stats === undefined || pokemon.stats === null){
      console.log(this.statsData[pokemon.name]);
      pokemon.stats = {};
      // Get and calc relevant stats
      pokemon.stats.maxHealth = this.statsData[pokemon.name.replace('.', '')].hp;
      pokemon.stats.health    = pokemon.stats.maxHealth - (random() * pokemon.stats.maxHealth);

      pokemon.stats.level     = round(random(100));
    }
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

  this.getSprite = function(id, type){
    var seperator = '/';
    if(type === 'normal') {
      seperator = '';
      type = '';
    }
    //Construct the url to retrieve sprite from web
    var url = 'http://floatzel.net/pokemon/black-white/sprites/images/' + type + seperator + id + '.png';

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

  this.drawBattleUI = function() {
    // console.log('DRAWING BATTLE UI');
    var healthUI = this.UI;
    var theirStatusBar = {x: 12, y: 18, width: 100, height: 29};

    drawHealthBar = function(health, maxHealth, position){
      var healthPercentage = health/maxHealth;
      var healthBar = healthPercentage * position.width;

      //Draw backing of health bar
      image(healthUI, 118, 21, 1,3, position.x, position.y, position.width, position.height);

      //Draw actual health
      if(healthPercentage < 0.75){
        image(healthUI, 117, 13, 1, 3, position.x, position.y, healthBar, position.height);
      }
      if (healthPercentage < 0.25){
        image(healthUI, 117, 17, 1, 3, position.x, position.y, healthBar, position.height);
      }else{
        image(healthUI, 117, 9, 1, 3, position.x, position.y, healthBar, position.height);
      }
    };

    // Draw competitior UI
    // Competitor Status BG
    image(
      this.UI, 3,3,100,29,
      theirStatusBar.x,
      theirStatusBar.y,
      theirStatusBar.width,
      theirStatusBar.height
    );

    // Competitor Health
    drawHealthBar(
      this.competitor.stats.health,
      this.competitor.stats.maxHealth,
      {x: 39 + theirStatusBar.x, y: 17 + theirStatusBar.y, width: 48, height: 3}
    );

    // Competitor Level
    this.type('' + this.competitor.stats.level, {x: theirStatusBar.x + 80, y: theirStatusBar.y + 5});

    // Competitor Name
    this.type(this.competitor.name, {x: theirStatusBar.x + 4, y: theirStatusBar.y + 5});
  };

  this.preload = function() {
    this.basicData = loadJSON(this.url);
    this.statsData = loadJSON(this.statsUrl);
  };

  this.setup = function() {
    this.basicData = this.basicData.pokemon;
    for(var item = 0; item < 151; ++item){
      this.pokemon[this.basicData[item].id] = this.basicData[item];
      this.pokemonCount += 1;
    }

    // Setup pokemon
    // Choose pokemon
    this.competitor  = this.choosePokemon('RANDOM');
    this.myPokemon   = this.choosePokemon('RANDOM');

    // Get backgrounds
    this.myPokemon.backImage    = this.getSprite(this.myPokemon.id, 'back');
    this.competitor.frontImage  = this.getSprite(this.competitor.id, 'normal');

    this.setupPokemon(this.competitor);

    // Set offset to place on the canvas correctly
    this.myPokemon.x_offset   = -32 + this.dSpriteWidth/2;
    this.myPokemon.y_offset   = -12 + this.dSpriteWidth/2;
    this.competitor.x_offset  = 140;
    // this.competitor.y_offset

    console.log('SETUP END');
  };

  this.isDone = function() {
    console.log('DONE');
    text("loading", 100, 100);
    return this.have_drawn;
  };

  this.respond = function() {
    // TODO: Add for all
    if (this.myPokemon.backImage.width <= 0) {
      return "loading";
    }
    this.have_drawn = true;

    // Draw main elements
    scale(1.83);
    this.drawStage('grass');
    //Draw my Pokemon
    image(this.myPokemon.backImage, this.myPokemon.x_offset, this.myPokemon.y_offset);
    // Draw UI
    this.drawBattleUI();

    //Draw the competitor
    image(this.competitor.frontImage, this.competitor.x_offset, this.competitor.y_offset);
    var message = this.myPokemon.name + ' VS ' + this.competitor.name;
    return message;
  };
}
