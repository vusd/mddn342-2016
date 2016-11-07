
function bot() {

  // Constants
  var placeholderWord       = '#thing#';
  var placeholderWordPlural = '#things#';

  // Open news data fields
  this.dataObject;
  this.dataImage;

  // Bot fields
  this.done = false;

  this.preload = function() {

    // Load the closed movie data
    loadJSON('movieData.json', this.movieDataLoaded);

    // Load the closed news meta data
    loadJSON('newsMetaData.json', this.newsMetaDataLoaded);
  }

  // Called once the closed movie data has been loaded
  this.movieDataLoaded = function(data) {
    this.quotes = {};

    // For each quote
    data.forEach(function(object) {

      // Store the quote data in an object
      var quoteData     = {};
      quoteData.text    = object.text;
      quoteData.bgImage = loadImage(object.name + '.png');
      quoteData.imageX  = object.imageX;
      quoteData.imageY  = object.imageY;
      quoteData.imageW  = object.imageW;
      quoteData.imageH  = object.imageH;

      // Store the quote data object in the global object
      this.quotes[object.name] = quoteData;
    });
  }

  // Called once the closed news data has been loaded
  this.newsMetaDataLoaded = function(data) {
    var sources = [];

    // Pick a random source
    var randomIndex = floor(random(0, data.sources.length));
    var source      = data.sources[randomIndex];

    // Get the articles from the news API
    var url = 'https://newsapi.org/v1/articles?source=' + source.name + '&sortBy=' + source.sortBy +'&apiKey=' + data.key;
    loadJSON(url, function(data) {
      bot.setupDataObject(data);
    });
  }

  this.setupDataObject = function(data) {
    this.dataObject = {};

    // Pick a random article
    var randomIndex = floor(random(0, data.articles.length));
    var article     = data.articles[randomIndex];

    // Combine the title and description text
    var text = article.title + ' ' + article.description;

    // Set the quote type randomly for now
    var quoteTypes            = Object.keys(quotes);
    var randomIndex           = floor(random(0, quoteTypes.length));
    this.dataObject.quoteType = quoteTypes[randomIndex];

    // Load the associated image from the image url
    dataImage = createImg(article.urlToImage);

    // Get the noun phrases from the text
    this.getNounPhrases(text);
  }

  this.getNounPhrases = function(text) {
    $.ajax({
        type: 'GET',
        url: 'https://textapis.p.mashape.com/nounphrases/',
        dataType: 'json',
        data: {
          "text": text
        },
        beforeSend: function (xhr) {
          xhr.setRequestHeader('X-Mashape-Key', 'uvACaf14RBmshdPZQFLuTEjwyvLPp16I12HjsnkZS9geCY6Ma7');
        },
    })
    .done(function(data) {

      // Get the word tags from the text
      bot.getWordText(text, data.noun_phrases);
    })
  }

  this.getWordText = function(text, nounPhrases) {
    $.ajax({
        type: 'GET',
        url: 'https://textapis.p.mashape.com/tags/',
        dataType: 'json',
        data: {
          "text": text
        },
        beforeSend: function (xhr) {
          xhr.setRequestHeader('X-Mashape-Key', 'uvACaf14RBmshdPZQFLuTEjwyvLPp16I12HjsnkZS9geCY6Ma7');
        },
    })
    .done(function(data) {

      // Get the word tags from he text
      bot.textAnalysisRecieved(nounPhrases, data);
    })
  }

  this.textAnalysisRecieved = function(nounPhrases, wordTags) {

    // Get the nouns from the wordTags
    var nouns = [];
    for (var i = 0; i < wordTags.length; i++) {
      var pair = wordTags[i];
      if (pair[1] == 'NN') nouns.push(pair[0].toLowerCase());
    }

    // Randomly pick noun phrases until one has a noun in
    // If no noun phrases were found or none contain actual nouns use a random noun
    var phrase = undefined;
    while (nounPhrases.length > 0 && (phrase == undefined || !phraseIncludesNoun(phrase, nouns))) {

      // Pick a random phrase from the noun phrases
      var randomIndex = floor(random(0, nounPhrases.length));
      phrase          = nounPhrases[randomIndex];
      nounPhrases.splice(randomIndex, 1);

      // Make the phrase lowercase and singular
      phrase = pluralize(phrase.toLowerCase(), 1);

      // Strip any 'a's, 'an's or 'the's from the start of the phrase
      if (phrase.substring(0, 2) == 'a ')   phrase = phrase.replace('a ', '');
      if (phrase.substring(0, 3) == 'an ')  phrase = phrase.replace('an ', '');
      if (phrase.substring(0, 4) == 'the ') phrase = phrase.replace('the ', '');

      // Trim any leading or trailing whitespace and special characters
      phrase.replace(/["' ]/g, '');
    }

    // Pick a random word from the nouns if no appropriate phrases were found
    if (phrase == undefined) {
      var randomIndex = floor(random(0, nouns.length));
      phrase          = pluralize(nouns[randomIndex], 1);
    }

    // Save the processed phrase
    this.dataObject.phrase = phrase;
  }

  function phraseIncludesNoun(phrase, nouns) {
    var words = phrase.split(' ');

    // Check to see if any words are also nouns
    for (var i = 0; i < words.length; i++) {
      if (nouns.indexOf(words[i]) != -1) {
        return true;
      }
    }

    return false;
  }

  // Checks to see if any of the background images are still loading
  this.backgroundImagesLoading = function() {
    for (var key in quotes) {

      // If an image is undefined it must still be loading
      if (quotes[key].bgImage == undefined) {
        return true;
      }
    }

    // All images are defined, must be loaded
    return false;
  }

  this.setup = function() {
  }

  this.isDone = function() {
    return this.done;
  }

  this.respond = function() {

    // Don't generate the message and image until the text and images have finished loading
    if (this.dataObject.phrase == undefined || dataImage == undefined || dataImage.width <= 0 || this.backgroundImagesLoading()) {
      text('Loading...', 10, 10);
      return 'Loading...';
    }

    var message = this.getQuote(this.dataObject.quoteType, this.dataObject.phrase);
    this.drawImage(this.dataObject.quoteType);

    this.done = true;

    // Ensure the external image is not shown in the dom
    //dataImage.hide();

    return message;
  }

  this.drawImage = function(quoteType) {
    background(0);

    // Draw the images
    image(quotes[quoteType].bgImage, 0, 0, width, height);
    image(
      dataImage,
      quotes[quoteType].imageX,
      quotes[quoteType].imageY,
      quotes[quoteType].imageW,
      quotes[quoteType].imageH
    );
  }

  this.getQuote = function(quoteType, word) {
    var text = '';

    // Get the quote with placeholders
    text = quotes[quoteType].text;

    // Replace all the singular uses of the placeholder with the phrase
    text = text.split(placeholderWord).join(word);

    // Replace all the plural uses of the placeholder with the phrase pluralized
    text = text.split(placeholderWordPlural).join(pluralize(word));

    return text;
  }

}
