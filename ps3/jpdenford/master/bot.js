function bot() {
  // this.url = 'https://query.yahooapis.com/v1/public/yql?q=select%20item.forecast%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22wellington%2Cnz%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
  this.image_url = 'http://loremflickr.com/440/220';
  this.weatherData;
  this.temperatures = [];
  this.have_drawn = false;
  this.grammarSource = {};
  this.grammar;

  this.keywords;
  // this.haveWord;

  var BORDER_SIZE = 10; //text start offset from left border
  var TEXT_SIZE = 20;

  this.isDone = function() {
    return this.have_drawn ;
  }

  this.preload = function() {
    this.grammarSource = loadJSON('grammar.json');
  }

  this.setup = function() {
    bot.grammar = tracery.createGrammar(this.grammarSource);
    var story = this.grammar.flatten('#body#');
    bot.simpleStory = story;
    bot.story = splitStory(story);
    bot.intro = this.grammar.flatten('#genericIntro#');

    getWordData(removeUnwantedKeywords(story,this.grammarSource), function(data){
      bot.keywords = data;
      var keywords = bot.keywords.join(",").trim();
      keywords = keywords == ""? "research,science,medicine" : keywords;
      var url = bot.image_url + "/" + keywords;
      bot.img = createImg(url);
      console.log("Image",url);
    });

  }
  /*Clean up keywords used to query image api to remove unwanted*/
  function removeUnwantedKeywords(words, grammarSource){
    // console.log("Unwanted words",grammarSource);
    // var unwantedWords = bot.grammarSource.body.join(",").slice(0);
    // console.log(unwantedWords);
    // unwantedWords = unwantedWords.replaceAll('#','').split(' ');
    // unwantedWords.map(function(o){
    //   return o[0].toLowerCase() + o.slice(1);
    // });
    // console.log(unwantedWords);

    return words;
  }

  function splitStory(story){
    var maxLength = 44;
    var s = [];
    if(story.length < maxLength){
      s = [story];
    } else {
      s = splitLinesToFit(story, maxLength);
    }
    return s;
  }

  /*Recursively split the text until no more will fit on each line */
  function splitLinesToFit(story, maxLength){
    return _splitLinesToFit([""], story.split(" "), maxLength);
  }

  /* helper function */
  function _splitLinesToFit(lines, rest, maxLength){
    if(rest.length === 0) return lines;

    var nextWord = rest[0];
    if(lines[lines.length - 1].length + nextWord.length  > maxLength){
      lines.push("");
      return _splitLinesToFit(lines, rest, maxLength);
    } else {
      lines[lines.length - 1] += (nextWord + " ");
      return _splitLinesToFit(lines, rest.slice(1), maxLength);
    }
  }

  this.respond = function() {

    if(!this.img || this.img.width <= 0 || !this.keywords) {
      text("loading", 100, 100);
      return "loading";
    }
    $('img').hide();
    var top = 10;
    var line_space =  10;
    image(this.img, 0, 0, 440, 220);
    textFont('Oswald');
    textBackground(BORDER_SIZE, top, textWidth(this.intro) + 5, TEXT_SIZE + line_space);
    stroke(255);
    strokeWeight(1);
    textSize(TEXT_SIZE);
    text(this.intro, top, 30);
    for (var i = 0; i < this.story.length; i++) {
      var line = this.story[i]; //trim
      var yPos = (top + TEXT_SIZE) + (i+1) * (TEXT_SIZE + line_space);

      textBackground(BORDER_SIZE, yPos - TEXT_SIZE, textWidth(line) + 5, TEXT_SIZE + line_space);
      fill(0);
      stroke(255);
      text(line, BORDER_SIZE, yPos);
    }
    var message = bot.intro + " " + bot.simpleStory + ".";
    return message;
  }

  function textBackground(x, y, wid, hei){
    push();
    noStroke();
    fill(255,150);
    rect(x, y, wid, hei);
    pop();
  }
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

/*Retreive data Nouns from text api*/
function getWordData(sentence, cb){

  $.ajax({
    url: "https://textapis.p.mashape.com/tags/",
    data: "text="+sentence,
    crossDomain: true,
    context: document.body,
    headers: {
      "X-Mashape-Key": "5j0QV388dfmshndBCnMmdw0lgtlkp1S6yT5jsn2YUYSgZ0fokt",
      "Accept": "application/json"
    }
  }).done(myCb);

  function myCb(data) {
    cb(filterTags(data));
  }

  function filterTags(data){
    var nouns = [];
    data.forEach(function(o){
    if(o[1].indexOf("NN") != -1){
      nouns.push(o[0]);
    }
    })
    return nouns;
  }

}
