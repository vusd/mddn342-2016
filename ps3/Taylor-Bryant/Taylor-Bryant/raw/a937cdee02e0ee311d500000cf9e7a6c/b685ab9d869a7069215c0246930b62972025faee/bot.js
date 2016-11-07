function bot() {
  this.url = 'http://lorempixel.com/350/350/?q=1'
  this.url2 = 'http://lorempixel.com/350/350/?q=2'
  this.url3 = 'http://lorempixel.com/350/350/?q=3'
  this.url4 = 'http://lorempixel.com/350/350/?q=4'

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
    // this.weatherData = loadJSON(this.url);
    this.img[0] = createImg(this.url);
    this.img[1] = createImg(this.url2);
    this.img[2] = createImg(this.url3);
    this.img[3] = createImg(this.url4);

  }

  this.setup = function() {
    // var results = this.weatherData["query"]["results"]["channel"];
    // for(var i=0;i<results.length;i++) {
    //   var forecast = results[i]["item"]["forecast"]
    //   var pair = [
    //     parseInt(forecast["low"], 10), parseInt(forecast["high"], 10)
    //   ]
    //   this.temperatures.push(pair)
    // }
    for(i=0;i<10;i++) {
      this.temperatures.push([40, 40]);
    }

    // console.log(this.img);
  }

  this.isDone = function() {
//img[createImg(this.url)];
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
