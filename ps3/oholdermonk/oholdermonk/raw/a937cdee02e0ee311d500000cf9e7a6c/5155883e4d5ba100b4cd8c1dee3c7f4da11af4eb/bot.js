// images for the background
var closed_images = [
"124.jpg",
"124_2.jpg",
"124_3.jpg",
"124_4.jpg",
"124_5.jpg",
"http://www.trafficnz.info/camera/173.jpg"
]
var imageData;
var img;
var img2;
// 10 day high temperature forecast
var closed_data = [
[20, 22, 24, 22, 24, 22, 20, 15, 10, 15],
[30, 29, 27, 25, 25, 23, 22, 22, 23, 20],
[10, 12, 10, 12, 10, 12, 10, 12, 10, 12]
]

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
    var image_name2 = random(closed_images);
    println(image_name);
    println(image_name2);


    // load the image the variable img
    this.img = loadImage(image_name);
    this.img2 = loadImage(image_name2);
  }

  this.setup = function() {
    // chose a random set of data from the list of data
    this.temperatures = random(closed_data);
    println(this.temperatures);
  }

  this.grammar = {
    
    "sentence": ["The #line# is as #metaphor_1# as a #metaphor_2# of #metaphor_3#"],
    "line": ["road","highway","long piece of dirt","endless horizon","scar on the earth","path","road to Rome"],
    "metaphor_1": ["clear","empty","void","desolate","quiet","friendless","forsaken","abandoned"],
    "metaphor_2": ["heart","ship","vessel","coffin","rotten box","gathering","company","hoard","pack","many years"],
    "metaphor_3": ["lead","stone","sorrow","solitude","pain","wretchedness","lost souls","nothing","despair"]

  }

 

  var counter = 0;
  this.organize = function(column, row){


   loadPixels();
   var d = pixelDensity();
   var fullImage = 4 * (width*d)*(height*d);
   for(var i=0;i<fullImage;i+=4){
    if(firstimg[i]==secondimg[i]&&firstimg[i+1]==secondimg[i+1]&&firstimg[i+2]==secondimg[i+2]){
      
      counter++;
    }
    
   }

   if(counter>fullImage/2){
    this.invert();
   }


}


var firstimg;


this.invert = function(){
  var d = pixelDensity();
   var fullImage = 4 * (width*d)*(height*d);
   for(var i=0;i<fullImage;i+=4){
    //if(pixels[i]>150&&pixels[i+1]>150&&pixels[i+2]>150){

      pixels[i]=255-pixels[i];
      pixels[i+1]=255-pixels[i+1];
      pixels[i+2]=255-pixels[i+2];
      //counter++;
    //}
    
   }
}


this.respond = function() {
    // draw the background image

    //if(this.have_drawn == false){
      image(this.img, 0,-16);
      loadPixels();
      firstimg = pixels;
      imageData = this.img.pixels;
      updatePixels();
      image(this.img2, 0, -16);

      loadPixels();
      secondimg = pixels;
      //console.log(imageData);

      this.organize(width, height);

      updatePixels();
      //console.log(firstimg.length);



    // // chose how many owls to draw
    // var num_owls = Math.floor(focusedRandom(5, 11, 3, 7));

    // // draw the owls based on the data in temperatures
    // var spacing = 400 / num_owls;
    // for (i=0; i<num_owls; i++) {
    //   var xpos = 35 + spacing * i;
    //   var gray = int(focusedRandom(0, 102, 3))
    //   var scalar = focusedRandom(0.15, 0.75, 2);
    //   this.owl(xpos, 220-2*this.temperatures[i], gray, scalar);
    // }

    // set have_drawn to true since we have completed
    this.have_drawn = true;
    
    // construct the message
    var grammar = tracery.createGrammar(this.grammar);
    var seed = "#sentence#";
    var message = grammar.flatten(seed);
    return message;
  }
}