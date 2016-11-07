function bot() {
  // visual parametera
  this.font;
  this.textColor;

  // data
  this.artistName;
  this.albumName;
  this.tracks = [];

  this.preload = function() {
    this.font = loadFont("LondonBetween.ttf");
  }

  this.setup = function() {
    // set album name and artist
    this.artistName = grammar.flatten("#artistName#");
    this.albumName = grammar.flatten("#albumName#");

    var numTracks = Math.floor(focusedRandom(4, 15, 3, 10));
    for(var n=0; n<numTracks; n++) {
      this.tracks.push(grammar.flatten((n+1) + ". #trackName#"));
    }
  }

  this.isDone = function() {
    return true;
  }

  this.respond = function() {
    background(0);
    noStroke();
    fill("#FA1428");
    rect(0, 0, 220, 220);

    fill(255);
    textFont(this.font); textSize(12);
    push();
    for(var i in this.tracks) {
      var msg = wrapText(this.tracks[i], 200)
      text(msg, 230, 20 + 15*i);
      if(msg.includes("\n")) {translate(0, 15);} 
    }
    pop();

    var message = "Randomly Generated Album: " + grammar.flatten("#origin#");
    return message;
  }
}

function wrapText(str, maxWidth) {
  if(textWidth(str) <= maxWidth) {return str;}

  var words = str.split(" ");
  var newStr = "";
  var currentLine = "";
  var i = 0;
  while(i < words.length) {
    while((currentLine == "" || textWidth(currentLine + words[i]) < maxWidth) && i < words.length) {
      currentLine = currentLine + words[i] + " ";
      i++;
    }
    newStr = newStr + currentLine + "\n";
    currentLine = "  ";
  }

  return newStr;
}