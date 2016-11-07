function bot() {
  // this.url = 'https://query.yahooapis.com/v1/public/yql?q=select%20item.forecast%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22wellington%2Cnz%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
  this.image_url = 'http://loremflickr.com/440/220/science,medicine';
  this.weatherData;
  this.temperatures = [];
  this.have_drawn = false;
  this.grammar = {};



  this.isDone = function() {
    return this.have_drawn;
  }

  this.preload = function() {
    // this.weatherData = loadJSON(this.url);
  }

  this.setup = function() {
    this.img = createImg(this.image_url);

    // var results = this.weatherData["query"]["results"]["channel"];
    // for(var i=0;i<results.length;i++) {
    //   var forecast = results[i]["item"]["forecast"]
    //   var pair = [
    //     parseInt(forecast["low"], 10), parseInt(forecast["high"], 10)
    //   ]
    //   this.temperatures.push(pair)
    // }

    // println(this.temperatures);
  }

  this.respond = function() {
    if(this.img.width <= 0) {
      text("loading", 100, 100);
      return "loading";
    }

    image(this.img, 0, 0, 440, 220);
    var spacing = 400 / 15;
    textFont('Oswald');
    stroke(255);
    strokeWeight(1);
    textSize(15);
    text('Yo Yo what up g', 10,30);

    var message = "Some text yo";
    return message;
  }
}
