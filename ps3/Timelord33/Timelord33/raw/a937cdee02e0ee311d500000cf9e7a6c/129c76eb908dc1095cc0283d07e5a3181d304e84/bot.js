function bot() {
  var WNAPI = '&api_key=5b487ac224e106b2bd2a20b993706ba039165e16836ad5f4e';
  
  var nounsURL = 'http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=noun&excludePartOfSpeech=proper-noun,noun-plural&minCorpusCount=2000&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=1&maxLength=-1&limit=10' + WNAPI;
  var nounsData;
  var adjectivesURL = 'http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=adjective&minCorpusCount=2000&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=1&maxLength=-1&limit=10' + WNAPI;
  var adjectivesData;
  
  var grammerData = {
    "name":["James", "Rachel", "Gerrit", "Catfish", "Jack"],
    "noun":[],
    "adj":[],
    "origin":["#name# is #adj#"]
  };
  var grammer;
  var trace;

  this.preload = function() {
    adjectivesData = loadJSON(adjectivesURL);
    nounsData = loadJSON(nounsURL);
  }

  this.setup = function() {
    grammerData.adj = this.wordnikToGrammerArray(adjectivesData);
    grammerData.noun = this.wordnikToGrammerArray(nounsData);
    
    grammer = tracery.createGrammar(grammerData);
	trace = grammer.createFlattened();
    console.log(trace);
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
    return (grammer.createFlattened('Thou art a #adj#, #adj#, #noun#!'));
  }
}
