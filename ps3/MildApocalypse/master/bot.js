// images for the background
var closed_images = [
  "sunny.jpg",
  "cloudy.jpg",
  "windy.jpg",
  "rainy.jpg",
  "bismuth.jpg",
  "bismuth-006.jpg",
  "orion-nebula.jpg",
  "hubble-photo.jpg",
  "earth.jpg"
]
var direction = 0; //0 = horizonal, 1 = vertical

var imageData;

var blackValue = -10000000;
var whiteValue = -6000000;

function bot() {
  // make this true once image has been drawn
  this.have_drawn = false;

  // return true if image has been drawn
  this.isDone = function() {
    return this.have_drawn;
  }

  // load all external images or data
  this.preload = function() {
    // chose a random image from the list
    var image_name = random(closed_images);
    println(image_name);

    // load the image the variable img
    this.img = loadImage(image_name);

  }

  this.setup = function() {

    //get image data
    this.img.loadPixels();
    imageData = this.img.pixels;

    //choose sorting direction
    direction = floor(random() * 2);

    //sort pixels and update
    if (direction == 0){this.sortPixelRows();}
    else{this.sortPixelColumns();}
    
    this.img.pixels = imageData;
    this.img.updatePixels();
  }

  this.grammar = {
    "animal": ["bird","animal","creature","owl","night-watcher"],
    "reaction": ["vexing","perplexing","exciting","wistful","enigmatic"],
    "prediction": ["prediction", "forecast", "prognostication"],
    "timeunit": ["day", "night"]
  }

  /*Method to loop through each row and sort them*/
  this.sortPixelRows = function(){
    var x = 0;
    //for each row...
    for(var i = 0; i < this.img.height; ++i){
      //...sort a segment, set x to the right of the segment, keep sorting
      //until there is no more space
      while(x < this.img.width){
        x = this.sortRow(i, x);
      }
      x = 0;
    }
  }

  /*Method to sort a sgement of pixels in a row*/
  this.sortRow = function(row, x){
    var y = row;

    //get first dark pixel
    var start = this.getFirstDarkLateral(y, x);

    //if we are off the edge of the image, return
    if(start >= this.img.width){return this.img.width;}

    var end = this.getFirstLightLateral(y, start + 1);

    //the number of pixels to sort
    var segment = end - start;

    //don't go over the edge of the image
    if((start + segment) > this.img.width){
      segment -= abs(this.img.width - (start + segment));
    }
    var unsorted = new Array(segment);

    //read in pixel values
    for(var i = 0; i < segment; ++i){
      unsorted[i] = this.getVal(start + i, y);
    }
    /*The sort function will sort values according to unicode values,
    (So to be able to sort strings more easily) meaning numbers won't be 
    sorted properly. We need to write our own compare() function and
    pass it to the sort() function.*/
    sorted = unsorted.sort(this.comparePixels);

    //put the sorted pixels back into the imageData array
    for(var i = 0; i < segment; ++i){
      this.setVal(start + i, y, sorted[i]);
    }

    return start + segment + 50;
  }

  /*Method to loop through each column and sort them*/
  this.sortPixelColumns = function(){
    var y = 0;
    //For each column...
    for(var i = 0; i < this.img.width; ++i){
      //...sort a segment, set y to the bottom of the segment, keep sorting
      //until there is no more space
      while(y < this.img.height){
        y = this.sortColumn(i, y);
      }
      y = 0;
    }
  }

  /*Method to sort a segment of pixels in a column*/
  this.sortColumn = function(column, y){
    var x = column;

    //get the first dark pixel
    var top = this.getFirstDarkLongitudinal(x, y);
    //if we are off the edge of the image, return
    if(top >= this.img.height - 1) {return this.img.height;}

    //get the next light pixel
    var bottom = this.getFirstLightLongitudinal(x, top + 1);

    //the number of pixels to sort
    var segment = bottom - top;

    //don't go over the edge of the image
    if((top + segment) > this.img.height){
      segment -= abs(this.img.height - (top + segment));
    }
    var unsorted = new Array(segment);

    //read in pixel values
    for(var i = 0; i < segment; ++i){
      unsorted[i] = this.getVal(x, top + i);
    }

    /*The sort function will sort values according to unicode values,
    (So to be able to sort strings more easily) meaning numbers won't be 
    sorted properly. We need to write our own compare() function and
    pass it to the sort() function.*/
    var sorted = unsorted.sort(this.comparePixels);

    //put the sorted pixels back into the imageData array
    for(var i = 0; i < segment; ++i){
      this.setVal(x, top + i, sorted[i]);
    }

    return top + segment;
  }

  /*functions for sorting pixels go here*/
  this.comparePixels = function(a, b){
    var diff = a - b;

    if(diff < 0){
      return -1;
    }

    if(diff > 1){
      return 1;
    }

    return 0;
  }

  /*Method to get first dark pixel in a row going left*/
  this.getFirstDarkLateral = function(row, start){
    var x = start;
    while(this.getVal(x, row) > blackValue){
      ++x;
      if(x > this.img.width){return this.img.width;}
    }
    return x;
  }

  /*Method to get first light pixel in a row going left*/
  this.getFirstLightLateral = function(row, start){
    var x = start;
    while(this.getVal(x, row) < whiteValue){
      ++x;
      if(x > this.img.width){return this.img.width;}
    }
    return x;
  }

  /*Method to get first dark pixel in a column going down*/
  this.getFirstDarkLongitudinal = function(column, top){
    var y = top;
    while(this.getVal(column, y) > blackValue){
      ++y;
      if(y > this.img.height) {return this.img.height;}
    }
    return y;
  }

  /*Method to get first light pixel in a column going down*/
  this.getFirstLightLongitudinal = function(column, top){
    var y = top;
    while(this.getVal(column, y) < whiteValue){
      ++y;
      if(y > this.img.height){return this.img.height;}
    }
    return y;
  }

  /*Method to set the colour of a pixel in the image data*/
  this.setVal = function(column, row, val){
    var index = (column + row * this.img.width) * 4;

    //first extract rgb values
    var r = (val >> 16) & 0xFF;
    var g = (val >> 8) & 0xFF;
    var b = val & 0xFF;

    //then place into imageData
    imageData[index] = r;
    imageData[index + 1] = g;
    imageData[index + 2] = b;
  }

  /*Method to return a binary integer representing the rgb of a single pixel*/
  this.getVal = function(column, row){
    var index = (column + row * this.img.width) * 4;
    var r = imageData[index];
    var g = imageData[index + 1];
    var b = imageData[index + 2];

    //neat method to store rgb values into a single bit string
    return ( ((255 << 8) | r) << 8 | g) << 8 | b
  }

  this.respond = function() {

    //draw background image
    image(this.img);

    // set have_drawn to true since we have completed
    this.have_drawn = true;

    // construct the message
    var grammar = tracery.createGrammar(this.grammar);
    var seed = "#timeunit# #reaction# #animal.s# #prediction#";
    var message = grammar.flatten(seed);
    return message;
  }
}