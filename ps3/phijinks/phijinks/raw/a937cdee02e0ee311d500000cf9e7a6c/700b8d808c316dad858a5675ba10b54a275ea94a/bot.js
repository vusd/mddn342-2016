function bot() {
  // tracery stuff
  this.grammarSrc;
  this.grammar;

  // visual parameters
  this.font;
  this.textColor;
  this.albumCover;

  // data
  this.artistName;
  this.albumName;
  this.tracks = [];

  this.preload = function() {
    // json doesn't accept comments so i'll do attributions here:
    // list of verbs, nouns, adjectives and names in the following json are from darius kazemi's "corpora" project (https://github.com/dariusk/corpora)
    this.grammarSrc = loadJSON("grammar.json");

    this.font = loadFont("LondonBetween.ttf");
  }

  this.setup = function() {
    this.grammar = tracery.createGrammar(this.grammarSrc);

    // set album name and artist
    this.artistName = this.grammar.flatten("#artistName#");
    this.albumName = this.grammar.flatten("#albumName#");

    var keyword = this.grammar.flatten("#albumKeyword#");
    println("getting \"" + keyword + "\" image");
    this.albumCover = createImg("http://www.loremflickr.com/220/220/" + keyword);

    var numTracks = Math.floor(focusedRandom(4, 10, 3, 7));
    for(var n=0; n<numTracks; n++) {
      this.tracks.push(this.grammar.flatten((n+1) + ". #trackName#"));
    }
  }

  this.isDone = function() {
    return true;
  }

  this.respond = function() {
    background(0);
    image(this.albumCover, 0, 0);
    /*for(var x=0; x<220; x++) {
      for(var y=0; y<220; y++) {
        var c = get(x, y);
        set(x, y, color(255, 255, 0));
      }
    }
    updatePixels();*/

    textFont(this.font);
    
    for(var shadow = 0; shadow <= 1; shadow++) {
      push();
      var offset = 2;
      translate(offset*(1-shadow), offset*(1-shadow));
      fill(255 * shadow);
      textSize(18);
      textAlign(CENTER, CENTER);
      text(wrapText(this.artistName, 220), 110, 80);
      textSize(24);
      text(wrapText(this.albumName, 220), 110, 140);
      pop();
    }

    fill(255);
    textSize(12);
    textAlign(LEFT, TOP);
    push(); translate(230, 20)
    for(var i in this.tracks) {
      var msg = wrapText(this.tracks[i], 200, "  ")
      text(msg, 0, 0);
      translate(0, 15 * msg.split("\n").length); // move down for each line in the string
    }
    pop();

    var message = "\"" + this.albumName + "\"" + " by " + this.artistName;
    return message;
  }
}

function wrapText(str, maxWidth, padding) {
  if(textWidth(str) <= maxWidth) {return str;}
  if(padding == null) {padding = "";}

  var words = str.split(" ");
  var newStr = "";
  var currentLine = "";
  var i = 0;
  while(i < words.length) {
    while((currentLine == "" || textWidth(currentLine + words[i]) < maxWidth) && i < words.length) {
      currentLine = currentLine + words[i] + " ";
      i++;
    }
    newStr = newStr + currentLine;
    if(i < words.length) {newStr = newStr + "\n";} // only add a newline if there are more words to add
    currentLine = padding;
  }

  return newStr;
}