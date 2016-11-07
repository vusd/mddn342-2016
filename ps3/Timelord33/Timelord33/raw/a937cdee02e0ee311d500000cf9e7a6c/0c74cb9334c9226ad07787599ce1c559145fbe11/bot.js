function bot() {
  var WNAPI = '&api_key=5b487ac224e106b2bd2a20b993706ba039165e16836ad5f4e';
  var PBAPI = 'https://pixabay.com/api/?key=3343183-70a3f8be457dca20c49ba9201&q=calm&image_type=photo&order=popular';
  var photosData;
  var photos = [];
  var photoResultsPerPage = 20;
  var photosNumToDownload = 8;
  
  var api = {
    "nouns":{
      "url":"http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=noun&excludePartOfSpeech=proper-noun,noun-plural&minCorpusCount=2000&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=1&maxLength=-1&limit=10",
      "data":{}
    },
    "advjectives":{
      "url":"http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=adjective&minCorpusCount=2000&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=1&maxLength=-1&limit=10",
      "data":{}
    },
    "herb":{
      "url":"http://api.wordnik.com:80/v4/word.json/herb/relatedWords?useCanonical=true&relationshipTypes=same-context&limitPerRelationshipType=30",
      "data":{}
    },
    "bath":{
      "url":"http://api.wordnik.com:80/v4/word.json/bath/relatedWords?useCanonical=true&relationshipTypes=same-context&limitPerRelationshipType=30",
      "data":{}
    },
    "fruit":{
      "url":"http://api.wordnik.com:80/v4/words.json/reverseDictionary?query=fruit&minCorpusCount=5&maxCorpusCount=-1&minLength=1&maxLength=-1&includeTags=false&limit=12",
      "data":{}
    },
    "distress":{
      "url":"http://api.wordnik.com:80/v4/word.json/distress/relatedWords?useCanonical=false&relationshipTypes=synonym&limitPerRelationshipType=15",
      "data":{}
    },
    "clothing":{
      "url":"http://api.wordnik.com:80/v4/word.json/clothing/relatedWords?useCanonical=false&relationshipTypes=hyponym&limitPerRelationshipType=15",
      "data":{}
    }
};
  
  var grammerData = {
    "name":["James", "Rachel", "Gerrit", "Catfish", "Jack"],
    "noun":[],
    "adj":[],
    "herb":[],
    "bath":[],
    "fruit":[],
    "distress":[],
    "clothing":{},
    "story":["Add a drop of #herb# to your #bath#, and soon, you'll soak yourself calm. ", 
            //"Imagine every day is a #bath#, ",
            "Add a dab of #herb# to milk; leave town with a #fruit#, and pretend you're laughing at it.",
            "When you're feeling #distress#, do something different. Roll up your #clothing#, or eat a #fruit#."
            ],
    "origin":["#story#"]
  };
  var grammer;

  this.preload = function() {
    api.advjectives.data = loadJSON(api.advjectives.url + WNAPI);
    api.nouns.data = loadJSON(api.nouns.url + WNAPI);
    api.herb.data = loadJSON(api.herb.url + WNAPI);
    api.bath.data = loadJSON(api.bath.url + WNAPI);
    api.fruit.url += "&skip=" + (Math.random() * 500); //list appears limited so this 'skip' shifts the results to have more varity.
    api.fruit.data = loadJSON(api.fruit.url + WNAPI);
    api.distress.data = loadJSON(api.distress.url + WNAPI);
    api.clothing.data = loadJSON(api.clothing.url + WNAPI);
  }

  this.setup = function() {
    angleMode(DEGREES);    
    grammerData.adj = this.wordnikToGrammerArray(api.advjectives.data);
    grammerData.noun = this.wordnikToGrammerArray(api.nouns.data);
    grammerData.herb = api.herb.data[0].words;
    grammerData.bath = api.bath.data[0].words;
    grammerData.fruit = this.wordnikToGrammerArray(api.fruit.data.results);
    grammerData.distress = api.distress.data[0].words;
    grammerData.clothing = api.clothing.data[0].words;
    
    grammer = tracery.createGrammar(grammerData);
    
    photosData = loadJSON(PBAPI + "&per_page=" + photoResultsPerPage + "&page=" + (Math.random() * 20), this.loadPhotos);
  }
  
  this.loadPhotos = function() {
    console.log("Loading photo...");
    console.log(Math.round(Math.random() * photoResultsPerPage));
    for (var i=0;i<photosNumToDownload;i++) {
      loadImage(photosData.hits[Math.round(Math.random() * photoResultsPerPage)].webformatURL, function(img) {
        photos.push(img);
        console.log("Photo loaded!");
      });
    }
  }
  
  this.wordnikToGrammerArray = function(wordnikData) {
    var rtn = [];
    wordnikData.forEach(function(o, i) {
      rtn.push(o.word);
    });
    return rtn;
  }

  this.isDone = function() {
    return true;
  }

  this.respond = function() {
    photos.forEach(function(img, i) {
      imageMode(CORNER);
      resetMatrix();
      if (i == 0)
        image(img, 0, 0, width, height);
      imageMode(CENTER);
      translate(randomGaussian(width / 2, 90), randomGaussian(height / 2, 90));
      rotate(random(-20, 20));
      image(img, 0, 0, img.width * 0.2, img.height * 0.2);
    });
    
    return (grammer.createFlattened());
  }
}
