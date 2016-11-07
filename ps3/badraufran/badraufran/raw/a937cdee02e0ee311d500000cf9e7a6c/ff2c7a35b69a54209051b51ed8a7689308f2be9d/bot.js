function bot() {
  this.textString = '';
  this.processedString = '';
  this.alphabetString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  this.letterFreq = {};
  this.jsonLoaded = false;
  this.finished = false;

  this.drawLetterFrequency = function() {
    background(50);
    noStroke();

    var alpha = this.alphabetString;
    var rows = 4;
    var cols = ceil(this.alphabetString.length/rows);
    var maxCircleSize = height/4;
    translate(maxCircleSize/2, 0);

    // Draw circles
    var i = 0;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        var frequency = this.letterFreq[alpha[i]];
        var x = (maxCircleSize/2) + maxCircleSize * col;
        var y = (maxCircleSize/2) + maxCircleSize * row;
        var size = map(frequency, 0, this.highestCount, 0, maxCircleSize);

        fill(240);
        ellipse(x, y, maxCircleSize, maxCircleSize);
        fill(100);
        ellipse(x, y, size, size);

        i++;
        if (i === alpha.length) {
          break;
        }
      }
    }
  }

  this.getFrequency = function(string) {
    var freq = {};
    var highest = 0;
    for (var i = 0; i < string.length; i++) {
        var character = string.charAt(i);
        if (freq[character]) {
           freq[character]++;
        } else {
           freq[character] = 1;
        }

        if (freq[character] > highest) {
          highest = freq[character];
        }
    }

    this.letterFreq = freq;
    this.highestCount = highest;
  }

  this.processString = function() {
    // Remove every non-letter character from string
    this.processedString = this.articleString.replace(/[^A-Za-z]/g, '');
    this.processedString = this.processedString.toUpperCase();
    // Count frequency of each letter
    this.getFrequency(this.processedString);
  }

  this.preload = function() {
    // Retrieve randomly generated (bacon) lorem ipsum text
    var request = 'https://baconipsum.com/api/?type=meat-and-filler';
    var self = this;

    var json = loadJSON(request, function (data){
      self.articleString = data[0];
      self.processString();
      self.jsonLoaded = true;
    });
  }

  this.setup = function() {

  }

  this.isDone = function() {
    return this.finished;
  }

  this.respond = function() {
    if (this.jsonLoaded) {
      this.finished = true;
      this.drawLetterFrequency();
      var message = this.articleString.substr(0, this.articleString.indexOf('.') + 1);
      return message;
    }
  }
}
