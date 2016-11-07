// Third party resources:
// Color Thief by Lokesh Dhakar https://github.com/lokesh/color-thief/
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
    '1.png',
    '2.png',
    '3.png',
    '4.png'
  ];

  // The colour table (not including background) of each marbleImage (ordered darkest to lightest)
  this.marblePalettes = {
    '1.png': [
      [150, 141, 136].toString(),
      [190, 181, 179].toString(),
      [216, 210, 210].toString(),
      [235, 232, 234].toString()
    ],
    '2.png': [
      [136, 133, 129].toString(),
      [178, 173, 169].toString(),
      [201, 196, 193].toString(),
      [224, 221, 221].toString()
    ],
    '3.png': [
      [12, 12, 10].toString(),
      [147, 165, 162].toString(),
      [119, 229, 226].toString(),
      [183, 229, 232].toString()
    ],
    '4.png': [
      [67, 140, 167].toString(),
      [134, 168, 184].toString(),
      [10, 93, 138].toString(),
      [192, 203, 212].toString()
    ]
  };
  this.marblePalette;

  // Images to sample color from
  this.closedImages = [
    "sunny.jpg",
    "cloudy.jpg",
    "windy.jpg",
    "rainy.jpg"
  ];

  this.colorThief = new ColorThief;
  this.imageForColour = new Image();
  this.colourPalette;
  this.crayolaColours;
  this.artNames;
  this.dominantColour;
  this.closestColourName;
  this.marble;
  this.finished = false;

  // Get image and colour palette from image
  // Uses closed set of images for now, should use API
  this.loadColorPalette = function() {
    // Create image from random image file name
    this.imageForColour.src = random(this.closedImages);

    // Get colour palette from image once it has loaded
    var self = this;
    this.imageForColour.onload = function() {
      self.getColourPaletteFromImage();
    }
  }

  // Use Color Thief to get a colour palette from image and sort it from darkest to lightest
  this.getColourPaletteFromImage = function() {
    this.colourPalette = this.colorThief.getPalette(this.imageForColour, 3);

    var self = this;
    this.colourPalette.sort(function (a, b) {
      return self.sumColour(a) > self.sumColour(b);
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

  // Replace colours of marble image from colours in colourPalette
  // Also set the dominant colour as a hex value
  this.applyColourPaletteToMarble = function() {
    var colourCount = []; // track count of each colour used and set dominant colour at end
    for (var i = 0; i < this.colourPalette.length; i++) {
      colourCount[i] = { 'rgb': this.colourPalette[i], 'count': 0 };
    }

    loadPixels();
    var d = pixelDensity();
    var imageRes = 4 * (width * d) * (height * d);
    for (var i = 0; i < imageRes; i += 4) {
      var rgb = [pixels[i], pixels[i+1], pixels[i+2]].toString();

      switch (rgb) {
        case this.marblePalette[0]:
          var colour = this.colourPalette[0];
          pixels[i] = colour[0];
          pixels[i+1] = colour[1];
          pixels[i+2] = colour[2];
          colourCount[0]['count']++;
          break;
        case this.marblePalette[1]:
          var colour = this.colourPalette[1];
          pixels[i] = colour[0];
          pixels[i+1] = colour[1];
          pixels[i+2] = colour[2];
          colourCount[1]['count']++;
          break;
        case this.marblePalette[2]:
          var colour = this.colourPalette[2];
          pixels[i] = colour[0];
          pixels[i+1] = colour[1];
          pixels[i+2] = colour[2];
          colourCount[2]['count']++;
          break;
        case this.marblePalette[3]:
          var colour = this.colourPalette[3];
          pixels[i] = colour[0];
          pixels[i+1] = colour[1];
          pixels[i+2] = colour[2];
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
    var c = color(highestCountColour['rgb']).levels;
    var hexCol = '#' + hex(c[0]<<020 | c[1]<<010 | c[2], 6);
    this.dominantColour = hexCol;
  }

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

  this.getColourName = function() {
    var closestColour = this.closestColour(this.crayolaColours['colors'], this.dominantColour);
    this.closestColourName = closestColour['color'];
  }

  // Combine the dominant colour name and a description name as the message
  this.message = function() {
    return this.closestColourName + ' ' + random(this.artNames['names']);
  }
}
