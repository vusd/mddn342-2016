// images for the background
var closed_images = [
  "sunny.jpg",
  "cloudy.jpg",
  "windy.jpg",
  "rainy.jpg"
]

// 10 day high temperature forecast
var closed_data = [
  [20, 22, 24, 22, 24, 22, 20, 15, 10, 15],
  [30, 29, 27, 25, 25, 23, 22, 22, 23, 20],
  [10, 12, 10, 12, 10, 12, 10, 12, 10, 12]
]



function bot() {

this.image_url = 'http://lorempixel.com/400/200/abstract'
  // make this true once image has been drawn
  this.have_drawn = false;



   // helper function to draw an smile
  this.smile = function(x, y, g, s) {

//ellipse(30,30,50,50);
  }




    // return true if image has been drawn
  this.isDone = function() {
    return this.have_drawn;
  }

  // load all external images or data
  this.preload = function() {


    // chose a random image from the list
    var image_name = random(closed_images);
    println(image_name);

      //TheGuardian post a link to an unrelated word
  //http://content.guardianapis.com/search?q=meme&api-key=a8e8ba40-c4cb-4ab1-ade8-e543a2803891
//this.image_url = 'https://i.ytimg.com/vi/7f82ITt35QA/maxresdefault.jpg'
    
    //var guardianTopic = loadJSON("http://content.guardianapis.com/search?q=memes", this.getData, 'jsonp');
    //var guardianTopic = loadJSON("http://content.guardianapis.com/search?api-key=a8e8ba40-c4cb-4ab1-ade8-e543a2803891", this.getData, 'jsonp');
    // load the image the variable img
    this.img = loadImage(image_name)
    this.data = loadJSON("bot.json")
  }
//setup
  this.setup = function() {
//new
   this.img = createImg(this.image_url);
   //this.img = createImg(this.image_url)
    // chose a random set of data from the list of data
    this.closednum = random(closed_data);
    println(this.closednum);
  }
//draw
  this.respond = function() {
    this.grammar = {
      "object": this.data.objects,
      "adjective": ["provocative","groovy","exciting","arousing","unenthusiastic"],
      "type": ["memes", "jokes", "puns", "pranks"],
      "amount": ["kinds of", "types of", "different", "examples of"]
    }

    // draw the background image
    image(this.img,0,0,440,220);
    //text("Top " + num + " #amount# #adjective# #object# #type#",100,100);
    // chose how many owls to draw
    var num = Math.floor(focusedRandom(5, 11, 3, 7));
    //trying to search for whatever the #object# is and search on guardian and 
    //post the link to the most recent article that it finds.
    //eg if the object is rusty nails it will bring up article about rusty nails. 
    
    //var link = loadJSON("search/#object#") 
    //"search/#object#";

    // draw the owls based on the data in closednum
    var spacing = 400 / num;
    for (i=0; i<num; i++) {
      var xpos = 35 + spacing * i;
      var gray = int(focusedRandom(0, 102, 3))
      var scalar = focusedRandom(0.15, 0.75, 2);
      this.smile(xpos, 220-2*this.closednum[i], gray, scalar);
    }


    // set have_drawn to true since we have completed
    this.have_drawn = true;

    // return the message
    //var message = "Current " + num.toString() + " day weather smile forecast";

    // construct the message
    var grammar = tracery.createGrammar(this.grammar);
    var seed = "Top " + num + " #amount# #adjective# #object# #type#";
    //var seed = "Top " + num + " #amount# #adjective# #object# #type#" + link;
    var message = grammar.flatten(seed);

    return message;
  }
}
