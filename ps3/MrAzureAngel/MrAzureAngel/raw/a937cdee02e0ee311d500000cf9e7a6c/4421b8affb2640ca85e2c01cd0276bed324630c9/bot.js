// images for the background
var closed_images = [
  "back1.jpg",
  "back2.jpg",
  "back3.jpg",
  "back4.jpg"
]

var img;
var image_name;

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


  this.preload = function() {
    // Chooses a random background image form the closed 4
    image_name = random(closed_images);
    // loads the joke database API
    var url = 'https://api.chucknorris.io/jokes/random';
    var jokeData = loadJSON(url, this.getJoke);

  }


  this.getJoke = function(data){

    this.data = data;
    println(data);
    // Constructs the message from the API information of value
    message = ""+data.value+"";

  }


  this.setup = function() {
    // creates the random image
    img = createImg(image_name);
  }

  this.respond = function() {
    // draw the background image
    //image(this.img);
    image(img,0,0,440,220);


    // set have_drawn to true since we have completed
    this.have_drawn = true;
    

    return message;
  }
}
