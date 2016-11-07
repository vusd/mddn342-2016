

var img;
var companyCam;
var companyLogo;
var arr;

function bot() {

  this.placedImages = [];

  // make this true once image has been drawn
  this.have_drawn = false;

  // Draws the sensor panda on the screen at the desired location
  this.placeImages = function(x, y) {
    push();
    translate(x, y);
    
    pop();
  }

  // return true if image has been drawn
  this.isDone = function() {
    return this.have_drawn;
  }


  this.preload = function() {

    // Loads the NASA image of the day to set as background image
    var imageUrl = 'https://api.nasa.gov/planetary/apod?api_key=rB4I3ZQteqZmZo40flUje9OxI5fMjadT7XwSPFif';
    var imgData = loadJSON(imageUrl, this.getImage);

    // Loads the main directory JSON file
    var dataUrl = 'http://spaceapi.net/directory.json';
    var layerData = loadJSON(dataUrl, this.getLayer);

    var randUrl = 'http://space.nurdspace.nl//spaceapi//status.json'; // Using this one as I know it works (consider it a dummy version of the ones that could be chosen)
    //var randUrl = "'"+random(arr)+"'";
    //fixUrl(randUrl);
    var randData = loadJSON(randUrl, this.nextLayer);

  }

  // replaces all the insances of \/ with // so the JSON is read properly
  // This would have made it so the randomly chosen JSON file is fixed and ready for loadJSON, but access restrictions stopped
  // me from being able to do this for some reason
  this.fixUrl = function(url){
    this.url = url;
    this.repl = this.url.replace("\/", "//");
    randUrl = this.repl;
  }

  this.getImage = function(data){
    
    this.data = data;
    // Creates the image based on the Image of the day API URL
    img = createImg(this.data.url);

  }


  this.getLayer = function(data){

    // Assigns the JSON of JSON files to the data structure
    this.data = data;
    
    // Creates an array called arr and populates it with the website addresses of the JSON files in the data file. 
    arr = [];
      for (this.prop in this.data) {
        arr.push(this.data[this.prop]);
      }

    // Grabs a random item in the array and assigns the data of that JSON file to the variable randData
    //this.randUrl = "'"+random(this.arr)+"'"; // Instead of using this here I am going to pull a working on as an example.
    // Ideally it would grab one of the random ones, but for some reason it is not working correctly. I feel some may have outdates licenses and is throwing errors. 
    // I do not have the skills yet to error check this
    //this.randUrl = 'http://space.nurdspace.nl//spaceapi//status.json';
    //console.log(this.randUrl);
    //this.randData = loadJSON(this.randUrl, this.nextLayer);
  }

  this.nextLayer = function(data){

    this.data = data;
    // creates an images of the company based on their cam image and logo in the JSON
    companyCam = createImg(this.data.cam);
    companyLogo = createImg(this.data.logo);
    // constructs the message based on their current status
    message = "HACKspaceBOT says : "+this.data.space+"'s status is : "+this.data.state.message+" ";

  }


  this.setup = function() {

  }

  this.respond = function() {
    // draw the background image
    // image(this.img);
    image(img,0,0,440,220);
    image(companyCam,20,20,50,50);
    image(companyLogo,75,50);


    // set have_drawn to true since we have completed
    this.have_drawn = true;

    return message;
  }
}
