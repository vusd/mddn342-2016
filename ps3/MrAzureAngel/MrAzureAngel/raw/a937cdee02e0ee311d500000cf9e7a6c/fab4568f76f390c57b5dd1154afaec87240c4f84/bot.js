// images for the background
var closed_images = [
  "back1.jpg",
  "back2.jpg",
  "back3.jpg",
  "back4.jpg"
]

// Different states the viewer can be in
var closed_data = [
  "sad",
  "lonely",
  "ugly",
  "stuck",
  "overworked",
  "hungry"
]

var img;

function bot() {

  this.placedImages = [];

  // make this true once image has been drawn
  this.have_drawn = false;

  // helper function to draw an owl
  this.placeImages = function(x, y) {
    push();
    translate(x, y);
    image(this.placedImages[0],0,0);
    image(this.placedImages[1],155,20);
    image(this.placedImages[2],305,40);
    pop();
  }

  // return true if image has been drawn
  this.isDone = function() {
    return this.have_drawn;
  }

  // load all external images or data
  this.preload = function() {
    // chose a random image from the list
    var image_name = random(closed_images);
    var url = 'https://api.nasa.gov/planetary/apod?api_key=rB4I3ZQteqZmZo40flUje9OxI5fMjadT7XwSPFif';
    var imgData = loadJSON(url, this.getData);
    //println(image_name);

  }

  this.getData = function(data){

    this.data = data;
    println(data);
    
    img = createImg(data.url);
    console.log(data.url);

  }


  this.setup = function() {
    // chose a random set of data from the list of data
    this.state = random(closed_data);



    // Populates the placedImages Array based on the state
    if(this.state == "sad"){
      this.placedImages[0] = createImg('http://lorempixel.com/150/150/cats/?q1');
      this.placedImages[1] = createImg('http://lorempixel.com/150/150/cats/?q2');
      this.placedImages[2] = createImg('http://lorempixel.com/150/150/cats/?q3');
    }
    if(this.state == "lonely"){
      this.placedImages[0] = createImg('http://lorempixel.com/150/150/nightlife/?q1');
      this.placedImages[1] = createImg('http://lorempixel.com/150/150/nightlife/?q2');
      this.placedImages[2] = createImg('http://lorempixel.com/150/150/nightlife/?q3');
    }
    if(this.state == "ugly"){
      this.placedImages[0] = createImg('http://lorempixel.com/150/150/fashion/?q1');
      this.placedImages[1] = createImg('http://lorempixel.com/150/150/fashion/?q2');
      this.placedImages[2] = createImg('http://lorempixel.com/150/150/fashion/?q3');
    }
    if(this.state == "stuck"){
      this.placedImages[0] = createImg('http://lorempixel.com/150/150/transport/?q1');
      this.placedImages[1] = createImg('http://lorempixel.com/150/150/transport/?q2');
      this.placedImages[2] = createImg('http://lorempixel.com/150/150/transport/?q3');
    }
    if(this.state == "overworked"){
      this.placedImages[0] = createImg('http://lorempixel.com/150/150/nature/?q1');
      this.placedImages[1] = createImg('http://lorempixel.com/150/150/nature/?q2');
      this.placedImages[2] = createImg('http://lorempixel.com/150/150/nature/?q3');
    }
    if(this.state == "hungry"){
      this.placedImages[0] = createImg('http://lorempixel.com/150/150/food/?q1');
      this.placedImages[1] = createImg('http://lorempixel.com/150/150/food/?q2');
      this.placedImages[2] = createImg('http://lorempixel.com/150/150/food/?q3');
    }

  }

  this.respond = function() {
    // draw the background image
    //image(this.img);
    image(img,0,0,440,220);


    // Draws the Images in the placedImagesArray at x,y
    this.placeImages(10,10);

    // set have_drawn to true since we have completed
    this.have_drawn = true;
    
    // construct the message

    if(this.state == "sad"){
      var message = "I heard you are sad, just look at these guys...";
    }
    if(this.state == "lonely"){
      var message = "I heard you feel lonely, go out and...";
    }
    if(this.state == "ugly"){
      var message = "I heard you feel ugly, try on something like...";
    }
    if(this.state == "stuck"){
      var message = "I heard you are stuck at work, just grab the next...";
    }
    if(this.state == "overworked"){
      var message = "I heard you are overworked, take a break and experience...";
    }
    if(this.state == "hungry"){
      var message = "I heard you are hungry, go out and have some...";
    }

    return message;
  }
}
