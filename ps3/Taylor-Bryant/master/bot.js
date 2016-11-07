function bot() {

  //this.pixel = round(random(300, 1000));

  this.url = 'http://loremflickr.com/350/350/all/?q=1'
  this.url2 = 'http://loremflickr.com/350/350/all/?q=2'
  this.url3 = 'http://loremflickr.com/350/350/all/?q=3'
  this.url4 = 'http://loremflickr.com/350/350/all/?q=4'

  this.weatherData;
  this.temperatures = [];

  this.img = [];



  this.owl = function(x, y, g, s, f) {
    //this.f = 0;
    push();
    translate(x, y);
    scale(s);  // Set the createCanvas
    stroke(g); // Set the gray value
    image(this.img[f], 0, 0);
    pop();
  }

  this.preload = function() {
    this
    // this.weatherData = loadJSON(this.url);
    this.img[0] = createImg(this.url);
    this.img[1] = createImg(this.url2);
    this.img[2] = createImg(this.url3);
    this.img[3] = createImg(this.url4);
    this.img[4] = createImg("z_GridGlobe01.jpg");

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
    push();
    scale(0.2393);
    image(this.img[4],0,0);
    pop();

    var randnum = int(random(1, 999));
    var num_owls = 4;
    var spacing = 437 / num_owls;
    for (i=0; i<num_owls; i++) {
      var frame = i;
      var xpos = 35 + spacing * i;
      var gray = int(focusedRandom(0, 102, 3))
      var scalar = 0.25;
      this.owl(xpos-22, 220-2*80, gray, scalar, frame);
    }
    var message = "Resources avalabile for Plan #"+ randnum +" of World Domination, Suggestions?";
    return message;
  }
}
