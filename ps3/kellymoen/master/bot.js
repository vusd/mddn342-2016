function bot() {
  this.url = 'https://query.yahooapis.com/v1/public/yql?q=select%20item.condition.code%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22wellington%2C%20nz%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
  this.weatherData;
  this.thumbnail;
  this.grammarData;
  this.grammar;

  this.preload = function() {
    var imgToChoose = floor(random(9));
    this.thumbnail = loadImage("image"+imgToChoose+".jpg");
    this.grammarData = loadJSON("grammar.json");
    this.weatherData = loadJSON(this.url);
  }

  this.setup = function() {

    this.grammar = tracery.createGrammar(this.grammarData);
    }

  this.isDone = function() {
    return true;
  }

  this.respond = function() {
    var weatherCode = this.weatherData["query"]["results"]["channel"]["item"]["condition"]["code"];
    var weatherString;
    if ( (weatherCode >= 0 && weatherCode < 8) || (weatherCode == 35) || (weatherCode >= 37 && weatherCode <  40)  || (weatherCode == 45)  || (weatherCode == 47)){
      weatherString = "stormy";
    } else if (weatherCode >= 8 && weatherCode < 13  || (weatherCode == 40)){
      weatherString = "raining";
    } else if (weatherCode >= 13 && weatherCode < 16 || (weatherCode >= 41 && weatherCode < 44)){
      weatherString = "snowing";
     } else if (weatherCode == 17 || weatherCode == 18){
      weatherString = "hailing";
     } else if (weatherCode == 19){
      weatherString = "dusty";
     } else if (weatherCode >= 20 && weatherCode <  23){
      weatherString = "foggy";
     } else if (weatherCode >= 23 &&  weatherCode < 25){  
      weatherString = "windy";
     } else if (weatherCode == 25){
      weatherString = "cold";
      } else if ( (weatherCode >= 26 && weatherCode < 31)  || (weatherCode == 44) ){ 
        weatherString = "cloudy";
      } else if (weatherCode >= 31 &&  weatherCode < 35){ 
        weatherString = "sunny";
      }else if (weatherCode == 36){
      weatherString = "hot";
    } else {
      weatherString = "some kind of weather";
    }
    console.log(weatherCode);
    var randomItem = floor(random(10));
    image(this.thumbnail,0,0,440,220);
    var message = this.grammar.flatten("#[weather:"+weatherString+"]sentence#");
    //var message = this.grammar.flatten("I would #goal# but #excuses#.");
    console.log(message);
    return message;
  }
}
