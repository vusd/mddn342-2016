var rndSeed;

var bot;
var renderReady = false;

function preload() {
  bot = new bot();
  if (bot.preload != null) {
    bot.preload();
  }
}

function setup () {
  var main_canvas;
    
  if (bot.preferredRenderer != null) {
      main_canvas = createCanvas(440, 220, bot.preferredRenderer());
  } else {
      main_canvas = createCanvas(440, 220);
  }

  main_canvas.parent('canvasContainer');

  rndSeed = random(1024);
  if (bot.setup != null) {

    var cb = new Codebird;
    cb.setConsumerKey("o7f6prPUS1dPXSI9nEbrwOuJi", "sUHj54Ezglq3A1ar2i9hxspAtBtBCuzIZV9rwyo6D43nSiY4pC");
    cb.setToken("777816362643132416-14UkjELykjtE3YoewHacxZauHc4YDaQ", "NNtFy9kSIcLE4NGqwEdMycvBYmpB4B7X7FZ5O6Frh0vjJ");

    var params = { 
      screen_name: "Prayer_Healing",
      count: 70
    };

    cb.__call(
      "statuses_userTimeline",
      params,
      function (reply, rate, err) {
          for(var i = 0; i < reply.length; i++){
            var n = Math.floor(Math.random() * reply.length) + 1 
            var text = reply[n].text;
            console.log(text);
            //console.log(reply);
            if(contains(text, "God") || contains(text, "the Lord") || contains(text, "The Lord")){
              bot.setup(text);
              return;
            }
          }
          bot.setup("God says, 'Turn back to me and ask for help, and I will answer your prayers.'");
      }
    );
  }
}

function contains(s1, s2){
  if(s1.indexOf(s2) !== -1){
    return true;
  } else {
    return false;
  }
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
    if(bot.isDone == null || bot.isDone()) {
      reportRenderReady();
      renderReady = true;
    }
  }
}