// Third party resources:
// COLOURlovers API - A colour palette API by the folks at COLOURlovers.com http://www.colourlovers.com/api
// crayola.json - A list of Crayola colours by Darius Kazemi https://github.com/dariusk/corpora/blob/master/data/colors/crayola.json

function bot() {
  this.marbleImage = new MarbleImage();

  // make this true once image has been drawn
  this.have_drawn = false;

  // return true if image has been drawn
  this.isDone = function() {
    return this.have_drawn;
  }

  this.preload = function() {
    this.marbleImage.loadColorPalette();
    this.marbleImage.loadMarble();
    this.marbleImage.loadJson();
  }

  this.setup = function() {
    noSmooth();
    this.marbleImage.sampleMarble();
  }

  this.respond = function() {
    if (this.marbleImage.finished) {
      image(this.marbleImage.marble);

      this.marbleImage.applyColourPaletteToMarble();
      this.marbleImage.getColourName();

      // set have_drawn to true since we have completed
      this.have_drawn = true;
    }

    // return the message
    return this.marbleImage.message();
  }
}

function MarbleImage() {
  // Marble images to sample from
  this.marbleImages = [
    '一1.png',
    '一2.png',
    '一3.png',
    '一4.png'
  ];

  // The colour table (not including background) of each marbleImage (ordered darkest to lightest)
  this.marblePalettes = {
    '一1.png': [
      [150, 141, 136].toString(),
      [190, 181, 179].toString(),
      [216, 210, 210].toString(),
      [235, 232, 234].toString()
    ],
    '一2.png': [
      [136, 133, 129].toString(),
      [178, 173, 169].toString(),
      [201, 196, 193].toString(),
      [224, 221, 221].toString()
    ],
    '一3.png': [
      [12, 12, 10].toString(),
      [147, 165, 162].toString(),
      [119, 229, 226].toString(),
      [183, 229, 232].toString()
    ],
    '一4.png': [
      [67, 140, 167].toString(),
      [134, 168, 184].toString(),
      [10, 93, 138].toString(),
      [192, 203, 212].toString()
    ]
  };
  this.marblePalette = [];

  this.colourPaletteUrl = 'http://www.colourlovers.com/api/palettes/top?format=json&numResults=1&resultOffset=';
  this.colourPalette = [];
  this.crayolaColours;
  this.artNames;
  this.dominantColour;
  this.closestColourName;
  this.marble;
  this.finished = false;
  var self = this;

  // Send JSONP request to src URL
  // p5.js loadJSON() doesn't work with COLOURlovers API
  this.jsonp = function(src, options) {
    var callback_name = options.callbackName || 'callback';
    var on_success = options.onSuccess || function(){};
    var on_timeout = options.onTimeout || function(){};
    var timeout = options.timeout || 10; // sec

    var timeout_trigger = window.setTimeout(function(){
      window[callback_name] = function(){};
      on_timeout();
    }, timeout * 1000);

    window[callback_name] = function(data){
      window.clearTimeout(timeout_trigger);
      on_success(data);
    }

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = src;

    document.getElementsByTagName('head')[0].appendChild(script);
  }

  // Extract colour palette from API data
  this.handleColourPaletteData = function(data) {
    // Set colourPalette with the 5 colours
    var colours = data[0].colors;
    for (var i = 0; i < colours.length; i++) {
      this.colourPalette[i] = colours[i];
    }
    this.sortColourPalette();
  }

  // Get a random popular colour palette from COLOURlovers API
  this.loadColorPalette = function() {
    // Add a random results page offset (1-50) to get different results every time
    var rand = ceil(random(50));
    this.colourPaletteUrl += rand;
    // Add callback for JSONP
    var callbackName = 'callback';
    this.colourPaletteUrl += '&jsonCallback=' + callbackName;

    var timeout = 5;
    // Send GET request to load JSONP
    this.jsonp(this.colourPaletteUrl, {
      callbackName: callbackName,
      timeout: timeout,
      onSuccess: function(data) {
        console.log('Successfully retreived API data');
        self.handleColourPaletteData(data);
      },
      onTimeout: function() {
        console.info('Timeout: failed to retrieve data from API after ' + timeout + ' seconds. Using local colour palette');
        self.handleColourPaletteData(data);
      }
    });
  }

  // Sort colour palette from (perceptual) darkest to lightest colours
  this.sortColourPalette = function() {
    this.colourPalette.sort(function (a, b) {
      var rgbA = self.hexToRgb(a);
      rgbA = [rgbA['r'], rgbA['g'], rgbA['b']];
      var rgbB = self.hexToRgb(b);
      rgbB = [rgbB['r'], rgbB['g'], rgbB['b']];
      return self.sumColour(rgbA) > self.sumColour(rgbB);
    });

    // MarbleImage is done and it's image can be used now
    this.finished = true;
  }

  // Colour sorting code by Bas Dirks from
  // http://stackoverflow.com/questions/27960722/sort-array-with-rgb-color-on-javascript
  this.sumColour = function(rgb) {
    // To calculate relative luminance under sRGB and RGB colorspaces that use Rec. 709:
    return 0.2126*rgb[0] + 0.7152*rgb[1] + 0.0722*rgb[2];
  }

  // Load a random marble image
  this.loadMarble = function() {
    var image = random(this.marbleImages);
    this.marblePalette = this.marblePalettes[image];
    this.marble = loadImage(image);
  }

  // Load all JSON files
  this.loadJson = function() {
    this.crayolaColours = loadJSON('crayola.json');
    this.artNames = loadJSON('art.json');
  }

  // Sample a random section of marble image
  this.sampleMarble = function() {
    var sampleWidth = width * 1.5;
    var sampleHeight = height * 1.5;
    var sampleX = random(this.marble.width - sampleWidth);
    var sampleY = random(this.marble.height - sampleHeight);
    image(this.marble, sampleX, sampleY, sampleWidth, sampleHeight, 0, 0, width, height);
    var sampled = get();
    this.marble = sampled;
  }

  // Convert a hex colour to RGB as an object
  this.hexToRgb = function(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  }

  // Replace colours of marble image from colours in colourPalette
  // Also set the dominant colour as a hex value
  this.applyColourPaletteToMarble = function() {
    var colourCount = [];
    for (var i = 0; i < this.colourPalette.length; i++) {
      colourCount[i] = { 'colour': this.colourPalette[i], 'count': 0 };
    }

    loadPixels();
    var d = pixelDensity();
    var imageRes = 4 * (width * d) * (height * d);
    for (var i = 0; i < imageRes; i += 4) {
      var rgb = [pixels[i], pixels[i+1], pixels[i+2]].toString();

      switch (rgb) {
        case this.marblePalette[0]:
          var colour = this.hexToRgb(this.colourPalette[0]);
          pixels[i] = colour['r'];
          pixels[i+1] = colour['g'];
          pixels[i+2] = colour['b'];
          colourCount[0]['count']++;
          break;
        case this.marblePalette[1]:
          var colour = this.hexToRgb(this.colourPalette[1]);
          pixels[i] = colour['r'];
          pixels[i+1] = colour['g'];
          pixels[i+2] = colour['b'];
          colourCount[1]['count']++;
          break;
        case this.marblePalette[2]:
          var colour = this.hexToRgb(this.colourPalette[2]);
          pixels[i] = colour['r'];
          pixels[i+1] = colour['g'];
          pixels[i+2] = colour['b'];
          colourCount[2]['count']++;
          break;
        case this.marblePalette[3]:
          var colour = this.hexToRgb(this.colourPalette[3]);
          pixels[i] = colour['r'];
          pixels[i+1] = colour['g'];
          pixels[i+2] = colour['b'];
          colourCount[3]['count']++;
          break;
        default:
          break;
      }
    }
    updatePixels();

    var highestCountColour = colourCount[0];
    for (var i = 1; i < colourCount.length; i++) {
      if (colourCount[i]['count'] > highestCountColour['count']) {
        highestCountColour = colourCount[i];
      }
    }
    this.dominantColour = highestCountColour['colour'];
  }

  // Compare colours from an array and return the closest matching colour
  // (Modified) closest hex color compare code by Andrew Clark
  // http://stackoverflow.com/questions/17175664/get-the-closest-color-name-depending-on-an-hex-color
  this.closestColour = (function () {
    function dist(s, t) {
      if (!s.length || !t.length) return 0;
      return dist(s.slice(2), t.slice(2)) +
      Math.abs(parseInt(s.slice(0, 2), 16) - parseInt(t.slice(0, 2), 16));
    }

    return function (arr, str) {
      var min = 0xffffff;
      var best, current, i;
      for (i = 0; i < arr.length; i++) {
        var crayolaHex = arr[i]['hex'].replace('#', '');
        var compareHex = str.replace('#', '');
        current = dist(crayolaHex, compareHex);
        if (current < min) {
          min = current
          best = arr[i];
        }
      }
      return best;
    };
  }());

  // Find the closest colour in crayola.json to the dominant colour
  this.getColourName = function() {
    var closestColour = this.closestColour(this.crayolaColours['colors'], this.dominantColour);
    this.closestColourName = closestColour['color'];
  }

  // Combine the closest dominant colour name and an art description name as the message
  this.message = function() {
    if (!this.finished) {
      return 'Loading colour palette';
    }
    return this.closestColourName + ' ' + random(this.artNames['names']);
  }
}
