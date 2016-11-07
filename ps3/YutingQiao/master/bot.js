
var def =null;

// images for the background
var closed_images = [
  "c1.PNG",
  "c2.PNG",
  "c3.PNG",
  "c4.PNG",
  "c5.PNG",
  "a1.PNG",
  "a2.PNG",
  "a3.PNG",
  "a4.PNG",
  "a5.PNG",
  "a6.PNG",
  "a7.PNG",
  "a8.PNG",
  "a9.PNG",
]

function bot() {
   this.url = 'https://query.yahooapis.com/v1/public/yql?q=select%20item.forecast%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22wellington%2Cnz%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
  this.weatherData;
  this.temperatures = [];
  this.have_drawn = false;
  // make this true once image has been drawn
  this.have_drawn = false;

  // helper function to draw an owl

  // return true if image has been drawn
  this.isDone = function() {
    return this.have_drawn;
  }

  // load all external images or data
  this.preload = function() {
    this.weatherData = loadJSON(this.url);
    // chose a random image from the list
    // var image_name = random(closed_images);
    
    if(def == null){
      def = loadJSON('def.json')
    }
    // println(image_name);
  }

  this.setup = function() {
    // chose a random set of data from the list of data
var results = this.weatherData["query"]["results"]["channel"];
    for(var i=0;i<results.length;i++) {
      var forecast = results[i]["item"]["forecast"]
      var pair = [
        forecast["text"], parseInt(forecast["low"], 10), parseInt(forecast["high"], 10)
      ]
      this.temperatures.push(pair)
    }
    this.weather = this.temperatures[0][0]

    println(this.weather);  

    if(this.weather == "Breezy") {
      // load the image the variable img
      this.chosen_def = Math.floor(random(0,5));

    }
    else {
      this.chosen_def = Math.floor(random(5,13));

    }
    this.img = loadImage(closed_images[this.chosen_def])

}
  this.grammar = {
    "animal": ["Oracle bone script"],
    "reaction": ["vexing","perplexing","exciting","wistful","enigmatic"],
    "prediction": ["prediction", "forecast", "prognostication"],
    "timeunit": ["day", "night"]
  }

  this.respond = function() {
    if(this.img == null || this.img.width <= 0) {
      return;
    }

    // draw the background image
    image(this.img,0,0,width.height);
    textSize(16);
    textAlign(CENTER);
    var actual_def = def[this.chosen_def];
    text (actual_def,0,0,width,height);
    // chose how many owls to draw
   

    // construct the message
    var grammar = tracery.createGrammar(this.grammar);
    var seed = this.weather + " #timeunit# #reaction# #animal.s# #prediction#";
    var message = grammar.flatten(seed);
    
    return message;
  }
}