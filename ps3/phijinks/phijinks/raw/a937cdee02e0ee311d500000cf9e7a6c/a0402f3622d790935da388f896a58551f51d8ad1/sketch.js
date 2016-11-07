var rndSeed;

var bot;
var grammarSrc;
var grammar;
var renderReady = false;

function preload() {
  // json doesn't accept comments so i'll do attributions here:
  // list of verbs, nouns, adjectives and names in the following json are from darius kazemi's "corpora" project (https://github.com/dariusk/corpora)
  grammarSrc = loadJSON("grammar.json");

  bot = new bot();
  bot.preload();
}

function setup () {
  var main_canvas = createCanvas(440, 220);
  main_canvas.parent('canvasContainer');

  rndSeed = random(1024);
  bot.setup();

  grammar = tracery.createGrammar(grammarSrc);

  /*var toGenerate = {artist:"#artistName#", album:"#albumName#", track:"#trackName#"};
  for(var str in toGenerate) {
    for(var n=0; n<5; n++) {
      println(grammar.flatten(toGenerate[str]));
    }
    println("");
  }*/
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
  else if (key == '@') {
    saveBlocksImages(true);
  }
}

function reportRenderReady() {
  finalDiv = createDiv('(render ready)');  
  finalDiv.id("render_ready")
}

function draw() {
  background(204);
  // randomSeed(0);
  resetFocusedRandom(rndSeed);
  message = bot.respond();
  var text = select('#tweet_text');
  text.html(message);
  if(renderReady == false) {
    if(bot.isDone()) {
      reportRenderReady();
      renderReady = true;
    }
  }
}