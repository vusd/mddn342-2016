function bot() {
  this.url = 'https://query.yahooapis.com/v1/public/yql?q=select%20item.forecast%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22wellington%2Cnz%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
  this.weatherData;
  this.temperatures = [];

  this.img = [];


  this.owl = function(x, y, g, s) {
    push();
    translate(x, y);
    scale(s);  // Set the createCanvas
    stroke(g); // Set the gray value
    image(this.img[round(random(3))], 0, 0);
    pop();
  }

  this.preload = function() {
    this.weatherData = loadJSON(this.url);
    this.img[0] = loadImage("donkey.jpg");
    this.img[1] = loadImage("slug.jpg");
    this.img[2] = loadImage("donut.jpg");
    this.img[3] = loadImage("sea.jpg");

  }

  this.setup = function() {
    var results = this.weatherData["query"]["results"]["channel"];
    for(var i=0;i<results.length;i++) {
      var forecast = results[i]["item"]["forecast"]
      var pair = [
        parseInt(forecast["low"], 10), parseInt(forecast["high"], 10)
      ]
      this.temperatures.push(pair)
    }
    /*
    for(i=0;i<10;i++) {
      this.temperatures.push([40, 40]);
    }
    */

    console.log(this.img);
  }

  this.isDone = function() {
    return true;
  }

  this.respond = function() {

     var randnum = int(focusedRandom(1, 999, 2));
    var num_owls = 4;
    var spacing = 400 / num_owls;
    for (i=0; i<num_owls; i++) {
      var xpos = 35 + spacing * i;
      var gray = int(focusedRandom(0, 102, 3))
      var scalar = 0.25;
      this.owl(xpos-15, 220-2*75, gray, scalar);
    }
    var message = "Plan #"+ randnum +" for World Domination";
    return message;
  }
}
